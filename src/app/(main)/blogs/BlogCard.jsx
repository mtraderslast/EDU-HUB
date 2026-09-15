'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';

export default function BlogCard({ blog }) {

    return (
        <Link href={`/blogs/${blog._id || blog.id}`}>
            <article className="group flex flex-col h-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:border-[#04cccc] hover:shadow-md transition-all duration-200">
                <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800">
                    {blog.coverImage && (
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    )}
                    {blog.featured && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-[#04cccc] text-white shadow-sm">
                            Featured
                        </span>
                    )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-3 text-xs text-slate-500 dark:text-slate-400">
                        {blog.category && (
                            <span className="font-semibold text-[#04cccc] bg-cyan-50 dark:bg-cyan-950/50 px-2.5 py-0.5 rounded-full">
                                {blog.category}
                            </span>
                        )}
                    </div>

                    {blog.title && (
                        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-[#04cccc] transition-colors">
                            {blog.title}
                        </h3>
                    )}

                    {blog.description && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 flex-1">
                            {blog.description}
                        </p>
                    )}

                    {(blog.authorName || blog.authorimage || blog.authorImage) && (
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                            <div className="flex items-center gap-2">
                                {(blog.authorimage || blog.authorImage) && (
                                    <img
                                        src={blog.authorimage || blog.authorImage}
                                        alt={blog.authorName || 'Author'}
                                        className="w-7 h-7 rounded-full object-cover"
                                    />
                                )}
                                {blog.authorName && (
                                    <span className="font-medium text-slate-700 dark:text-slate-300">
                                        {blog.authorName}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </Link>
    );
}