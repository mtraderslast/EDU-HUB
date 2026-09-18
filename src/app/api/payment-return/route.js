import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://www.mtradershklimited.com').replace(/\/$/, '');

        const resultStatus = searchParams.get('resultStatus');
        const resultCode = searchParams.get('resultCode');
        const status = searchParams.get('status');
        const paymentRequestId = searchParams.get('paymentRequestId');

        const isSuccess = 
            resultStatus === 'S' || 
            resultCode === 'SUCCESS' || 
            status === 'SUCCESS' || 
            status === 'S';

        if (isSuccess) {
            return NextResponse.redirect(`${appUrl}/payment-success?orderId=${paymentRequestId || ''}`);
        }

        return NextResponse.redirect(`${appUrl}/payment-failed?orderId=${paymentRequestId || ''}`);
    } catch (error) {
        console.error('Payment return redirect error:', error);
        const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://www.mtradershklimited.com').replace(/\/$/, '');
        return NextResponse.redirect(`${appUrl}/payment-failed`);
    }
}