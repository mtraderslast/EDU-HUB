import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 transition-colors duration-300">
            <div className="max-w-md w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                </div>

                <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    Payment Successful!
                </h1>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                    Thank you for your enrollment. Your payment has been processed successfully.
                </p>

                <Link
                    href="/"
                    className="inline-block w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#04cccc] to-[#15a3a3] hover:opacity-90 text-white font-bold transition-all shadow-lg shadow-[#04cccc]/20 text-center"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}