'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { User, Mail, Edit2, Camera, Loader2, Save, Shield, X, Phone, AlertTriangle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Loading from '@/app/loading';
import BackButton from './BackButton';

function MyProfile() {
    const { data: session, isPending } = authClient.useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const user = session?.user;

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.name || "",
            image: user?.image || "",
            phone: user?.phone || "",
        }
    });

    if (isPending) {
        return <Loading />;
    }

    const handleUpdateProfile = async (data) => {
        setIsUpdating(true);

        const { error } = await authClient.updateUser({
            name: data.name,
            image: data.image,
            phone: data.phone,
        });

        setIsUpdating(false);

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: error.message || "Something went wrong while updating your profile.",
                customClass: {
                    popup: 'rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50'
                }
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Profile Updated!",
                text: "Your profile information has been successfully saved.",
                customClass: {
                    popup: 'rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50'
                }
            });
            setIsEditing(false);
        }
    };

    const handleEditProfile = () => {
        reset({
            name: user?.name || "",
            image: user?.image || "",
            phone: user?.phone || "",
        });
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        reset({
            name: user?.name || "",
            image: user?.image || "",
            phone: user?.phone || "",
        });
        setIsEditing(false);
    };

    return (
        <section className="w-full pt-25 bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Back Button */}
                <BackButton />

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                            My Profile
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">
                            {user?.role || "User"} Account
                        </p>
                    </div>

                    {!isEditing && (
                        <button
                            onClick={handleEditProfile}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm cursor-pointer"
                        >
                            <Edit2 size={16} /> Edit Profile
                        </button>
                    )}
                </div>

                {/* Profile Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">

                    {/* Banner Gradient */}
                    <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600"></div>

                    {/* Profile Content */}
                    <div className="px-6 pb-8 sm:px-8">

                        {/* Avatar & User Header Info */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-14 mb-8">
                            <div className="relative group">
                                <img
                                    src={user?.image || "/user.png"}
                                    alt={user?.name || "User Avatar"}
                                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-white dark:border-slate-900 object-cover shadow-md bg-slate-100 dark:bg-slate-800"
                                />
                                {isEditing && (
                                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] rounded-2xl flex items-center justify-center transition-opacity">
                                        <Camera size={24} className="text-white" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 pb-1">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {user?.name || "User Name"}
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2 mt-1">
                                    <Mail size={15} className="text-slate-400 dark:text-slate-500" /> {user?.email}
                                </p>
                            </div>
                        </div>

                        {/* Edit Form OR Read-Only Display */}
                        {isEditing ? (
                            <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-6 border-t border-slate-100 dark:border-slate-800 pt-6">

                                {/* Information Note */}
                                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl flex gap-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-amber-800 dark:text-amber-300">
                                        <p className="font-semibold">Keep details up to date</p>
                                        <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                                            Please make sure your phone number is accurate for account verification and communications.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-5">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                                            <input
                                                {...register("name", { required: "Full name is required" })}
                                                type="text"
                                                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.name ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                                                    }`}
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        {errors.name && (
                                            <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>
                                        )}
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                                            <input
                                                {...register("phone", { required: "Phone number is required" })}
                                                type="text"
                                                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.phone ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                                                    }`}
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p className="text-red-500 text-xs mt-1.5">{errors.phone.message}</p>
                                        )}
                                    </div>

                                    {/* Image URL */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                            Profile Image URL
                                        </label>
                                        <div className="relative">
                                            <Camera className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                                            <input
                                                {...register("image")}
                                                type="text"
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                                placeholder="https://example.com/avatar.jpg"
                                            />
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                                            {user?.role === 'recruiter'
                                                ? "Provide a direct image URL for your company logo or avatar."
                                                : "Provide a direct image URL for your profile photo."}
                                        </p>
                                    </div>
                                </div>

                                {/* Form Action Buttons */}
                                <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
                                    >
                                        {isUpdating ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Saving Changes...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium text-sm transition-colors cursor-pointer flex items-center gap-1.5"
                                    >
                                        <X className="w-4 h-4" /> Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            /* Read-Only Display Mode */
                            <div className="space-y-6 border-t border-slate-100 dark:border-slate-800 pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    {/* Name Display */}
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                                            Full Name
                                        </p>
                                        <div className="flex items-center gap-2.5">
                                            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                            <span className="font-semibold text-slate-900 dark:text-white text-sm">
                                                {user?.name || "Not provided"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Phone Display */}
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                                            Phone Number
                                        </p>
                                        <div className="flex items-center gap-2.5">
                                            <Phone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                            <span className="font-semibold text-slate-900 dark:text-white text-sm">
                                                {user?.phone || "Not added yet"}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* Security Notice Footer */}
                        <div className="mt-8 p-4 bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-xl flex gap-3">
                            <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-indigo-950 dark:text-indigo-300">
                                <p className="font-semibold mb-0.5">Data Privacy & Security</p>
                                <p className="text-xs text-indigo-700/80 dark:text-indigo-400/80">
                                    Your personal information is stored securely and never shared without your permission.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default MyProfile;