"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Eye, Edit, Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { fetchAllCourse, deleteCourse } from "@/lib/action/course";

export default function ManageCourse() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCourses, setTotalCourses] = useState(0);

    const loadCourses = async (page, search) => {
        setLoading(true);
        try {
            const response = await fetchAllCourse({
                page: page,
                limit: 10,
                search: search,
            });

            if (response) {
                setCourses(response.data || []);
                setTotalPages(response.meta?.totalPages || 1);
                setTotalCourses(response.meta?.total || 0);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            loadCourses(currentPage, searchQuery);
        }

        return () => {
            isMounted = false;
        };
    }, [currentPage, searchQuery]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const inputVal = form.search.value;

        setCurrentPage(1);
        setSearchQuery(inputVal);
    };

    const handleDelete = (courseId, courseTitle) => {
        const isDark = document.documentElement.classList.contains("dark");

        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete "${courseTitle}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            background: isDark ? "#0f172a" : "#ffffff",
            color: isDark ? "#f8fafc" : "#0f172a",
            customClass: {
                popup: "border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl",
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteCourse(courseId);

                    Swal.fire({
                        title: "Deleted!",
                        text: "The course has been deleted.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                        background: isDark ? "#0f172a" : "#ffffff",
                        color: isDark ? "#f8fafc" : "#0f172a",
                    });

                    loadCourses(currentPage, searchQuery);
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: error.message || "Failed to delete course.",
                        icon: "error",
                        background: isDark ? "#0f172a" : "#ffffff",
                        color: isDark ? "#f8fafc" : "#0f172a",
                    });
                }
            }
        });
    };

    return (
        <div className="min-h-screen dark:bg-black text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <div className="mx-auto space-y-6">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-md">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                            Manage Courses
                        </h1>
                    </div>

                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-80">
                            <input
                                name="search"
                                type="text"
                                placeholder="Search course title..."
                                className="w-full pl-4 pr-10 py-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2.5 bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-medium text-sm rounded-xl transition-all duration-200 flex items-center gap-2 shadow-md shadow-teal-500/20 shrink-0"
                        >
                            <Search size={16} />
                            <span>Search</span>
                        </button>
                    </form>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden backdrop-blur-md">

                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/40 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                                    <th className="py-4 px-6">Course</th>
                                    <th className="py-4 px-4">Category</th>
                                    <th className="py-4 px-4">Level</th>
                                    <th className="py-4 px-4">Price</th>
                                    <th className="py-4 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-sm">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-slate-500 dark:text-slate-400">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Loader2 className="animate-spin text-teal-500" size={32} />
                                                <span>Loading courses...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : courses.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-slate-500 dark:text-slate-400">
                                            No courses found.
                                        </td>
                                    </tr>
                                ) : (
                                    courses.map((course) => (
                                        <tr
                                            key={course._id}
                                            className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={course.image || "/placeholder.png"}
                                                        alt={course.title}
                                                        className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                                                    />
                                                    <div className="max-w-xs sm:max-w-sm">
                                                        <p className="font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">
                                                            {course.title}
                                                        </p>
                                                        <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">
                                                            {course.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4 px-4 font-medium text-slate-600 dark:text-slate-300">
                                                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs border border-slate-200 dark:border-slate-700">
                                                    {course.category}
                                                </span>
                                            </td>

                                            <td className="py-4 px-4">
                                                <span className="capitalize text-xs font-medium px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-900/50">
                                                    {course.level}
                                                </span>
                                            </td>

                                            <td className="py-4 px-4 font-bold text-slate-800 dark:text-slate-200">
                                                ${course.price}
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={`/courses/${course._id}`}
                                                        title="View Course"
                                                        className="p-2 text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-800 rounded-lg transition-all"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>

                                                    <Link
                                                        href={`/dashboard/admin/edit-course/${course._id}`}
                                                        title="Edit Course"
                                                        className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-all"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(course._id, course.title)}
                                                        title="Delete Course"
                                                        className="p-2 text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                Page <span className="font-semibold text-slate-800 dark:text-slate-200">{currentPage}</span> of{" "}
                                <span className="font-semibold text-slate-800 dark:text-slate-200">{totalPages}</span>
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1 || loading}
                                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages || loading}
                                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}