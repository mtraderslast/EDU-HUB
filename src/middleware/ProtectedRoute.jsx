'use client';

import React, { useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter, usePathname } from 'next/navigation';
import Loading from '@/app/loading';

function ProtectedRoute({ children, roles = null, fallbackUrl = '/login' }) {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isPending) return;

        if (!session) {
            router.push(`${fallbackUrl}?callbackUrl=${encodeURIComponent(pathname)}`);
            return;
        }

        if (roles && roles.length > 0) {
            const userRole = session.user?.role;

            if (!userRole || !roles.includes(userRole)) {
                router.push('/unauthorized');
                return;
            }
        }

    }, [session, isPending, router, pathname, roles, fallbackUrl]);

    if (isPending) {
        return <Loading />;
    }

    if (!session) {
        return null;
    }

    if (roles && roles.length > 0) {
        const userRole = session.user?.role;
        if (!userRole || !roles.includes(userRole)) {
            return null;
        }
    }

    return <>{children}</>;
}

export default ProtectedRoute;