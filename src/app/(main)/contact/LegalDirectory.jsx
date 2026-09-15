"use client";

import Link from "next/link";
import { FileText, ShieldCheck, RefreshCw, Lock, ArrowRight } from "lucide-react";

export default function LegalDirectory() {
    const policies = [
        {
            title: "Terms & Conditions",
            desc: "Rules, regulations, and legal agreements governing course enrollment, platform usage, and intellectual property.",
            href: "/terms-conditions",
            icon: <FileText className="w-5 h-5 text-[#04cccc]" />
        },
        {
            title: "Privacy Policy",
            desc: "Learn how we collect, protect, and manage your personal student data, learning analytics, and payment information.",
            href: "/privacy-policy",
            icon: <Lock className="w-5 h-5 text-[#04cccc]" />
        },
        {
            title: "Refund Policy",
            desc: "Detailed guidelines regarding our 30-day money-back guarantee, eligibility, and refund request procedures.",
            href: "/refund-policy",
            icon: <RefreshCw className="w-5 h-5 text-[#04cccc]" />
        },
        {
            title: "Student Code of Conduct",
            desc: "Community guidelines for discussion forums, peer interactions, academic integrity, and acceptable platform behavior.",
            href: "/code-of-conduct",
            icon: <ShieldCheck className="w-5 h-5 text-[#04cccc]" />
        }
    ];

    return (
        <section className="w-full py-12 bg-white dark:bg-black text-slate-900 dark:text-slate-100 transition-colors">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                {/* Section Header */}
                <div className="text-left space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-[2px] bg-[#04cccc] rounded-full"></span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#04cccc]">
                            Legal & Compliance
                        </span>
                        <span className="w-6 h-[2px] bg-[#04cccc] rounded-full"></span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Platform Policies & Terms
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 font-normal max-w-2xl">
                        Please carefully review our official legal documentation to understand your rights, responsibilities, and guidelines as a student on our platform.
                    </p>
                </div>

                {/* Card Directory Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {policies.map((policy, idx) => (
                        <div
                            key={idx}
                            className="p-5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/60 flex flex-col justify-between gap-5 group hover:border-[#04cccc]/50 dark:hover:border-[#04cccc]/50 transition-all duration-200 shadow-sm"
                        >
                            {/* Card Header & Content */}
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-neutral-900 border border-cyan-100 dark:border-neutral-800 shrink-0 mt-0.5">
                                    {policy.icon}
                                </div>
                                <div className="space-y-1.5">
                                    <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#04cccc] transition-colors">
                                        {policy.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-neutral-400">
                                        {policy.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Action Link */}
                            <div className="pt-2 flex justify-end border-t border-slate-100 dark:border-neutral-900">
                                <Link
                                    href={policy.href}
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-neutral-200 hover:text-[#04cccc] dark:hover:text-[#04cccc] transition-colors"
                                >
                                    View Agreement
                                    <ArrowRight className="w-3.5 h-3.5 text-[#04cccc] group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}