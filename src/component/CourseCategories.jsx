"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const CourseCategories = () => {
    const scrollContainerRef = useRef(null);

    const categories = [
        {
            id: 1,
            title: "Development",
            coursesCount: "120+ Courses",
            image: "/course/course-banner-1.png",
        },
        {
            id: 2,
            title: "Technology",
            coursesCount: "85+ Courses",
            image: "/course/course-banner-2.png",
        },
        {
            id: 3,
            title: "Creativity & Design",
            coursesCount: "64+ Courses",
            image: "/course/course-banner-3.png",
        },
        {
            id: 4,
            title: "Professional Development",
            coursesCount: "42+ Courses",
            image: "/course/course-banner-4.png",
        },
        {
            id: 5,
            title: "Sales & Marketing",
            coursesCount: "50+ Courses",
            image: "/course/course-banner-5.png",
        },
        {
            id: 6,
            title: "Freelance Marketplace",
            coursesCount: "38+ Courses",
            image: "/course/course-banner-6.png",
        },
        {
            id: 7,
            title: "Business",
            coursesCount: "95+ Courses",
            image: "/course/course-banner-7.png",
        },
        {
            id: 8,
            title: "Personal Development",
            coursesCount: "30+ Courses",
            image: "/course/course-banner-8.png",
        },
        {
            id: 9,
            title: "Language Learning",
            coursesCount: "25+ Courses",
            image: "/course/course-banner-9.png",
        },
        {
            id: 10,
            title: "Teaching & Academic",
            coursesCount: "40+ Courses",
            image: "/course/course-banner-10.png",
        },
        {
            id: 11,
            title: "Workshop & Live",
            coursesCount: "15+ Live Sessions",
            image: "/course/course-banner-11.png",
        }
    ];

    const handleScroll = (direction) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = 300;

            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="py-10 bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header with Navigation Controls */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div className="space-y-2">
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                            Explore Top{" "}
                            <span className="bg-gradient-to-r from-[#04cccc] to-[#15a3a3] bg-clip-text text-transparent">
                                Learning Tracks
                            </span>
                        </h2>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handleScroll("left")}
                            className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-[#04cccc] hover:text-white dark:hover:bg-[#04cccc] dark:hover:text-white hover:border-[#04cccc] transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => handleScroll("right")}
                            className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-[#04cccc] hover:text-white dark:hover:bg-[#04cccc] dark:hover:text-white hover:border-[#04cccc] transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                            aria-label="Next Slide"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Horizontal Scrollable Grid */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 snap-x snap-mandatory"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/courses?category=${encodeURIComponent(cat.title)}`}
                            className="snap-start shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] group"
                        >
                            <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 transition-all duration-300 hover:border-[#04cccc]/50 hover:shadow-lg hover:shadow-teal-500/5 hover:-translate-y-1 flex items-center gap-4 backdrop-blur-xl">

                                {/* Thumbnail Image */}
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-800">
                                    <Image
                                        src={cat.image}
                                        alt={cat.title}
                                        fill
                                        sizes="64px"
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#04cccc] transition-colors truncate">
                                        {cat.title}
                                    </h3>
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                                        {cat.coursesCount}
                                    </p>
                                </div>

                                {/* Arrow Icon */}
                                <div className="w-8 h-8 rounded-full bg-slate-200/50 dark:bg-slate-800/60 flex items-center justify-center text-slate-400 group-hover:bg-[#04cccc] group-hover:text-white transition-all shrink-0">
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CourseCategories;