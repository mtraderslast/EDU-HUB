import Link from 'next/link';

export default function PaymentFailedPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 transition-colors duration-300">
            <div className="max-w-md w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-2xl">

                <div className="w-16 h-16 bg-red-500/10 text-red-500 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    Payment Failed
                </h2>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                    Your payment could not be processed or was cancelled. Please try again.
                </p>

                <div>
                    <Link
                        href="/"
                        className="block w-full py-3.5 px-6 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold transition-all text-center"
                    >
                        Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
}