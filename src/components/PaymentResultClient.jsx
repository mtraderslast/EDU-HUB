'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, Clock, Loader2 } from 'lucide-react';

const POLL_INTERVAL_MS = 3000;
const MAX_ATTEMPTS = 20;

const fetchStatus = async (backendUrl, orderId) => {
    const res = await fetch(`${backendUrl}/api/payments/status/${encodeURIComponent(orderId)}`, {
        cache: 'no-store',
    });
    const body = await res.json().catch(() => ({}));
    return { httpStatus: res.status, paymentStatus: body?.data?.paymentStatus || '' };
};

export default function PaymentResultClient({ mode }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

    const [view, setView] = useState(mode === 'failed' && !orderId ? 'failed' : 'verifying');
    const attempts = useRef(0);

    useEffect(() => {
        if (!orderId) {
            if (mode !== 'failed') router.replace('/payment-failed');
            return;
        }

        let cancelled = false;
        let timer;

        const check = async () => {
            attempts.current += 1;

            try {
                const { httpStatus, paymentStatus } = await fetchStatus(backendUrl, orderId);
                if (cancelled) return;

                if (paymentStatus === 'SUCCESS') {
                    if (mode === 'success') setView('success');
                    else router.replace(`/payment-success?orderId=${encodeURIComponent(orderId)}`);
                    return;
                }

                if (paymentStatus === 'FAILED' || httpStatus === 404) {
                    if (mode === 'failed') setView('failed');
                    else router.replace(`/payment-failed?orderId=${encodeURIComponent(orderId)}`);
                    return;
                }
            } catch (error) {
                console.error('Payment status check failed:', error);
            }

            if (cancelled) return;

            if (attempts.current >= MAX_ATTEMPTS) {
                setView(mode === 'failed' ? 'failed' : 'pending');
                return;
            }

            timer = setTimeout(check, POLL_INTERVAL_MS);
        };

        check();

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [orderId, backendUrl, router, mode]);

    if (view === 'verifying') {
        return (
            <ResultShell>
                <Loader2 className="w-10 h-10 animate-spin text-[#04cccc] mx-auto mb-6" />
                <h1 className="text-2xl font-bold mb-2">Verifying your payment...</h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Please do not close or refresh this page.
                </p>
            </ResultShell>
        );
    }

    if (view === 'success') {
        return (
            <ResultShell>
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                    Thank you for your enrollment. Your payment has been processed successfully.
                </p>
                {orderId && (
                    <p className="text-xs text-slate-500 mb-6">
                        Order ID: <strong>{orderId}</strong>
                    </p>
                )}
                <Link
                    href="/dashboard/user/courses"
                    className="inline-block w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#04cccc] to-[#15a3a3] hover:opacity-90 text-white font-bold transition-all shadow-lg shadow-[#04cccc]/20 text-center"
                >
                    Go to My Courses
                </Link>
            </ResultShell>
        );
    }

    if (view === 'pending') {
        return (
            <ResultShell>
                <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-9 h-9" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Payment is still processing</h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                    We have not received the final confirmation yet. If your payment went through,
                    the course will appear in your dashboard shortly.
                    {orderId && (
                        <>
                            {' '}Order ID: <strong>{orderId}</strong>
                        </>
                    )}
                </p>
                <Link
                    href="/dashboard/user/courses"
                    className="inline-block w-full py-3.5 px-6 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold transition-all text-center"
                >
                    Check My Courses
                </Link>
            </ResultShell>
        );
    }

    return (
        <ResultShell>
            <div className="w-16 h-16 bg-red-500/10 text-red-500 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                Your payment could not be processed or was cancelled. Please try again.
                {orderId && (
                    <>
                        {' '}Order ID: <strong>{orderId}</strong>
                    </>
                )}
            </p>
            <Link
                href="/courses"
                className="block w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#04cccc] to-[#15a3a3] hover:opacity-90 text-white font-bold transition-all text-center mb-3"
            >
                Try Again
            </Link>
            <Link
                href="/"
                className="block w-full py-3.5 px-6 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold transition-all text-center"
            >
                Back to Home
            </Link>
        </ResultShell>
    );
}

function ResultShell({ children }) {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 transition-colors duration-300">
            <div className="max-w-md w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
                {children}
            </div>
        </div>
    );
}
