'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { fetchPaymentStatus } from '@/lib/action/payment';

const ORDER_STORAGE_KEY = 'eduHubOrderId';

export default function PaymentSuccessClient() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState('checking');
    const [message, setMessage] = useState('Confirming your payment...');

    useEffect(() => {
        const orderId =
            searchParams.get('orderId') ||
            searchParams.get('client_orderid') ||
            (typeof window !== 'undefined' ? sessionStorage.getItem(ORDER_STORAGE_KEY) : '');

        if (!orderId) {
            setStatus('unknown');
            setMessage('Your payment was submitted. If access does not appear shortly, open My Courses and refresh.');
            return;
        }

        let cancelled = false;
        let attempts = 0;
        const maxAttempts = 6;

        const confirmPayment = async () => {
            try {
                const response = await fetchPaymentStatus(orderId);
                const payment = response?.data || response;
                const paymentStatus = payment?.paymentStatus;

                if (cancelled) return;

                if (paymentStatus === 'SUCCESS') {
                    sessionStorage.removeItem(ORDER_STORAGE_KEY);
                    setStatus('success');
                    setMessage('Your payment was successful. You now have access to the course.');
                    return;
                }

                if (paymentStatus === 'FAILED') {
                    sessionStorage.removeItem(ORDER_STORAGE_KEY);
                    setStatus('failed');
                    setMessage('The payment could not be completed. Please try again.');
                    return;
                }

                attempts += 1;
                if (attempts < maxAttempts) {
                    setStatus('checking');
                    setMessage('Payment received. Granting course access...');
                    setTimeout(confirmPayment, 2000);
                    return;
                }

                setStatus('pending');
                setMessage('Payment is still being confirmed. Open My Courses in a moment and the access should appear.');
            } catch {
                if (cancelled) return;
                attempts += 1;
                if (attempts < maxAttempts) {
                    setTimeout(confirmPayment, 2000);
                    return;
                }
                setStatus('pending');
                setMessage('We could not confirm the payment yet. Please open My Courses and refresh in a moment.');
            }
        };

        confirmPayment();

        return () => {
            cancelled = true;
        };
    }, [searchParams]);

    const isChecking = status === 'checking';

    return (
        <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    status === 'failed'
                        ? 'bg-red-500/10 text-red-500'
                        : 'bg-emerald-500/10 text-emerald-500'
                }`}>
                    {isChecking ? (
                        <Loader2 className="w-10 h-10 animate-spin text-[#04cccc]" />
                    ) : status === 'failed' ? (
                        <span className="text-3xl font-bold">!</span>
                    ) : (
                        <CheckCircle2 className="w-10 h-10" />
                    )}
                </div>
                <h1 className="text-2xl font-bold mb-2">
                    {status === 'failed' ? 'Payment failed' : status === 'success' ? 'Thank you' : 'Confirming payment'}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                    {message}
                </p>
                <Link
                    href="/dashboard/user/courses"
                    className="inline-block w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#04cccc] to-[#15a3a3] hover:opacity-90 text-white font-bold transition-all text-center"
                >
                    Go to My Courses
                </Link>
            </div>
        </div>
    );
}
