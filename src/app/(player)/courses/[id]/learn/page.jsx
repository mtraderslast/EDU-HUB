'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Lock, PlayCircle } from 'lucide-react';
import ProtectedRoute from '@/middleware/ProtectedRoute';
import { fetchEnrolledCourseContent } from '@/lib/action/course';
import { toYouTubeEmbedUrl } from '@/lib/youtube';

export default function CourseLearnPage() {
    return (
        <ProtectedRoute roles={['admin', 'user']} fallbackUrl="/login">
            <CoursePlayer />
        </ProtectedRoute>
    );
}

function CoursePlayer() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadCourse = async () => {
            if (!id) return;

            try {
                setLoading(true);
                setError(null);

                const response = await fetchEnrolledCourseContent(id);
                const courseData = response?.data || response;

                if (isMounted) {
                    setCourse(courseData || null);
                }
            } catch (err) {
                if (isMounted) {
                    setError({
                        status: err?.response?.status,
                        message: err?.response?.data?.message || 'Unable to load this course video.'
                    });
                    setCourse(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadCourse();

        return () => {
            isMounted = false;
        };
    }, [id]);

    useEffect(() => {
        if (!course?.title) return undefined;

        const previousTitle = document.title;
        document.title = `${course.title} | EduHub`;

        return () => {
            document.title = previousTitle;
        };
    }, [course?.title]);

    const embedUrl = toYouTubeEmbedUrl(course?.videoUrl);
    const isForbidden = error?.status === 403;

    return (
        <div className="flex h-dvh flex-col bg-slate-950 text-white">
            <header className="shrink-0 border-b border-white/10 bg-slate-950/95 backdrop-blur-md">
                <div className="flex items-center gap-4 px-4 py-3 sm:px-6">
                    <button
                        type="button"
                        onClick={() => router.push('/dashboard/user/courses')}
                        className="inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">My Courses</span>
                    </button>

                    <div className="hidden h-6 w-px bg-white/10 sm:block" />

                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#04cccc]">
                            Course Player
                        </p>
                        <h1 className="truncate text-base font-semibold tracking-tight text-white sm:text-xl">
                            {course?.title || 'Loading course...'}
                        </h1>
                    </div>

                    {(course?.category || course?.level) && (
                        <div className="hidden items-center gap-2 md:flex">
                            {course.level && (
                                <span className="rounded-full border border-[#04cccc]/30 bg-[#04cccc]/10 px-3 py-1 text-xs font-semibold text-[#04cccc]">
                                    {course.level}
                                </span>
                            )}
                            {course.category && (
                                <span className="text-xs font-medium text-slate-400">
                                    {course.category}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </header>

            <main className="relative min-h-0 flex-1 bg-black">
                {loading && (
                    <div className="flex h-full flex-col items-center justify-center gap-4">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#04cccc]" />
                        <p className="text-sm font-medium tracking-wide text-slate-400">
                            Preparing your lesson...
                        </p>
                    </div>
                )}

                {!loading && isForbidden && (
                    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
                            <Lock className="h-6 w-6 text-[#04cccc]" />
                        </div>
                        <h2 className="text-2xl font-semibold">Enrollment required</h2>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
                            {error.message || 'Please enroll in this course to watch the video.'}
                        </p>
                        <Link
                            href={`/courses/${id}`}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#04cccc] to-[#15a3a3] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#04cccc]/20"
                        >
                            <PlayCircle className="h-4 w-4" />
                            View Course
                        </Link>
                    </div>
                )}

                {!loading && !isForbidden && error && (
                    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                        <h2 className="text-2xl font-semibold">Unable to load video</h2>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
                            {error.message}
                        </p>
                        <Link
                            href="/dashboard/user/courses"
                            className="mt-6 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
                        >
                            Back to My Courses
                        </Link>
                    </div>
                )}

                {!loading && !error && !embedUrl && (
                    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                        <h2 className="text-2xl font-semibold">Video coming soon</h2>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
                            This course does not have a playable YouTube video yet. Please check back after the instructor adds the lesson link.
                        </p>
                    </div>
                )}

                {!loading && !error && embedUrl && (
                    <iframe
                        src={embedUrl}
                        title={course?.title || 'Course video'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="h-full w-full border-0"
                    />
                )}
            </main>
        </div>
    );
}
