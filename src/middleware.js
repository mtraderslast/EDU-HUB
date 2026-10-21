import { NextResponse } from 'next/server';

const PAYMENT_PAGES = new Set(['/payment-success', '/payment-failed', '/payment-return']);

export function middleware(request) {
    const { pathname } = request.nextUrl;
    if (!PAYMENT_PAGES.has(pathname)) return NextResponse.next();

    const url = request.nextUrl.clone();
    url.search = '';

    if (pathname === '/payment-return') {
        url.pathname = '/payment-success';
        return NextResponse.redirect(url, 303);
    }

    if (request.method === 'POST' || request.nextUrl.search) {
        return NextResponse.redirect(url, 303);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/payment-success', '/payment-failed', '/payment-return'],
};
