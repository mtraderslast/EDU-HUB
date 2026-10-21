import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Payment',
};

export default function PaymentReturnPage() {
    redirect('/payment-success');
}
