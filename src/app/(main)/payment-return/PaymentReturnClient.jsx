'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Clock } from 'lucide-react';

const POLL_INTERVAL_MS = 3000;
const MAX_ATTEMPTS = 10;

export default function PaymentReturnClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

    const [timedOut, setTimedOut] = useState(false);
    const attempts = useRef(0);

    useEffect(() => {
        if (!orderId) {
            router.replace('/payment-failed');
            return;
        }

        let cancelled = false;
        let timer;

        const check = async () => {
            attempts.current += 1;

            try {
                const res = await fetch(`${backendUrl}/api/payments/status/${encodeURIComponent(orderId)}`, {
                    cache: 'no-store',
                });
                const body = await res.json().catch(() => ({}));
                const status = body?.data?.paymentStatus;

                if (cancelled) return;

                if (status === 'SUCCESS') {
                    router.replace(`/payment-success?orderId=${encodeURIComponent(orderId)}`);
                    return;
                }
                if (status === 'FAILED' || res.status === 404) {
                    router.replace(`/payment-failed?orderId=${encodeURIComponent(orderId)}`);
                    return;
                }
            } catch (error) {
                console.error('Payment status check failed:', error);
            }

            if (cancelled) return;

            if (attempts.current >= MAX_ATTEMPTS) {
                setTimedOut(true);
                return;
            }
            timer = setTimeout(check, POLL_INTERVAL_MS);
        };

        check();

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [orderId, backendUrl, router]);

    return (
        <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 transition-colors duration-300">
            <div className="max-w-md w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
                {timedOut ? (
                    <>
                        <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Clock className="w-9 h-9" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Payment is still processing</h1>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                            We have not received the final confirmation yet. If your payment went through,
                            the course will appear in your dashboard shortly. Order ID: <strong>{orderId}</strong>
                        </p>
                        <Link
                            href="/"
                            className="inline-block w-full py-3.5 px-6 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold transition-all text-center"
                        >
                            Back to Home
                        </Link>
                    </>
                ) : (
                    <>
                        <Loader2 className="w-10 h-10 animate-spin text-[#04cccc] mx-auto mb-6" />
                        <h1 className="text-2xl font-bold mb-2">Verifying your payment...</h1>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Please do not close or refresh this page.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
