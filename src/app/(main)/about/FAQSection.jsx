"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function FAQSection() {
    const faqData = [
        {
            question: "How long do I have access to the courses after purchasing?",
            answer: "Once enrolled, you get lifetime access to all course materials, video lectures, downloadable resources, and future updates without any recurring subscription fees."
        },
        {
            question: "What is your refund policy for enrolled courses?",
            answer: "We do not offer refunds once a course is purchased, as full digital access to all lessons and proprietary resources is granted immediately. If you have any questions or doubts before enrolling, we strongly encourage you to reach out and consult with our experienced support team."
        },
        {
            question: "Are the courses self-paced or do they follow a strict schedule?",
            answer: "Our courses are fully self-paced, allowing you to learn at your own speed and schedule. You can revisit complex modules whenever you need to refresh your understanding."
        },
        {
            question: "Will I receive a certificate upon course completion?",
            answer: "Yes, upon successfully finishing all modules and practical assignments, you will receive an official verifiable digital certificate to showcase on your portfolio and LinkedIn profile."
        },
        {
            question: "Can I consult with the team if I am unsure which course to pick?",
            answer: "Absolutely! Our academic counselors and expert team are available to help you evaluate your current skill level and guide you toward the best learning path for your career goals."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className="w-full py-5 bg-white dark:bg-black text-slate-900 dark:text-slate-100 transition-colors">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center space-y-3 mb-12 max-w-3xl mx-auto">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-[2px] bg-[#04cccc] rounded-full"></span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#04cccc]">
                            Questions & Answers
                        </span>
                        <span className="w-6 h-[2px] bg-[#04cccc] rounded-full"></span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Frequently Asked <span className="text-[#04cccc]">Questions</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 font-normal leading-relaxed">
                        Find answers to common questions regarding course enrollments, lifetime access, learning paths, and platform policies.
                    </p>
                </div>

                {/* Minimalist Accordion List */}
                <div className="divide-y divide-slate-200 dark:divide-neutral-800 border-t border-b border-slate-200 dark:border-neutral-800">
                    {faqData.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div key={idx} className="py-5 transition-colors">
                                {/* Accordion Trigger */}
                                <button
                                    onClick={() => toggleFAQ(idx)}
                                    className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none"
                                >
                                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#04cccc] transition-colors">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 shrink-0 text-slate-400 group-hover:text-[#04cccc] transition-transform duration-300 ${isOpen ? "rotate-180 text-[#04cccc]" : ""
                                            }`}
                                    />
                                </button>

                                {/* Accordion Content Panel */}
                                <div
                                    className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-neutral-400 pl-1">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Navigation Link */}
                <div className="mt-10 text-center">
                    <Link
                        href="/faqs"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-neutral-200 hover:text-[#04cccc] dark:hover:text-[#04cccc] transition-colors py-2 group border-b border-transparent hover:border-[#04cccc]"
                    >
                        Explore All FAQs
                        <ArrowRight className="w-4 h-4 text-[#04cccc] group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    );
}