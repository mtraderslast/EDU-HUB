'use client';

import { useEffect, useState } from 'react';
import { PlayCircle, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { fetchMyCourses } from '@/lib/action/course';

export default function EnrollButton({ courseData }) {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        if (!session?.user || !courseData?._id) {
            setIsEnrolled(false);
            return;
        }

        const checkEnrollment = async () => {
            try {
                const response = await fetchMyCourses();
                const courses = response?.data?.data || response?.data || [];
                const enrolled = Array.isArray(courses) && courses.some(
                    (item) => String(item.courseId) === String(courseData._id) && item.isAccessGranted
                );
                setIsEnrolled(Boolean(enrolled));
            } catch {
                setIsEnrolled(false);
            }
        };

        checkEnrollment();
    }, [session, courseData?._id]);

    const handleEnroll = () => {
        if (isEnrolled) {
            router.push(`/courses/${courseData._id}/learn`);
            return;
        }

        router.push(`/checkout/${courseData._id}`);
    };

    return (
        <button
            onClick={handleEnroll}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#04cccc] to-[#15a3a3] hover:opacity-95 text-white font-bold text-base transition-all shadow-lg shadow-teal-500/10 flex items-center justify-center gap-2 cursor-pointer"
        >
            {isEnrolled ? <PlayCircle className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
            <span>{isEnrolled ? 'Start Course' : 'Enroll In Course'}</span>
        </button>
    );
}