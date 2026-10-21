import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import PaymentResultClient from '@/components/PaymentResultClient';

export const metadata = {
    title: 'Payment successful',
};

export default function PaymentSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#04cccc]" />
                </div>
            }
        >
            <PaymentResultClient mode="success" />
        </Suspense>
    );
}
