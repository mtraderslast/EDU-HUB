import { Suspense } from "react";
import CourseDetailsClient from "./CourseDetailsClient";

export const dynamic = "force-dynamic";

export default async function CourseDetailsPage({ params }) {
    const { id } = await params;

    return (
        <Suspense fallback={
            <div className="min-h-[60vh] flex items-center justify-center text-slate-600 dark:text-slate-400 font-semibold">
                Loading course...
            </div>
        }>
            <CourseDetailsClient id={id} />
        </Suspense>
    );
}
