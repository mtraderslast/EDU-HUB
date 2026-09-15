"use client";

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchAllCourse } from '@/lib/action/course';
import CourseCard from '@/component/CourseCard';

const CATEGORIES = [
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
    'Workshop & Live'
];

function CoursesContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const categoryFromUrl = searchParams.get('category') || '';

    // States
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState({ page: 1, limit: 12, total: 0, totalPages: 1 });

    const [searchInput, setSearchInput] = useState('');
    const [appliedSearch, setAppliedSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [priceOrder, setPriceOrder] = useState('asc');
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
        }
    }, [categoryFromUrl]);

    // Fetch Courses Handler
    const loadCourses = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: 12,
                sortBy: 'price',
                sortOrder: priceOrder
            };

            if (appliedSearch) params.search = appliedSearch;
            if (selectedCategory) params.category = selectedCategory;
            if (minPrice !== '') params.minPrice = minPrice;
            if (maxPrice !== '') params.maxPrice = maxPrice;

            const res = await fetchAllCourse(params);
            const responseData = res?.data?.data ? res.data : res;

            if (responseData?.success) {
                setCourses(responseData.data || []);
                if (responseData.meta) {
                    setMeta(responseData.meta);
                }
            }
        } catch (error) {
            console.error('Failed to load courses:', error);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    }, [page, appliedSearch, selectedCategory, minPrice, maxPrice, priceOrder]);

    useEffect(() => {
        loadCourses();
    }, [loadCourses]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        setAppliedSearch(searchInput.trim());
    };

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setPage(1);
        if (cat) {
            router.push(`/courses?category=${encodeURIComponent(cat)}`, { scroll: false });
        } else {
            router.push('/courses', { scroll: false });
        }
    };

    const handleResetFilters = () => {
        setSearchInput('');
        setAppliedSearch('');
        setSelectedCategory('');
        setMinPrice('');
        setMaxPrice('');
        setPriceOrder('asc');
        setPage(1);
        router.push('/courses', { scroll: false });
    };

    return (
        <div className="min-h-screen mt-15 bg-slate-50 dark:bg-black py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Two-color Main Heading */}
                <div className="mb-10 text-left">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-5xl tracking-tight">
                        Explore Our <span className="text-[#04cccc]">Premium Courses</span>
                    </h1>
                    <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl">
                        Discover top-rated courses to upgrade your technical and professional skills.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

                    {/* LEFT COLUMN: Course Grid & Pagination */}
                    <div className="lg:col-span-3 space-y-8">

                        {/* Loading Skeleton */}
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, idx) => (
                                    <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm animate-pulse h-[380px]" />
                                ))}
                            </div>
                        ) : courses.length > 0 ? (
                            /* Courses List */
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.map((course) => (
                                    <CourseCard key={course._id} course={course} />
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
                                <svg className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                                    No Courses Found
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                                    Try adjusting your search criteria or resetting filters.
                                </p>
                                <button
                                    onClick={handleResetFilters}
                                    className="px-5 py-2.5 bg-[#04cccc] text-white font-semibold text-sm rounded-xl hover:bg-[#15a3a3] transition-colors"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {meta.totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-6">
                                <button
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>

                                <div className="flex gap-1 px-2">
                                    {[...Array(meta.totalPages)].map((_, index) => {
                                        const pageNum = index + 1;
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setPage(pageNum)}
                                                className={`w-9 h-9 rounded-xl text-sm font-bold transition-colors ${page === pageNum
                                                        ? 'bg-[#04cccc] text-white'
                                                        : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => setPage((prev) => Math.min(prev + 1, meta.totalPages))}
                                    disabled={page === meta.totalPages}
                                    className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Fixed Filters & Sorting Sidebar */}
                    <div className="lg:col-span-1 lg:sticky lg:top-6 space-y-6 bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">

                        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                                Filters & Sorting
                            </h2>
                            <button
                                onClick={handleResetFilters}
                                className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                            >
                                Reset All
                            </button>
                        </div>

                        {/* Search Input */}
                        <form onSubmit={handleSearchSubmit} className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Search Course
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder="Type keyword..."
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#04cccc]"
                                />
                                <button
                                    type="submit"
                                    className="px-3.5 py-2.5 bg-[#04cccc] text-white rounded-xl hover:bg-[#15a3a3] transition-colors"
                                    title="Search"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        {/* Sort By Price Only */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Sort By Price
                            </label>
                            <select
                                value={priceOrder}
                                onChange={(e) => {
                                    setPriceOrder(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#04cccc]"
                            >
                                <option value="asc">Price: Low to High</option>
                                <option value="desc">Price: High to Low</option>
                            </select>
                        </div>

                        {/* Category Filter */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#04cccc]"
                            >
                                <option value="">All Categories</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range Filter */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Price Range ($)
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => {
                                        setMinPrice(e.target.value);
                                        setPage(1);
                                    }}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#04cccc]"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => {
                                        setMaxPrice(e.target.value);
                                        setPage(1);
                                    }}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#04cccc]"
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default function CoursesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#04cccc] border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <CoursesContent />
        </Suspense>
    );
}