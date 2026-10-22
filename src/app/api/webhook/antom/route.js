import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
    try {
        const body = await req.json();

        const orderId = body.paymentRequestId;
        const paymentStatus = body.paymentStatus || body.result?.resultStatus;
        const notifyType = body.notifyType;
        const paymentId = body.paymentId || body.transactionId || 'UNKNOWN_PROOF_ID';

        console.log('ANTOM WEBHOOK RECEIVED');
        console.log(`Processing Order ID: ${orderId} | Status: ${paymentStatus}`);

        const isPaymentSuccessful = paymentStatus === 'SUCCESS' || paymentStatus === 'S' || notifyType === 'CAPTURE_RESULT';
        const finalStatus = isPaymentSuccessful ? 'SUCCESS' : 'FAILED';

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://edu-hub-server-4gwz.onrender.com';

        try {
            const payload = {
                orderId: orderId,
                proofId: paymentId,
                gateway: 'Antom',
                status: finalStatus
            };

            const response = await axios.post(`${backendUrl}/api/orders/confirm-antom-payment`, payload);

            if (response.status === 200 || response.status === 201) {
                console.log(`Successfully updated order status to ${finalStatus} for: ${orderId}`);
            }
        } catch (backendError) {
            console.error('Error updating order status in backend:', backendError.response?.data || backendError.message);
        }

        return NextResponse.json({
            result: {
                resultStatus: "S"
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Webhook processing error:', error);
        return NextResponse.json({
            result: { resultStatus: "F" },
            message: error.message
        }, { status: 500 });
    }
}