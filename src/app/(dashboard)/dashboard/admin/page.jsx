"use client";

import { fetchAdminEnrollments, deleteEnrollment } from '@/lib/action/enrollment';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const AdminEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [activeSearch, setActiveSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('ALL');

    const filterOptions = ['ALL', 'PENDING', 'SUCCESS', 'FAILED'];

    const loadEnrollments = async () => {
        setLoading(true);
        try {
            const response = await fetchAdminEnrollments(page, activeSearch, activeFilter);
            if (response?.success) {
                setEnrollments(response.data);
                setTotalPages(response.totalPages || 1);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEnrollments();
    }, [page, activeSearch, activeFilter]);

    const handleSearch = () => {
        setPage(1);
        setActiveSearch(searchInput);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleFilterChange = (status) => {
        setActiveFilter(status);
        setPage(1);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleDelete = async (enrollmentId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await deleteEnrollment(enrollmentId);

                if (response?.success) {
                    Swal.fire(
                        'Deleted!',
                        'The enrollment has been deleted.',
                        'success'
                    );
                    loadEnrollments();
                } else {
                    Swal.fire(
                        'Error!',
                        response?.message || 'Failed to delete the enrollment.',
                        'error'
                    );
                }
            } catch (error) {
                console.error("Error deleting enrollment:", error);
                Swal.fire(
                    'Error!',
                    'Something went wrong while deleting.',
                    'error'
                );
            }
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
                    Course Enrollments
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Manage all student enrollments and payments
                </p>
            </div>

            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-6">
                <div className="flex w-full xl:w-auto items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search by Proof ID..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full md:w-96 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#04cccc] dark:focus:border-[#04cccc] transition-colors"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-6 py-2 bg-gradient-to-r from-[#04cccc] to-[#15a3a3] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        Search
                    </button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 xl:pb-0 w-full xl:w-auto scrollbar-hide">
                    {filterOptions.map((status) => (
                        <button
                            key={status}
                            onClick={() => handleFilterChange(status)}
                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeFilter === status
                                ? 'bg-gradient-to-r from-[#04cccc] to-[#15a3a3] text-white border-transparent shadow-sm'
                                : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-[#04cccc] dark:hover:border-[#04cccc]'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-white dark:bg-black border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Course Details</th>
                                <th className="px-6 py-4 font-semibold">User Info</th>
                                <th className="px-6 py-4 font-semibold">Payment Info</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        Loading enrollments...
                                    </td>
                                </tr>
                            ) : enrollments.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        No enrollments found.
                                    </td>
                                </tr>
                            ) : (
                                enrollments.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="hover:bg-white dark:hover:bg-slate-800/50 transition-colors text-slate-900 dark:text-slate-100"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.courseDetails?.image || "/placeholder.jpg"}
                                                    alt="Course"
                                                    className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-800"
                                                />
                                                <div>
                                                    <p className="font-medium max-w-[200px] truncate" title={item.courseDetails?.title}>
                                                        {item.courseDetails?.title}
                                                    </p>
                                                    <span className="text-xs text-[#04cccc] font-medium bg-[#04cccc]/10 px-2 py-1 rounded-full mt-1 inline-block">
                                                        {item.courseDetails?.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="font-medium">{item.userName}</p>
                                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{item.userEmail}</p>
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="font-medium">৳ {item.amount || 0}</p>
                                            <div className="flex flex-col text-xs mt-0.5 text-slate-500 dark:text-slate-400">
                                                <span>Gateway: {item.gateway}</span>
                                                {item.proofId && <span>Proof: <span className="text-[#04cccc]">{item.proofId}</span></span>}
                                                <span>Order: {item.orderId}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-2">
                                                <span className={`inline-flex w-fit px-2.5 py-1 rounded-full text-xs font-medium ${item.paymentStatus === 'SUCCESS' || item.paymentStatus === 'COMPLETED'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : item.paymentStatus === 'FAILED'
                                                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                    }`}>
                                                    {item.paymentStatus}
                                                </span>

                                                <span className={`inline-flex w-fit px-2.5 py-1 rounded-full text-xs font-medium ${item.isAccessGranted
                                                    ? 'bg-[#04cccc]/10 text-[#04cccc]'
                                                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                                    }`}>
                                                    {item.isAccessGranted ? 'Access Granted' : 'No Access'}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                            {formatDate(item.createdAt)}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 rounded-lg transition-colors border border-red-100 dark:border-red-900/30"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-black">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                            Page {page} of {totalPages}
                        </span>
                        <div className="flex gap-2">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-[#04cccc] to-[#15a3a3] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminEnrollments;