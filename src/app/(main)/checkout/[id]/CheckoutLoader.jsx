"use client";

import { useEffect, useState } from "react";
import { fetchCourseDetails, unwrapCourse } from "@/lib/action/course";
import CheckoutClient from "./CheckoutClient";
import Loading from "@/app/loading";

export default function CheckoutLoader({ id }) {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        const load = async () => {
            if (!id) {
                if (active) {
                    setCourse(null);
                    setLoading(false);
                }
                return;
            }

            try {
                const res = await fetchCourseDetails(id);
                if (active) setCourse(unwrapCourse(res));
            } catch (error) {
                console.error("Failed to fetch course details for checkout:", error);
                if (active) setCourse(null);
            } finally {
                if (active) setLoading(false);
            }
        };

        load();
        return () => {
            active = false;
        };
    }, [id]);

    if (loading) {
        return <Loading />
    }

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-2xl font-bold">Course Not Found</h2>
            </div>
        );
    }

    return <CheckoutClient courseData={course} />;
}
