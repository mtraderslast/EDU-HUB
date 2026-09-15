import Link from 'next/link';
import { CheckCircle2, Clock, Award, BarChart, Tag, ShieldCheck, ChevronRight, Star, Sparkles, UserCheck, ListChecks } from 'lucide-react';
import EnrollButton from './EnrollButton';
import { fetchCourseDetails } from '@/lib/action/course';
import BackButton from './BackButton';

export default async function CourseDetailsPage({ params }) {
    const { id } = await params;

    let course = null;
    try {
        const res = await fetchCourseDetails(id);
        if (res?.data?.success) {
            course = res.data.data;
        } else if (res?.data) {
            course = res.data;
        } else {
            course = res;
        }
    } catch (error) {
        console.error("Failed to fetch course details:", error);
    }

    if (!course) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Course Not Found
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                    The requested course is currently unavailable or has been removed.
                </p>
                <Link
                    href="/courses"
                    className="px-6 py-3 bg-[#04cccc] hover:bg-[#03b3b3] text-white font-bold rounded-xl transition-all"
                >
                    Browse All Courses
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-10 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {/* Header Banner Zone */}
            <div className="bg-slate-400 text-white border-b border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#04cccc]/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900 py-10 sm:py-14 transition-colors duration-300">
                    {/* Soft Glow Effect behind header */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#04cccc]/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <BackButton />
                        {/* Breadcrumbs */}
                        <div className="flex items-center mt-5 gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">
                            <Link
                                href="/courses"
                                className="text-[#04cccc] hover:underline transition-colors"
                            >
                                Courses
                            </Link>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                            <span className="text-slate-700 dark:text-slate-300">{course.category}</span>
                        </div>

                        <div className="max-w-3xl space-y-4">
                            {/* Category Tag Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#04cccc]/10 text-[#04cccc] text-xs font-bold tracking-wider uppercase border border-[#04cccc]/20 shadow-sm">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>{course.category}</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-slate-100">
                                {course.title}
                            </h1>

                            {/* Metadata Tags Strip */}
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-sm text-slate-600 dark:text-slate-300">
                                {/* Rating Badge */}
                                <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-200 dark:border-amber-500/20">
                                    <Star className="w-4 h-4 fill-amber-500 dark:fill-amber-400" />
                                    <span>{course.ratingsAverage || 5}.0 Rating</span>
                                </div>

                                {/* Level Tag */}
                                <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <BarChart className="w-4 h-4 text-[#04cccc]" />
                                    <span>Level: <strong className="text-slate-900 dark:text-slate-100">{course.level}</strong></span>
                                </div>

                                {/* Duration Tag */}
                                <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <Clock className="w-4 h-4 text-[#04cccc]" />
                                    <span>{course.duration}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Details Column */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Course Overview */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight pb-2 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                                Course Overview
                            </h2>
                            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed text-justify">
                                {course.description}
                            </p>
                        </section>

                        {/* What You Will Learn */}
                        {course.whatYouWillLearn?.length > 0 && (
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold tracking-tight pb-2 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                                    What You Will Learn
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.whatYouWillLearn.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#04cccc] shrink-0 mt-0.5" />
                                            <span className="text-slate-700 dark:text-slate-300 text-sm leading-snug">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Target Audience */}
                        {course.targetAudience?.length > 0 && (
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold tracking-tight pb-2 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <UserCheck className="w-6 h-6 text-[#04cccc]" />
                                    <span>Who This Course Is For</span>
                                </h2>
                                <ul className="space-y-3">
                                    {course.targetAudience.map((audience, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                            <span className="w-2 h-2 rounded-full bg-[#04cccc] mt-2 shrink-0" />
                                            <span>{audience}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Requirements */}
                        {course.requirements?.length > 0 && (
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold tracking-tight pb-2 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <ListChecks className="w-6 h-6 text-[#04cccc]" />
                                    <span>Requirements</span>
                                </h2>
                                <ul className="space-y-3">
                                    {course.requirements.map((req, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Tech Stack & Tags */}
                        {course.tags?.length > 0 && (
                            <section className="space-y-4 pt-4">
                                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-[#04cccc]" />
                                    <span>Technologies & Topics Covered</span>
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {course.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 text-xs font-semibold rounded-md bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Sticky Enrollment Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-8">
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 space-y-6 shadow-sm">

                            {/* Course Image Preview */}
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 border border-slate-200 dark:border-slate-800">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Price Display */}
                            <div className="space-y-1">
                                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Total Investment</span>
                                <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
                                    ${course.price} <span className="text-sm font-normal text-slate-500">USD</span>
                                </div>
                            </div>

                            {/* Client Interactive Button */}
                            <EnrollButton courseData={course} />

                            {/* Key Highlights */}
                            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                    This Course Includes:
                                </h3>
                                <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                                    <li className="flex items-center gap-2.5">
                                        <Clock className="w-4 h-4 text-[#04cccc]" />
                                        <span>{course.duration}</span>
                                    </li>
                                    <li className="flex items-center gap-2.5">
                                        <BarChart className="w-4 h-4 text-[#04cccc]" />
                                        <span>Level: {course.level}</span>
                                    </li>
                                    {course.certificateProvided && (
                                        <li className="flex items-center gap-2.5">
                                            <Award className="w-4 h-4 text-[#04cccc]" />
                                            <span>Official Verified Certificate</span>
                                        </li>
                                    )}
                                    <li className="flex items-center gap-2.5">
                                        <ShieldCheck className="w-4 h-4 text-[#04cccc]" />
                                        <span>Full Lifetime Access</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}