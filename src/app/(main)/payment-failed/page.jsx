import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import PaymentResultClient from '@/components/PaymentResultClient';

export const metadata = {
    title: 'Payment failed',
};

export default function PaymentFailedPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#04cccc]" />
                </div>
            }
        >
            <PaymentResultClient mode="failed" />
        </Suspense>
    );
}
