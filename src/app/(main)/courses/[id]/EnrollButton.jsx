'use client';

import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EnrollButton({ courseData }) {
    const router = useRouter();

    const handleEnroll = () => {
        router.push(`/checkout/${courseData._id}`);
    };

    return (
        <button
            onClick={handleEnroll}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#04cccc] to-[#15a3a3] hover:opacity-95 text-white font-bold text-base transition-all shadow-lg shadow-teal-500/10 flex items-center justify-center gap-2 cursor-pointer"
        >
            <ShoppingCart className="w-5 h-5" />
            <span>Enroll In Course</span>
        </button>
    );
}