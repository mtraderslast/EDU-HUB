import { Suspense } from "react";
import CheckoutLoader from "./CheckoutLoader";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({ params }) {
    const { id } = await params;

    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center text-slate-600 font-semibold">
                Loading checkout...
            </div>
        }>
            <CheckoutLoader id={id} />
        </Suspense>
    );
}
