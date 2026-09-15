"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { fetchAllCourse } from '@/lib/action/course';
import CourseCard from './CourseCard';

export default function FeaturedCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getHomeCourses = async () => {
            setLoading(true);
            try {
                const res = await fetchAllCourse({ page: 1, limit: 6 });
                const responseData = res?.data?.data ? res.data : res;

                if (responseData?.success) {
                    setCourses(responseData.data || []);
                }
            } catch (error) {
                console.error("Failed to fetch featured courses:", error);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };

        getHomeCourses();
    }, []);

    return (
        <section className="py-10 dark:bg-slate-950/50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Area with Heading, Description & View All Button */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">

                    {/* Left: Heading & Short Paragraph */}
                    <div className="space-y-3 max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                            Explore Our <span className="text-[#04cccc]">Featured Courses</span>
                        </h2>

                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                            Handpicked expert-led courses designed to help you master modern skills, build real projects, and launch your dream career.
                        </p>
                    </div>

                    {/* Right: View All Courses Button */}
                    <div className="shrink-0">
                        <Link
                            href="/courses"
                            className="inline-flex items-center justify-center gap-2 text-slate-800 dark:text-slate-200 hover:text-[#04cccc] dark:hover:text-[#04cccc] font-bold text-sm transition-colors duration-300 group"
                        >
                            <span>View All Courses</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                </div>

                {/* Course Grid / Loading Skeleton */}
                {loading ? (
                    /* Loading Skeleton (6 Cards) */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, idx) => (
                            <div
                                key={idx}
                                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 h-[400px] animate-pulse shadow-sm"
                            />
                        ))}
                    </div>
                ) : courses.length > 0 ? (
                    /* 6 Featured Courses Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.slice(0, 6).map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))}
                    </div>
                ) : (
                    /* Fallback when no courses are available */
                    <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                            No featured courses available right now.
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
}