"use client";

import React from "react";
import { BookOpen, SearchCheck, Briefcase, Sparkles, ArrowUpRight } from "lucide-react";

const TrendingCoursesBanner = () => {
    const features = [
        {
            id: 1,
            icon: <BookOpen className="w-8 h-8 text-[#04cccc]" />,
            title: "Choose Flexible Learning Options",
            description: "Choose among free, online, or specialized master courses tailored to your goal.",
            badge: "Diverse Catalog"
        },
        {
            id: 2,
            icon: <SearchCheck className="w-8 h-8 text-[#04cccc]" />,
            title: "Compare Top-Tier Content",
            description: "Search & compare courses among top industry leaders and verified course providers.",
            badge: "Smart Filter"
        },
        {
            id: 3,
            icon: <Briefcase className="w-8 h-8 text-[#04cccc]" />,
            title: "Get Job & Career Ready",
            description: "Get career ready with targeted upskilling in high-demand software & tech fields.",
            badge: "Career Growth"
        }
    ];

    return (
        <section className="py-16 bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden">
            {/* Background Glow Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-64 bg-teal-500/5 dark:bg-[#04cccc]/10 blur-[120px] pointer-events-none rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                        Discover Top{" "}
                        <span className="bg-gradient-to-r from-[#04cccc] to-[#15a3a3] bg-clip-text text-transparent">
                            Trending Courses
                        </span>
                    </h2>

                    <p className="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                        See what skills other learners and professionals in your domain are working on. Search from over 5,000+ curated courses.
                    </p>
                </div>

                {/* 3-Column Grid Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((item) => (
                        <div
                            key={item.id}
                            className="group relative bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 p-8 rounded-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5 hover:-translate-y-1 flex flex-col justify-between"
                        >
                            <div className="space-y-5">
                                {/* Top Badge & Icon Frame */}
                                <div className="flex items-center justify-between">
                                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black border border-slate-200/80 dark:border-slate-800 flex items-center justify-center shadow-xs group-hover:border-[#04cccc]/40 transition-colors">
                                        {item.icon}
                                    </div>
                                    <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                        {item.badge}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="space-y-2 pt-2">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#04cccc] transition-colors flex items-center justify-between">
                                        {item.title}
                                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all text-[#04cccc] transform group-hover:translate-x-0.5" />
                                    </h3>
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom Decorative Bar */}
                            <div className="mt-6 w-full h-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                <div className="w-0 group-hover:w-full h-full bg-gradient-to-r from-[#04cccc] to-[#15a3a3] transition-all duration-500 ease-out" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingCoursesBanner;