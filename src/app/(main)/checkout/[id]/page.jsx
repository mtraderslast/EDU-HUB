import { fetchCourseDetails } from '@/lib/action/course';
import CheckoutClient from './CheckoutClient';

export default async function CheckoutPage({ params }) {
    const { id } = await params;

    let course = null;
    try {
        const res = await fetchCourseDetails(id);
        if (res?.data?.success) {
            course = res.data.data;
        } else if (res?.data) {
            course = res.data;
        } else {
            course = res;
        }
    } catch (error) {
        console.error("Failed to fetch course details for checkout:", error);
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