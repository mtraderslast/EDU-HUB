"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function ContactFAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            q: "How do I enroll in a course and access the learning materials?",
            a: "Simply create an account, select your desired course, and complete the checkout process. Once enrolled, you get instant lifetime access to all course modules, videos, and downloadable resources from your dashboard."
        },
        {
            q: "Will I receive a completion certificate after finishing a course?",
            a: "Yes! Upon successfully completing all video lessons, quizzes, and assignments of a course, you will be awarded an industry-recognized digital Certificate of Completion."
        },
        {
            q: "What payment methods do you accept?",
            a: "We support major credit/debit cards (Visa, Mastercard, American Express), Mobile Banking (bKash, Nagad, Rocket), and PayPal for seamless online checkout."
        },
        {
            q: "Can I access the courses from mobile devices?",
            a: "Absolutely. Our platform is fully responsive and optimized for desktop, tablets, and smartphones, allowing you to learn anytime, anywhere at your own pace."
        },
        {
            q: "What is your refund policy if I am not satisfied?",
            a: "We offer a hassle-free 30-day money-back guarantee. If the course doesn't meet your expectations, contact our support team within 30 days of purchase for a full refund."
        }
    ];

    return (
        <section className="w-full py-12 bg-white dark:bg-black text-slate-900 dark:text-slate-100 transition-colors">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* FAQ Header */}
                <div className="text-center space-y-3 mb-10">
                    <div className="flex items-center justify-center gap-2">
                        <span className="w-6 h-[2px] bg-[#04cccc] rounded-full"></span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#04cccc]">
                            Got Questions?
                        </span>
                        <span className="w-6 h-[2px] bg-[#04cccc] rounded-full"></span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Frequently Asked Questions
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 max-w-xl mx-auto">
                        Everything you need to know about our courses, enrollment, certificates, and student support.
                    </p>
                </div>

                {/* Accordion List */}
                <div className="space-y-3.5">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className={`rounded-xl border transition-all duration-200 overflow-hidden ${isOpen
                                        ? "border-[#04cccc] bg-slate-50/80 dark:bg-neutral-900/90 shadow-sm"
                                        : "border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/60 hover:border-slate-300 dark:hover:border-neutral-700"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? "text-[#04cccc]" : "text-slate-400 dark:text-neutral-500"
                                            }`} />
                                        <span className={`text-sm sm:text-base font-semibold ${isOpen ? "text-slate-900 dark:text-white" : "text-slate-800 dark:text-neutral-200"
                                            }`}>
                                            {faq.q}
                                        </span>
                                    </div>
                                    <span
                                        className={`ml-4 shrink-0 p-1 rounded-md transition-colors ${isOpen
                                                ? "bg-[#04cccc]/10 text-[#04cccc]"
                                                : "bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400"
                                            }`}
                                    >
                                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </span>
                                </button>

                                {/* Answer Box */}
                                {isOpen && (
                                    <div className="px-5 pb-5 pt-1 border-t border-slate-200/60 dark:border-neutral-800/80">
                                        <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-neutral-400">
                                            {faq.a}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}