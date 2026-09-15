'use client';

import { useState, useEffect, Fragment } from 'react';
import { fetchMyEnrolledCourses } from '@/lib/action/enrollment';
import {
    PlayCircle,
    Calendar,
    ChevronDown,
    ChevronUp,
    CheckCircle2,
    CreditCard,
    Clock,
    Tag,
    BookOpen
} from 'lucide-react';

export default function EnrolledCoursesTable() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedRow, setExpandedRow] = useState(null);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            setIsLoading(true);
            const response = await fetchMyEnrolledCourses();

            const courseData = response?.data?.data || response?.data || [];

            setCourses(Array.isArray(courseData) ? courseData : []);
        } catch (error) {
            console.error("Error loading courses:", error);
            setCourses([]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleRow = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px] bg-white dark:bg-black transition-colors duration-300">
                <div className="w-8 h-8 border-4 border-[#04cccc]/20 border-t-[#04cccc] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-black min-h-screen transition-colors duration-300">
            <div className="mx-auto">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">My Enrolled Courses</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and track all your purchased courses in one place.</p>
                </div>

                {courses.length === 0 ? (
                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
                        <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No courses found</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">You haven't enrolled in any courses yet.</p>
                    </div>
                ) : (
                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-x-auto shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-100/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Course Details</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider hidden md:table-cell">Purchase Info</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {courses.map((item) => (
                                    <Fragment key={item._id}>
                                        {/* Main Row */}
                                        <tr className="hover:bg-white dark:hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-200 dark:bg-slate-800">
                                                        {item.courseDetails?.image && (
                                                            <img
                                                                src={item.courseDetails.image}
                                                                alt={item.courseDetails?.title || 'Course Image'}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3
                                                            className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 max-w-md group-hover:text-[#04cccc] transition-colors cursor-pointer"
                                                            onClick={() => toggleRow(item._id)}
                                                        >
                                                            {item.courseDetails?.title || 'Untitled Course'}
                                                        </h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            {item.courseDetails?.level && (
                                                                <span className="text-xs font-medium text-[#04cccc] bg-[#04cccc]/10 px-2 py-0.5 rounded">
                                                                    {item.courseDetails.level}
                                                                </span>
                                                            )}
                                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                                {item.courseDetails?.category || 'General'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5 hidden md:table-cell">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1.5 text-sm text-slate-900 dark:text-slate-200">
                                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                        {formatDate(item.createdAt)}
                                                    </div>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                                                        {item.orderId}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5">
                                                <div className="flex flex-col gap-1.5">
                                                    {item.paymentStatus === 'SUCCESS' && (
                                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                                            <CheckCircle2 className="w-3.5 h-3.5" /> Paid
                                                        </span>
                                                    )}
                                                    {item.isAccessGranted && (
                                                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#04cccc]">Access Granted</span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-end gap-3">
                                                    {/* Details Toggle Button */}
                                                    <button
                                                        onClick={() => toggleRow(item._id)}
                                                        className="p-2 text-slate-400 hover:text-[#04cccc] hover:bg-[#04cccc]/10 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        {expandedRow === item._id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                                    </button>

                                                    {/* Start Course Button */}
                                                    <button
                                                        className="py-2.5 px-5 rounded-lg bg-gradient-to-r from-[#04cccc] to-[#15a3a3] hover:opacity-90 text-white font-bold text-sm transition-all shadow-md shadow-[#04cccc]/20 flex items-center gap-2 whitespace-nowrap"
                                                        onClick={() => window.location.href = `/courses/${item.courseId}/learn`}
                                                    >
                                                        <PlayCircle className="w-4 h-4" />
                                                        Start Course
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Expandable Details Row */}
                                        {expandedRow === item._id && (
                                            <tr className="bg-white dark:bg-slate-900/50">
                                                <td colSpan="4" className="p-0">
                                                    <div className="px-6 py-6 border-t border-slate-100 dark:border-slate-800">
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                                                            {/* Column 1: Payment & Gateway Info */}
                                                            <div className="space-y-4">
                                                                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">Receipt Info</h4>
                                                                <div className="space-y-2">
                                                                    <div className="flex justify-between text-sm">
                                                                        <span className="text-slate-500 dark:text-slate-400">Gateway:</span>
                                                                        <span className="font-medium text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                                                                            <CreditCard className="w-3.5 h-3.5" /> {item.gateway}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex justify-between text-sm">
                                                                        <span className="text-slate-500 dark:text-slate-400">Price Paid:</span>
                                                                        <span className="font-bold text-[#04cccc]">
                                                                            ${item.courseDetails?.price || 0}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex flex-col gap-1 mt-2">
                                                                        <span className="text-xs text-slate-500 dark:text-slate-400">Proof/Transaction ID:</span>
                                                                        <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 p-1.5 rounded text-slate-700 dark:text-slate-300 break-all">
                                                                            {item.proofId}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Column 2: Course Meta */}
                                                            <div className="space-y-4">
                                                                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">Course Overview</h4>
                                                                <div className="space-y-3">
                                                                    {item.courseDetails?.duration && (
                                                                        <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                                            <Clock className="w-4 h-4 mt-0.5 shrink-0 text-[#04cccc]" />
                                                                            <span>{item.courseDetails.duration}</span>
                                                                        </div>
                                                                    )}

                                                                    {item.courseDetails?.tags?.length > 0 && (
                                                                        <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                                            <Tag className="w-4 h-4 mt-0.5 shrink-0 text-[#04cccc]" />
                                                                            <div className="flex flex-wrap gap-1.5">
                                                                                {item.courseDetails.tags.map((tag, idx) => (
                                                                                    <span key={idx} className="bg-slate-200 dark:bg-slate-800 text-xs px-2 py-0.5 rounded-full text-slate-700 dark:text-slate-300">
                                                                                        {tag}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Column 3: What You'll Learn */}
                                                            {item.courseDetails?.whatYouWillLearn?.length > 0 && (
                                                                <div className="space-y-4">
                                                                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">Key Learnings</h4>
                                                                    <ul className="space-y-2">
                                                                        {item.courseDetails.whatYouWillLearn.slice(0, 3).map((learn, idx) => (
                                                                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#04cccc] mt-0.5" />
                                                                                <span className="line-clamp-2">{learn}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}