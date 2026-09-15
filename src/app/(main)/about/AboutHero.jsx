"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";

export default function AboutHero() {
    return (
        <section className="w-full py-10 bg-white dark:bg-black text-slate-900 dark:text-slate-100 transition-colors">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

                    <div className="lg:col-span-7 space-y-6 text-left">
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-[2px] bg-[#04cccc] rounded-full"></span>
                            <span className="text-xs font-bold uppercase tracking-wider text-[#04cccc]">
                                About Our Platform
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                            Empowering Learners <br className="hidden sm:inline" />
                            With Industry-Led <span className="text-[#04cccc]">Skills</span>
                        </h1>

                        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-neutral-400 max-w-2xl">
                            We are dedicated to transforming online education by bridging the gap between theoretical knowledge and practical industry demands. Our platform connects passionate learners with world-class instructors to build meaningful careers.
                        </p>

                        <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg">
                            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-950/60">
                                <div className="flex items-center gap-2 text-[#04cccc] mb-1">
                                    <BookOpen className="w-4 h-4" />
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">50+</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-neutral-400 font-medium">Courses</p>
                            </div>

                            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-950/60">
                                <div className="flex items-center gap-2 text-[#04cccc] mb-1">
                                    <Users className="w-4 h-4" />
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">10K+</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-neutral-400 font-medium">Students</p>
                            </div>

                            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-950/60">
                                <div className="flex items-center gap-2 text-[#04cccc] mb-1">
                                    <Award className="w-4 h-4" />
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">98%</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-neutral-400 font-medium">Success Rate</p>
                            </div>
                        </div>

                        <div className="pt-2 flex flex-wrap items-center gap-4">
                            <Link
                                href="/courses"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#04cccc] hover:opacity-90 text-white font-semibold text-sm transition-opacity shadow-sm"
                            >
                                Explore Courses
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-slate-800 dark:text-neutral-200 hover:border-[#04cccc] dark:hover:border-[#04cccc] font-semibold text-sm transition-colors shadow-sm"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900 shadow-sm">
                            <Image
                                src="/about-Banner.jpg"
                                alt="About Us Platform"
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 40vw"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}