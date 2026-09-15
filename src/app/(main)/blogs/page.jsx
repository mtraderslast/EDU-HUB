'use client';

import { useState, useEffect } from 'react';
import { Search, ArrowRight, Loader2 } from 'lucide-react';
import BlogCard from './BlogCard';
import PaginationControls from './PaginationControls';
import { fetchAllBlog } from '@/lib/action/blog';

const CATEGORIES = [
    'All',
    'Development',
    'Technology',
    'Creativity & Design',
    'Professional Development',
    'Sales & Marketing',
    'Freelance Marketplace',
    'Business',
    'Personal Development',
    'Language Learning',
    'Teaching & Academic',
    'Workshop & Live',
];

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [activeSearch, setActiveSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 12;

    useEffect(() => {
        let isCurrent = true;

        const loadData = async () => {
            setLoading(true);
            try {
                const params = {
                    page: currentPage,
                    limit,
                };

                if (activeSearch.trim()) {
                    params.search = activeSearch.trim();
                }

                if (selectedCategory !== 'All') {
                    params.category = selectedCategory;
                }

                const response = await fetchAllBlog(params);

                if (isCurrent) {
                    if (response?.data?.success) {
                        setBlogs(response.data.data || []);
                        setTotalPages(response.data.meta?.totalPages || 1);
                    } else if (response?.success) {
                        setBlogs(response.data || []);
                        setTotalPages(response.meta?.totalPages || 1);
                    }
                }
            } catch (error) {
                if (isCurrent) {
                    setBlogs([]);
                    setTotalPages(1);
                }
            } finally {
                if (isCurrent) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => {
            isCurrent = false;
        };
    }, [currentPage, activeSearch, selectedCategory]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setActiveSearch(searchInput);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        setSearchInput('');
        setActiveSearch('');
        setSelectedCategory('All');
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen pt-24 dark:bg-black text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
            <div className="max-w-6xl mx-auto space-y-5">
                <div className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                        <span className="bg-gradient-to-r from-[#04cccc] to-[#15a3a3] bg-clip-text text-transparent">
                            EduHub
                        </span>{' '}
                        <span className="text-slate-900 dark:text-slate-100">
                            Knowledge Hub
                        </span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
                        Explore insights, tips, and expert knowledge across technology, design, and business.
                    </p>
                </div>

                <div className="space-y-4">
                    <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#04cccc] transition-colors"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2.5 rounded-lg bg-[#04cccc] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            Search
                        </button>
                    </form>

                    <div className="flex overflow-x-auto lg:flex-wrap gap-2 pb-2 lg:pb-0 scrollbar-none">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategorySelect(category)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                        ? 'bg-[#04cccc] text-white shadow-sm'
                                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#04cccc] dark:hover:border-[#04cccc]'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-[#04cccc]" />
                    </div>
                ) : blogs.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.map((blog) => (
                                <BlogCard key={blog._id || blog.id} blog={blog} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <PaginationControls
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        )}
                    </>
                ) : (
                    <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                        <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">
                            No articles found matching your criteria.
                        </p>
                        <button
                            onClick={handleResetFilters}
                            className="px-4 py-2 rounded-lg bg-[#04cccc] text-white text-xs font-medium hover:opacity-90 transition-opacity"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                <section className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-teal-500/5 to-transparent border border-cyan-500/20 text-center flex flex-col items-center justify-center">
                    <div className="max-w-xl space-y-4">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            Subscribe to our newsletter
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Get weekly updates with curated articles sent straight to your inbox.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-2 pt-2 w-full max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#04cccc] transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-5 py-2.5 rounded-lg bg-[#04cccc] text-white text-sm font-medium hover:opacity-90 flex items-center justify-center gap-2 transition-opacity whitespace-nowrap"
                            >
                                <span>Subscribe</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}