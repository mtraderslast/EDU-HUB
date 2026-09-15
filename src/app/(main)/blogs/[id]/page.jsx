'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Calendar, ArrowLeft, Loader2, Tag, User } from 'lucide-react';
import { fetchBlogDetails } from '@/lib/action/blog';

export default function BlogDetailsPage({ params }) {
    const resolvedParams = use(params);
    const id = resolvedParams?.id;

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadBlogDetails = async () => {
            if (!id) return;
            setLoading(true);
            setError(false);

            try {
                const response = await fetchBlogDetails(id);

                if (isMounted) {
                    const blogData = response?.data?.data || response?.data || response?.result;
                    if (blogData) {
                        setBlog(blogData);
                    } else {
                        setError(true);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError(true);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadBlogDetails();

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex justify-center items-center dark:bg-black">
                <Loader2 className="w-8 h-8 animate-spin text-[#04cccc]" />
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen pt-24 dark:bg-black text-slate-900 dark:text-slate-100 py-12 px-4 flex flex-col items-center justify-center">
                <div className="text-center space-y-4 max-w-md">
                    <h2 className="text-2xl font-bold">Blog not found</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        The article you are looking for does not exist or has been removed.
                    </p>
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#04cccc] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blogs
                    </Link>
                </div>
            </div>
        );
    }

    const formattedDate = blog.createdAt
        ? new Date(blog.createdAt?.$date || blog.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
        : '';

    return (
        <div className="min-h-screen pt-24 dark:bg-black text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
            <article className="max-w-4xl mx-auto space-y-8">
                <div>
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-[#04cccc] dark:hover:text-[#04cccc] transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to all articles
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
                        {blog.category && (
                            <span className="flex items-center gap-1 font-semibold text-[#04cccc] bg-cyan-50 dark:bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-800">
                                <Tag className="w-3 h-3" />
                                {blog.category}
                            </span>
                        )}
                        {blog.featured && (
                            <span className="px-3 py-1 font-semibold rounded-full bg-[#04cccc] text-white shadow-sm">
                                Featured
                            </span>
                        )}
                        {formattedDate && (
                            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                                <Calendar className="w-3.5 h-3.5" />
                                {formattedDate}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                        {blog.title}
                    </h1>

                    {(blog.authorName || blog.authorimage || blog.authorImage) && (
                        <div className="flex items-center gap-3 pt-6 border-b border-slate-200 dark:border-slate-800 pb-6 mt-6">
                            {(blog.authorimage || blog.authorImage) && (
                                <img
                                    src={blog.authorimage || blog.authorImage}
                                    alt={blog.authorName || 'Author'}
                                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                                />
                            )}
                            {blog.authorName && (
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Written by</p>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        {blog.authorName}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {blog.coverImage && (
                    <div className="relative w-full h-[250px] sm:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-line pt-4">
                    {blog.description}
                </div>
            </article>
        </div>
    );
}