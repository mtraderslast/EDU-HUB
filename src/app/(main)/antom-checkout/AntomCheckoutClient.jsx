'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Loader2 } from 'lucide-react';
import Link from "next/link";

const SDK_SRC = 'https://sdk.marmot-cloud.com/package/ams-checkout/1.10.1/dist/umd/ams-checkout.min.js';

export default function AntomCheckoutClient() {
    const started = useRef(false);
    const [error, setError] = useState('');

    const startCheckout = async () => {
        if (started.current) return;
        started.current = true;

        let payload;
        try {
            payload = JSON.parse(sessionStorage.getItem('antomCheckout') || '');
        } catch {
            payload = null;
        }

        if (!payload?.sessionData) {
            window.location.replace('/payment-failed');
            return;
        }

        sessionStorage.removeItem('antomCheckout');

        const AMSCashierPayment = window.AMSCashierPayment;
        if (!AMSCashierPayment) {
            setError('Payment form failed to load. Please try again.');
            return;
        }

        const checkoutApp = new AMSCashierPayment({
            environment: payload.environment === 'prod' ? 'prod' : 'sandbox',
            locale: 'en_US',
            onEventCallback: ({ code }) => {
                if (code === 'SDK_PAYMENT_SUCCESSFUL') {
                    window.location.replace('/payment-success');
                }
                if (code === 'SDK_PAYMENT_FAIL' || code === 'SDK_PAYMENT_ERROR') {
                    window.location.replace('/payment-failed');
                }
                if (code === 'SDK_PAYMENT_CANCEL') {
                    window.location.replace('/payment-failed');
                }
            },
        });

        try {
            await checkoutApp.createComponent({
                sessionData: payload.sessionData,
                appearance: { showLoading: true },
            });
        } catch (err) {
            console.error('Antom checkout error:', err);
            setError('Payment form failed to load. Please try again.');
        }
    };

    useEffect(() => {
        if (window.AMSCashierPayment) {
            startCheckout();
        }
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 flex items-center justify-center p-4">
            <Script src={SDK_SRC} strategy="afterInteractive" onLoad={startCheckout} />
            <div className="max-w-md w-full text-center">
                {error ? (
                    <>
                        <h1 className="text-xl font-bold mb-2">Unable to open payment</h1>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">{error}</p>
                        <Link
                            href="/courses"
                            className="inline-block py-3 px-6 rounded-xl bg-gradient-to-r from-[#04cccc] to-[#15a3a3] text-white font-semibold"
                        >
                            Back to courses
                        </Link>
                    </>
                ) : (
                    <>
                        <Loader2 className="w-10 h-10 animate-spin text-[#04cccc] mx-auto mb-4" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">Loading secure card payment...</p>
                    </>
                )}
            </div>
        </div>
    );
}
