'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchAllBlog } from '@/lib/action/blog';
import BlogCard from '@/app/(main)/blogs/BlogCard';

export default function HomeBlogsSection() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadHomeBlogs = async () => {
            setLoading(true);
            try {
                const response = await fetchAllBlog({ limit: 6, page: 1 });

                if (isMounted) {
                    if (response?.data?.success) {
                        setBlogs(response.data.data || []);
                    } else if (response?.success) {
                        setBlogs(response.data || []);
                    }
                }
            } catch (error) {
                if (isMounted) {
                    setBlogs([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadHomeBlogs();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="py-10 dark:bg-slate-950/50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-3 max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                            Latest From Our <span className="text-[#04cccc]">Blog</span>
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                            Explore insights, tutorials, and expert tips across tech, development, and modern workflows.
                        </p>
                    </div>

                    <div className="shrink-0">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center justify-center gap-2 text-slate-800 dark:text-slate-200 hover:text-[#04cccc] dark:hover:text-[#04cccc] font-bold text-sm transition-colors duration-300 group"
                        >
                            <span>View All Articles</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, idx) => (
                            <div
                                key={idx}
                                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 h-[400px] animate-pulse shadow-sm"
                            />
                        ))}
                    </div>
                ) : blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.slice(0, 6).map((blog) => (
                            <BlogCard key={blog._id || blog.id} blog={blog} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                            No blog articles available right now.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}