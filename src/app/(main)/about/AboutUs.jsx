"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import { GraduationCap, Users, CheckCircle2, Star, BookOpen } from "lucide-react";

function Counter({ value, duration = 2, decimals = 0 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, value, {
                duration: duration,
                ease: "easeOut",
                onUpdate: (latest) => {
                    setCount(decimals ? parseFloat(latest.toFixed(decimals)) : Math.floor(latest));
                },
            });
            return () => controls.stop();
        }
    }, [isInView, value, duration, decimals]);

    return <span ref={ref}>{count}{decimals && count % 1 === 0 ? ".0" : ""}</span>;
}

function AboutUs() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const bulletPoints = [
        "Industry-aligned, practical course curriculum",
        "Interactive live classes & real-world projects",
        "Lifetime community access & career support",
    ];

    return (
        <section ref={containerRef} className="w-full py-12 sm:py-16 bg-white dark:bg-black text-slate-900 dark:text-slate-100 transition-colors overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    <div className="lg:col-span-5 relative flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative w-full max-w-[450px] aspect-[4/5] rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900"
                        >
                            <Image
                                src="/about-next.jpg"
                                alt="Students learning together online"
                                fill
                                quality={100}
                                unoptimized={true}
                                className="object-cover"
                            />

                            <div className="absolute bottom-6 -right-4 sm:-right-6 bg-[#04cccc] p-5 rounded-2xl shadow-lg text-white max-w-[210px]">
                                <h3 className="text-3xl font-black flex items-center gap-0.5">
                                    <Counter value={10000} />+
                                </h3>
                                <p className="text-xs font-semibold leading-relaxed mt-1 text-white/90">
                                    Active Learners Enrolled
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-7 space-y-6 lg:space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-[2px] bg-[#04cccc] rounded-full"></span>
                                <span className="text-xs font-bold uppercase tracking-wider text-[#04cccc]">
                                    About Our Academy
                                </span>
                                <span className="w-6 h-[2px] bg-[#04cccc] rounded-full"></span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-slate-900 dark:text-white">
                                Empowering your future with{" "}
                                <span className="text-[#04cccc]">
                                    next-gen skills
                                </span>
                            </h2>

                            <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-neutral-400">
                                We bridge the gap between academic theory and practical industry demands. Our platform connects ambitious learners with expert mentors to build career-ready expertise.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-neutral-900 text-[#04cccc] border border-cyan-100 dark:border-neutral-800 flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <h4 className="text-base font-bold text-slate-900 dark:text-white">Expert Mentorship</h4>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                                    Learn directly from industry experts with real-world experience and personalized guidance.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-neutral-900 text-[#04cccc] border border-cyan-100 dark:border-neutral-800 flex items-center justify-center">
                                    <Users className="w-5 h-5" />
                                </div>
                                <h4 className="text-base font-bold text-slate-900 dark:text-white">Thriving Community</h4>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                                    Join thousands of passionate learners, collaborate on projects, and grow together.
                                </p>
                            </div>
                        </div>

                        <hr className="border-slate-200 dark:border-neutral-800" />

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                            <div className="sm:col-span-7 space-y-3.5">
                                {bulletPoints.map((point, index) => (
                                    <div key={index} className="flex items-center gap-3 text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-[#04cccc] shrink-0" />
                                        <span className="text-slate-700 dark:text-neutral-300 font-medium">{point}</span>
                                    </div>
                                ))}

                                <div className="pt-4">
                                    <Link
                                        href="/courses"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#04cccc] hover:opacity-90 rounded-xl transition-all shadow-sm active:scale-95 group"
                                    >
                                        Explore Courses
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="sm:col-span-5 p-6 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-950/60 text-center sm:text-left">
                                <div className="flex gap-1 justify-center sm:justify-start mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    ))}
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                                    <Counter value={4.9} duration={2} decimals={1} />
                                    <span className="text-sm font-normal text-slate-500 dark:text-neutral-400"> /5.0</span>
                                </h3>
                                <p className="text-xs font-semibold text-slate-600 dark:text-neutral-400 mt-2">
                                    Student Satisfaction Score
                                </p>
                            </div>
                        </div>

                        <hr className="border-slate-200 dark:border-neutral-800" />

                    </div>

                </div>
            </div>
        </section>
    );
}

export default AboutUs;