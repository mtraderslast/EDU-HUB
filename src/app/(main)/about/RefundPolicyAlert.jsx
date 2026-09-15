"use client";

import Link from "next/link";
import { RefreshCw, Building2, ShieldCheck, Mail, Globe, MapPin, ArrowRight } from "lucide-react";

export default function RefundPolicyAlert() {
    return (
        <section className="w-full py-12 bg-white dark:bg-black text-slate-900 dark:text-slate-100 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                {/* Main Refund & Academy Guarantee Container */}
                <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-[#04cccc]/40 transition-all">

                    <div className="flex items-start gap-4 max-w-4xl">
                        <div className="p-3 rounded-xl bg-cyan-50 dark:bg-neutral-900 border border-cyan-100 dark:border-neutral-800 text-[#04cccc] shrink-0">
                            <RefreshCw className="w-5 h-5" />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-[2px] bg-[#04cccc] rounded-full"></span>
                                <span className="text-xs font-bold uppercase tracking-wider text-[#04cccc]">
                                    Refund Policy & Guarantee
                                </span>
                            </div>

                            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                                Lifetime Course Access & Pre-Purchase Support Policy
                            </h3>

                            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                                All course enrollments grant immediate, full lifetime access to digital lessons and learning resources and are generally non-refundable. We encourage students to consult our support team before purchasing to ensure the program fits their goals.
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 pt-2 md:pt-0">
                        <Link
                            href="/refund-policy"
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white hover:text-[#04cccc] dark:hover:text-[#04cccc] border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 bg-slate-50 dark:bg-neutral-900 transition-all group-hover:border-[#04cccc]/50 shadow-sm"
                        >
                            Read Refund Terms
                            <ArrowRight className="w-4 h-4 text-[#04cccc] group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                </div>

                {/* Institutional & Legal Credentials Grid */}
                <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-950/40 space-y-6">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-[#04cccc]" />
                                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                                    Legal Business Credentials
                                </h4>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-neutral-400">
                                Verified institutional profiles and state regulatory transparency documents.
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold w-fit">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Filing Status: Active (2026 Compliant)
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-neutral-400 text-xs font-medium">
                                <Building2 className="w-3.5 h-3.5 text-[#04cccc]" />
                                Legal Name & Entity
                            </div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                M Traders Last LLC
                            </p>
                            <p className="text-xs text-slate-500 dark:text-neutral-400">
                                Florida Limited Liability Company
                            </p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-neutral-400 text-xs font-medium">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#04cccc]" />
                                Document Registration
                            </div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                Doc # L26000290590
                            </p>
                            <p className="text-xs text-slate-500 dark:text-neutral-400">
                                State of Florida, United States
                            </p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-neutral-400 text-xs font-medium">
                                <MapPin className="w-3.5 h-3.5 text-[#04cccc]" />
                                Registered Address
                            </div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                1317 85 DUNSTALL HILL
                            </p>
                            <p className="text-xs text-slate-500 dark:text-neutral-400">
                                WOLVERHAMPTON WV6 0SR
                            </p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-neutral-400 text-xs font-medium">
                                <Mail className="w-3.5 h-3.5 text-[#04cccc]" />
                                Corporate Email & Platform
                            </div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                hello@mtraderslastllc.com
                            </p>
                            <div className="flex items-center gap-1 text-xs text-[#04cccc]">
                                <Globe className="w-3 h-3" />
                                hello@mtradershklimited.com
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}