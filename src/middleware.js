import { NextResponse } from 'next/server';

const PAYMENT_PAGES = new Set(['/payment-success', '/payment-failed', '/payment-return']);

const ORDER_ID_KEYS = ['orderId', 'client_orderid', 'merchant_order', 'clientOrderId'];

const getOrderId = (searchParams) => {
    for (const key of ORDER_ID_KEYS) {
        const value = searchParams.get(key);
        if (value) return value;
    }
    return '';
};

export function middleware(request) {
    const { pathname, searchParams } = request.nextUrl;
    if (!PAYMENT_PAGES.has(pathname)) return NextResponse.next();

    const orderId = getOrderId(searchParams);
    const url = request.nextUrl.clone();
    url.search = orderId ? `?orderId=${encodeURIComponent(orderId)}` : '';

    if (pathname === '/payment-return') {
        url.pathname = '/payment-success';
        return NextResponse.redirect(url, 303);
    }

    const isCleanOrderUrl = searchParams.size === 0 || (searchParams.size === 1 && searchParams.has('orderId'));

    if (request.method === 'POST' || (request.nextUrl.search && !isCleanOrderUrl)) {
        return NextResponse.redirect(url, 303);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/payment-success', '/payment-failed', '/payment-return'],
};
