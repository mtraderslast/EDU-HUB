import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.mtradershklimited.com';

    const resultCode = searchParams.get('resultCode');

    if (resultCode === 'SUCCESS' || 'S') {
        return NextResponse.redirect(`${appUrl}/payment-success`);
    }

    return NextResponse.redirect(`${appUrl}/payment-failed`);
}