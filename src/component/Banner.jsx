"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, GraduationCap, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);

    const slides = [
        {
            tag: "Project-Based Learning",
            icon: <BookOpen className="w-4 h-4 text-[#04cccc]" />,
            title: "Digital Advisory & Executive Education.",
            desc: "Stop tutorial hell. Gain practical, hands-on experience by building modern full-stack web applications step-by-step with guided mentors.",
            image: "/banner1.jpg",
            link: "/courses"
        },
        {
            tag: "Career Ready Track",
            icon: <GraduationCap className="w-4 h-4 text-[#04cccc]" />,
            title: "Elevate Your Software Engineering Journey",
            desc: "Master in-demand tech stacks like Next.js, React, and Node.js. Prepare for job-ready technical interviews and showcase an impressive portfolio.",
            image: "/banner2.jpg",
            link: "/courses"
        },
        {
            tag: "Interactive Platform",
            icon: <Award className="w-4 h-4 text-[#04cccc]" />,
            title: "Track Progress & Earn Industry Recognized Credentials",
            desc: "Join a community of thousands of active learners. Solve interactive coding challenges, get peer feedback, and showcase your achievements.",
            image: "/banner3.jpg",
            link: "/courses"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.98
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: "spring", stiffness: 260, damping: 28 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
            }
        },
        exit: (direction) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.98,
            transition: {
                x: { type: "spring", stiffness: 260, damping: 28 },
                opacity: { duration: 0.3 }
            }
        })
    };

    return (
        <section className="relative w-full bg-white dark:bg-black py-6 sm:py-10 transition-colors duration-300 overflow-hidden">
            {/* Background Image with Adaptive Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <Image
                    src="/bg-3.jpg"
                    alt="EduHub Background"
                    fill
                    priority
                    className="object-cover opacity-60 dark:opacity-40 transition-all duration-300"
                    suppressHydrationWarning
                />

                {/* White Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/20 dark:from-black/70 dark:via-black/40 dark:to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[420px] sm:h-[460px] md:h-[480px] relative flex items-center justify-center z-10">
                {/* Gradient Glow Effects */}
                <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
                    <div className="absolute top-12 left-10 w-72 h-72 bg-[#04cccc] rounded-full filter blur-[120px]" />
                    <div className="absolute bottom-12 right-10 w-72 h-72 bg-teal-500 rounded-full filter blur-[120px]" />
                </div>

                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center absolute inset-0 px-4 sm:px-6 lg:px-8"
                    >
                        {/* Content Side */}
                        <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
                            {/* Tag Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 text-[#04cccc] text-xs font-bold uppercase tracking-wider border border-teal-200/60 dark:border-teal-900/40"
                            >
                                {slides[currentSlide].icon}
                                <span>{slides[currentSlide].tag}</span>
                            </motion.div>

                            {/* Heading */}
                            <motion.h1
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100 leading-[1.15]"
                            >
                                {slides[currentSlide].title.split(" ").map((word, idx) => (
                                    <span key={idx}>
                                        {word.toLowerCase() === "projects" || word.toLowerCase() === "education" || word.toLowerCase() === "credentials" ? (
                                            <span className="bg-gradient-to-r from-[#04cccc] to-[#15a3a3] bg-clip-text text-transparent">
                                                {" "}{word}{" "}
                                            </span>
                                        ) : (
                                            ` ${word}`
                                        )}
                                    </span>
                                ))}
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-sm sm:text-base md:text-lg font-medium text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                            >
                                {slides[currentSlide].desc}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4"
                            >
                                <Link
                                    href={slides[currentSlide].link}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#04cccc] to-[#15a3a3] hover:opacity-95 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-teal-500/10 group text-sm sm:text-base cursor-pointer"
                                >
                                    <span>Explore Catalog</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Image Frame Side */}
                        <div className="hidden lg:col-span-5 lg:block relative h-[360px] w-full group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#04cccc]/20 to-teal-500/10 rounded-3xl transform rotate-2 group-hover:rotate-1 transition-transform duration-300" />
                            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-50 dark:bg-slate-900">
                                <Image
                                    src={slides[currentSlide].image}
                                    alt={slides[currentSlide].title}
                                    fill
                                    priority
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    suppressHydrationWarning
                                />
                                <div className="absolute inset-0 bg-slate-950/10 dark:bg-black/20" />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 flex items-center gap-2 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentSlide ? 1 : -1);
                                setCurrentSlide(index);
                            }}
                            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${index === currentSlide
                                ? "w-8 bg-[#04cccc]"
                                : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Banner;