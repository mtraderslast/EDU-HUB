'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { createBlog } from '@/lib/action/blog';

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

export default function CreateBlogPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        coverImage: '',
        featured: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await createBlog(formData);

            if (res) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Blog post created successfully',
                    icon: 'success',
                    confirmButtonColor: '#04cccc',
                    background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
                    color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a'
                });

                setFormData({
                    title: '',
                    description: '',
                    category: '',
                    coverImage: '',
                    featured: false
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error?.response?.data?.message || 'Failed to create blog post',
                icon: 'error',
                confirmButtonColor: '#04cccc',
                background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
                color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white text-slate-900 dark:bg-black dark:text-slate-100 transition-colors duration-300 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        Create New <span className="bg-gradient-to-r from-[#04cccc] to-[#15a3a3] bg-clip-text text-transparent">Blog Post</span>
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                        Share your knowledge and ideas with the community.
                    </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Title <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter blog title"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#04cccc] dark:focus:border-[#04cccc] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Category <span className="text-rose-500">*</span>
                            </label>
                            <select
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#04cccc] dark:focus:border-[#04cccc] transition-colors appearance-none cursor-pointer"
                            >
                                <option value="">Select a Category</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Cover Image URL <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="url"
                                name="coverImage"
                                required
                                value={formData.coverImage}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#04cccc] dark:focus:border-[#04cccc] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Description / Excerpt <span className="text-rose-500">*</span>
                            </label>
                            <textarea
                                rows={5}
                                name="description"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Write a concise overview of your blog..."
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#04cccc] dark:focus:border-[#04cccc] transition-colors resize-none"
                            />
                        </div>

                        <div className="flex items-center space-x-3 pt-2">
                            <input
                                type="checkbox"
                                id="featured"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 text-[#04cccc] focus:ring-[#04cccc] accent-[#04cccc] cursor-pointer"
                            />
                            <label htmlFor="featured" className="text-sm font-medium cursor-pointer select-none">
                                Mark this post as Featured
                            </label>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[#04cccc] to-[#15a3a3] hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:outline-none"
                            >
                                {loading ? 'Creating Post...' : 'Publish Blog'}
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}