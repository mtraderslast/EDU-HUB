import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import PaymentReturnClient from './PaymentReturnClient';

export const metadata = {
    title: 'Verifying payment',
};

function Fallback() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#04cccc]" />
        </div>
    );
}

export default function PaymentReturnPage() {
    return (
        <Suspense fallback={<Fallback />}>
            <PaymentReturnClient />
        </Suspense>
    );
}
