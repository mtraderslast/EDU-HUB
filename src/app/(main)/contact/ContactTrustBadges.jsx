"use client";

import { ShieldCheck, GraduationCap, Headphones, Award } from "lucide-react";

export default function ContactTrustBadges() {
    const badges = [
        {
            icon: <GraduationCap className="w-5 h-5 text-[#04cccc]" />,
            title: "Lifetime Course Access",
            desc: "Enroll once and get unlimited lifetime access to all learning materials & future updates."
        },
        {
            icon: <ShieldCheck className="w-5 h-5 text-[#04cccc]" />,
            title: "100% Risk-Free Guarantee",
            desc: "30-day money-back policy if you are not satisfied with your learning experience."
        },
        {
            icon: <Award className="w-5 h-5 text-[#04cccc]" />,
            title: "Expert Mentorship",
            desc: "Learn directly from top industry professionals with real-world practical insights."
        },
        {
            icon: <Headphones className="w-5 h-5 text-[#04cccc]" />,
            title: "Dedicated Student Support",
            desc: "Get instant assistance from our academic team whenever you face any issue."
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {badges.map((item, idx) => (
                    <div
                        key={idx}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex gap-3.5 items-start text-left shadow-sm hover:border-[#04cccc] dark:hover:border-[#04cccc] transition-colors"
                    >
                        <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-100 dark:border-cyan-900/30 shrink-0">
                            {item.icon}
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                                {item.title}
                            </h4>
                            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}