"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, X } from "lucide-react";
import Link from "next/link";

const RAW_FAQS = [
    {
        q: "Are the development courses suitable for absolute beginners?",
        a: "Yes, absolutely! Most of our development courses start from ground zero. No prior coding experience or technical background is required.",
        category: "Development"
    },
    {
        q: "Do you offer hands-on project experience with video lessons?",
        a: "Every course includes real-world, industry-standard projects to help you build a professional portfolio as you learn.",
        category: "Development"
    },
    {
        q: "Can I get one-on-one mentorship during my development course?",
        a: "Yes, we offer optional paid mentorship sessions where you can get personalized guidance, code reviews, and career advice from experienced developers.",
        category: "Development"
    },
    {
        q: "What hardware setup do I need to get started?",
        a: "A standard laptop or desktop with at least 4GB or 8GB of RAM will comfortably handle all course assignments and projects.",
        category: "Technology"
    },
    {
        q: "How frequently is the course material updated?",
        a: "We update our curriculum regularly to align with current industry trends and technologies. All updates are free for existing students.",
        category: "Technology"
    },
    {
        q: "Is there technical support available if I face issues with software or tools?",
        a: "Absolutely! Our dedicated support team is available via email and community forums to help resolve any technical issues within 24 hours.",
        category: "Technology"
    },
    {
        q: "Which tools are covered in the design courses?",
        a: "Our design track covers industry-standard tools including Adobe Photoshop, Illustrator, Figma, Canva, and modern UI/UX workflows.",
        category: "Creativity & Design"
    },
    {
        q: "Do design courses include real client projects or case studies?",
        a: "Yes, our design curriculum features portfolio-ready projects and detailed case studies that demonstrate real-world design challenges and solutions.",
        category: "Creativity & Design"
    },
    {
        q: "Will I receive a certificate upon completing a course?",
        a: "Yes! Once you successfully complete all modules and project assignments, you will earn a verified digital certificate.",
        category: "Professional Development"
    },
    {
        q: "Are certificates recognized by employers and LinkedIn?",
        a: "Our certificates are shareable on LinkedIn and recognized by leading employers in the industry as proof of your competency and commitment.",
        category: "Professional Development"
    },
    {
        q: "Are social media ads and sales funnels covered in marketing?",
        a: "Yes, you will learn data-driven strategies covering Facebook Ads, Google Ads, SEO, content marketing, and high-converting funnel design.",
        category: "Sales & Marketing"
    },
    {
        q: "Do you provide templates and swipe files for marketing campaigns?",
        a: "Yes, our marketing courses include ready-to-use email templates, ad copy frameworks, and campaign management checklists to accelerate your results.",
        category: "Sales & Marketing"
    },
    {
        q: "Is there support for getting started on freelance platforms?",
        a: "We provide dedicated modules on Fiverr and Upwork profile optimization, proposal writing, client communication, and gig ranking.",
        category: "Freelance Marketplace"
    },
    {
        q: "How can I increase my freelance rates after completing the course?",
        a: "Our pricing strategy module teaches you how to position your services, build authority, and justify premium rates through portfolio and testimonial management.",
        category: "Freelance Marketplace"
    },
    {
        q: "Who are the business and entrepreneurship courses meant for?",
        a: "These courses are tailored for aspiring founders, small business owners, and freelancers looking to scale their operations efficiently.",
        category: "Business"
    },
    {
        q: "Will the course help me validate my business idea before launch?",
        a: "Yes, we include comprehensive frameworks for market research, customer validation, and MVP development to reduce your launch risk.",
        category: "Business"
    },
    {
        q: "How can these courses help boost productivity and soft skills?",
        a: "Our personal development track focuses on practical framework implementation for time management, public speaking, and leadership.",
        category: "Personal Development"
    },
    {
        q: "Are mindfulness and work-life balance topics covered?",
        a: "Yes, our personal development modules include stress management techniques, habit formation strategies, and sustainable productivity frameworks.",
        category: "Personal Development"
    },
    {
        q: "Are there interactive speaking sessions for language courses?",
        a: "Yes, our language courses feature structured practice prompts, interactive exercises, and guided fluency frameworks.",
        category: "Language Learning"
    },
    {
        q: "Can I practice with native speakers in the language courses?",
        a: "Our premium language courses include weekly conversation practice sessions with native speakers and peer learning communities for immersive experience.",
        category: "Language Learning"
    },
    {
        q: "What resources are available for educators and academic students?",
        a: "We offer specialized modules on modern teaching methodologies, course creation, and simplified academic subject breakdowns.",
        category: "Teaching & Academic"
    },
    {
        q: "Do you provide lesson plan templates and teaching materials?",
        a: "Yes, educators get access to customizable lesson plans, assessment tools, student engagement strategies, and classroom management frameworks.",
        category: "Teaching & Academic"
    },
    {
        q: "How do I access live workshops after enrolling?",
        a: "Upon enrollment, live Zoom/Meet links, schedules, and reminders will automatically appear on your student dashboard and inbox.",
        category: "Workshop & Live"
    },
    {
        q: "What if I miss a live session due to a schedule conflict?",
        a: "Don't worry! HD recordings of all live workshops are uploaded to your dashboard within 24 hours of the stream.",
        category: "Workshop & Live"
    },
    {
        q: "Can I ask questions during live workshops?",
        a: "Yes, all live workshops include dedicated Q&A segments where you can ask instructors directly via chat or audio, with priority given to complex questions.",
        category: "Workshop & Live"
    },
];

const FAQS = RAW_FAQS.map((item, idx) => ({ id: `faq-${idx}`, ...item }));

const CATEGORIES = [
    "All",
    "Development",
    "Technology",
    "Creativity & Design",
    "Professional Development",
    "Sales & Marketing",
    "Freelance Marketplace",
    "Business",
    "Personal Development",
    "Language Learning",
    "Teaching & Academic",
    "Workshop & Live",
];

function FaqRow({ item, isOpen, onToggle }) {
    return (
        <div className="border-b border-slate-200 dark:border-slate-800">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#04cccc]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black rounded-sm"
            >
                <span
                    className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-200 ${isOpen
                        ? "bg-gradient-to-r from-[#04cccc] to-[#07d1d1] bg-clip-text text-transparent"
                        : "text-slate-900 dark:text-slate-100 group-hover:text-slate-950 dark:group-hover:text-white"
                        }`}
                >
                    {item.q}
                </span>

                <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 group-hover:border-[#04cccc]/50 group-hover:text-[#07d1d1] dark:group-hover:text-cyan-400 transition-colors duration-200">
                    <motion.span
                        animate={{ rotate: isOpen ? 135 : 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center justify-center"
                    >
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </motion.span>
                </span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="max-w-3xl pb-6 pr-10 text-sm sm:text-[15px] font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                            {item.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function CourseFaqPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [query, setQuery] = useState("");
    const [openId, setOpenId] = useState(FAQS[0]?.id ?? null);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return FAQS.filter((item) => {
            const matchesCategory =
                activeCategory === "All" || item.category === activeCategory;
            const matchesQuery =
                q.length === 0 ||
                item.q.toLowerCase().includes(q) ||
                item.a.toLowerCase().includes(q);
            return matchesCategory && matchesQuery;
        });
    }, [activeCategory, query]);

    const grouped = useMemo(() => {
        const map = new Map();
        for (const item of filtered) {
            if (!map.has(item.category)) map.set(item.category, []);
            map.get(item.category).push(item);
        }
        return Array.from(map.entries());
    }, [filtered]);

    return (
        <section className="relative w-full bg-white dark:bg-black px-6 py-20 sm:py-28">
            <div className="mx-auto w-full max-w-6xl">
                {/* Header */}
                <div className="mb-14 sm:mb-16">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-[2px] bg-[#04cccc] rounded-full"></span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#07d1d1] dark:text-cyan-400">
                            Help & FAQ
                        </span>
                        <span className="w-6 h-[2px] bg-[#04cccc] rounded-full"></span>
                    </div>
                    <h1 className="font-black tracking-tight text-4xl sm:text-5xl text-slate-900 dark:text-slate-100 mt-2">
                        Frequently Asked{" "}
                        <span className="bg-gradient-to-r from-[#04cccc] to-[#07d1d1] bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h1>
                    <p className="mt-4 max-w-xl text-sm sm:text-base font-medium text-slate-600 dark:text-slate-400">
                        Find quick answers regarding our courses, enrollment process, platform access, and learning support.
                    </p>
                </div>

                {/* Search Input */}
                <div className="relative mb-8">
                    <Search
                        className="pointer-events-none absolute left-0 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400 dark:text-slate-600"
                        strokeWidth={2}
                    />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a question..."
                        className="w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-black py-3 pl-7 pr-8 text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none transition-colors duration-200 focus:border-[#04cccc]"
                    />
                    {query.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            aria-label="Clear search"
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        >
                            <X className="h-4 w-4" strokeWidth={2} />
                        </button>
                    )}
                </div>

                {/* Category Filter Pills */}
                <div className="mb-12 flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => {
                        const active = cat === activeCategory;
                        return (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setActiveCategory(cat)}
                                className={`rounded-full px-4 py-1.5 text-xs sm:text-[13px] font-bold tracking-tight transition-all duration-200 ${active
                                    ? "bg-gradient-to-r from-[#04cccc] to-[#07d1d1] text-white shadow-xs"
                                    : "text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-[#04cccc]/40 hover:text-[#07d1d1] dark:hover:text-cyan-400"
                                    }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                {/* Results List */}
                {grouped.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                            No questions found for "{query}"
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-600">
                            Try searching with a different keyword or clear your active category filter.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {grouped.map(([category, items]) => (
                            <div key={category}>
                                {activeCategory === "All" && (
                                    <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#07d1d1] dark:text-cyan-400">
                                        {category}
                                    </h2>
                                )}
                                <div>
                                    {items.map((item) => (
                                        <FaqRow
                                            key={item.id}
                                            item={item}
                                            isOpen={openId === item.id}
                                            onToggle={() =>
                                                setOpenId(openId === item.id ? null : item.id)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer CTA */}
                <div className="mt-20 flex flex-col items-start gap-2 border-t border-slate-200 dark:border-slate-800 pt-10 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                        Still have questions?
                    </p>
                    <Link
                        href="/contact"
                        className="text-sm font-bold bg-gradient-to-r from-[#04cccc] to-[#07d1d1] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                    >
                        Contact our support team →
                    </Link>
                </div>
            </div>
        </section>
    );
}