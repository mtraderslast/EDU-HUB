import { Suspense } from 'react';
import PaymentSuccessClient from './PaymentSuccessClient';

export const metadata = {
    title: 'Payment successful',
};

export default function PaymentSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-[#04cccc]/20 border-t-[#04cccc] rounded-full animate-spin" />
                </div>
            }
        >
            <PaymentSuccessClient />
        </Suspense>
    );
}
