import { NextResponse } from 'next/server';
import crypto from 'crypto';
import axios from 'axios';

function formatPrivateKey(pem) {
    if (!pem) return '';
    if (pem.includes('-----BEGIN')) {
        return pem.replace(/\\n/g, '\n');
    }
    const wrapped = pem.match(/.{1,64}/g)?.join('\n') || pem;
    return `-----BEGIN RSA PRIVATE KEY-----\n${wrapped}\n-----END RSA PRIVATE KEY-----`;
}

function generateSignature(httpMethod, requestPath, clientId, requestTime, reqBody, privateKey) {
    const formattedPrivateKey = formatPrivateKey(privateKey);
    const stringToSign = `${httpMethod} ${requestPath}\n${clientId}.${requestTime}.${reqBody}`;

    const sign = crypto.createSign('RSA-SHA256');
    sign.update(stringToSign, 'utf8');

    return sign.sign({
        key: formattedPrivateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
    }, 'base64');
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { amount, currency = 'USD', title, courseId, customerName, customerEmail } = body;

        const paymentRequestId = `ORDER_${Date.now()}`;
        const amountString = String(Math.round(Number(amount) * 100));
        const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://www.mtradershklimited.com').replace(/\/$/, '');
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://edu-hub-server-4gwz.onrender.com';

        try {
            await axios.post(`${backendUrl}/api/orders/create-pending`, {
                orderId: paymentRequestId,
                courseId: courseId,
                userEmail: customerEmail,
                userName: customerName,
                gateway: 'Antom',
                amount: Number(amount)
            });
        } catch (backendError) {
            console.error('Failed to initialize pending order:', backendError.message);
            return NextResponse.json({ success: false, message: 'Failed to initialize order in database' }, { status: 500 });
        }

        const requestPath = process.env.ANTOM_API_PATH || '/ams/api/v1/payments/createPaymentSession';
        const clientId = process.env.ANTOM_CLIENT_ID;
        const requestTime = new Date().toISOString();
        const webhookUrl = `${appUrl}/api/webhook/antom`;
        const redirectUrl = `${appUrl}/api/payment-return`;

        const payload = {
            productCode: "CASHIER_PAYMENT",
            productScene: "CHECKOUT_PAYMENT",
            paymentRequestId: paymentRequestId,
            is3DSAuthentication: true,
            paymentAmount: {
                currency: String(currency),
                value: amountString
            },
            order: {
                referenceOrderId: String(courseId || paymentRequestId),
                orderDescription: String(title || "Course Purchase"),
                orderAmount: {
                    currency: String(currency),
                    value: amountString
                }
            },
            availablePaymentMethod: {
                paymentMethodTypeList: [
                    { paymentMethodType: "CARD" },
                    { paymentMethodType: "GOOGLEPAY", expressCheckout: false },
                    { paymentMethodType: "APPLEPAY", expressCheckout: false },
                    { paymentMethodType: "ALIPAY_HK" }
                ]
            },
            buyer: {
                referenceBuyerId: customerEmail || `GUEST_${Date.now()}`,
                ...(customerName && { buyerName: { fullName: customerName } }),
                ...(customerEmail && { buyerEmail: customerEmail })
            },
            settlementStrategy: {
                settlementCurrency: String(currency)
            },
            env: {
                terminalType: "WEB"
            },
            paymentRedirectUrl: redirectUrl,
            paymentNotifyUrl: webhookUrl,
            passThroughInfo: JSON.stringify({ courseId, customerEmail, customerName })
        };

        const jsonBody = JSON.stringify(payload);

        const signature = generateSignature(
            'POST', requestPath, clientId, requestTime, jsonBody, process.env.ANTOM_PRIVATE_KEY
        );

        const encodedSignature = encodeURIComponent(signature);
        const signatureHeader = `algorithm=RSA256,keyVersion=1,signature=${encodedSignature}`;
        const baseUrl = process.env.ANTOM_BASE_URL.replace(/\/$/, '');

        const antomResponse = await fetch(`${baseUrl}${requestPath}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Client-Id': clientId,
                'Request-Time': requestTime,
                'Signature': signatureHeader
            },
            body: jsonBody
        });

        const rawText = await antomResponse.text();
        let result = {};

        if (rawText) {
            try {
                result = JSON.parse(rawText);
            } catch (parseError) {
                console.error('Error parsing Antom response:', parseError);
            }
        }

        const checkoutUrl = result.paymentUrl || result.redirectUrl || result.normalUrl || result.actionForm || result.paymentSessionData?.redirectUrl;

        if (checkoutUrl) {
            return NextResponse.json({ success: true, checkoutUrl: checkoutUrl });
        }

        console.error("ANTOM API ERROR:", JSON.stringify(result, null, 2));

        return NextResponse.json({
            success: false,
            message: result?.result?.resultMessage || 'Payment session creation failed',
            details: result
        }, { status: 400 });

    } catch (error) {
        console.error('Payment initialization error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}