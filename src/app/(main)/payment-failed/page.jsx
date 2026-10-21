import Link from 'next/link';

export const metadata = {
    title: 'Payment failed',
};

export default function PaymentFailedPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
                <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold mb-2">Payment failed</h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                    The payment could not be completed. Please try again.
                </p>
                <Link
                    href="/courses"
                    className="block w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#04cccc] to-[#15a3a3] hover:opacity-90 text-white font-bold transition-all text-center mb-3"
                >
                    Try Again
                </Link>
                <Link
                    href="/"
                    className="block w-full py-3.5 px-6 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold transition-all text-center"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
