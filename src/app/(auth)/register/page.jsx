"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, User, Image as ImageIcon, ArrowRight, GraduationCap } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";

function Register() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const getRedirectUrl = () => {
        const redirect =
            searchParams.get("redirect") ||
            searchParams.get("callbackUrl");

        return redirect || "/";
    };

    const handleRegister = async (userData) => {
        const { data, error } = await authClient.signUp.email({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            image: userData.imageUrl,
        });

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong during registration. Please try again.",
            });

            reset();
        } else {
            router.push(getRedirectUrl());
        }
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: `${window.location.origin}${getRedirectUrl()}`,
        });
    };

    return (
        <section className="min-h-screen bg-white dark:bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative">

            {/* Home Button */}
            <Link
                href="/"
                className="absolute top-2 left-6 flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-xs text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all text-sm font-medium"
            >
                <FaHome />
                <span>Go Home</span>
            </Link>

            {/* Card Container */}
            <div className="max-w-md w-full space-y-6 bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative z-10">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 text-[#04cccc] mb-1">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                        Create Your{" "}
                        <span className="bg-gradient-to-r from-[#04cccc] to-[#15a3a3] bg-clip-text text-transparent">
                            Account
                        </span>
                    </h2>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Join EduHub and start exploring interactive learning today.
                    </p>
                </div>

                {/* Registration Form */}
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="mt-4 space-y-4"
                >
                    {/* Full Name */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                            Full Name
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-slate-600">
                                <User size={18} />
                            </span>
                            <input
                                type="text"
                                placeholder="John Doe"
                                {...register("name", {
                                    required: "Name is required"
                                })}
                                className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-black border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-slate-800 dark:text-slate-100
                                ${errors.name ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-800 focus:border-[#04cccc] focus:ring-[#04cccc]/20"}`}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-xs text-red-500 font-medium pl-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-slate-600">
                                <Mail size={18} />
                            </span>
                            <input
                                type="email"
                                placeholder="student@example.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
                                })}
                                className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-black border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-slate-800 dark:text-slate-100
                                ${errors.email
                                        ? "border-red-500 focus:ring-red-500/20"
                                        : "border-slate-200 dark:border-slate-800 focus:border-[#04cccc] focus:ring-[#04cccc]/20"
                                    }`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-500 pl-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-slate-600">
                                <Lock size={18} />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters required" },
                                    validate: {
                                        hasUpper: (value) =>
                                            /[A-Z]/.test(value) ||
                                            "Must contain at least one uppercase letter",
                                        hasLower: (value) =>
                                            /[a-z]/.test(value) ||
                                            "Must contain at least one lowercase letter"
                                    }
                                })}
                                className={`w-full pl-11 pr-12 py-3 bg-white dark:bg-black border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-slate-800 dark:text-slate-100
                                ${errors.password ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-800 focus:border-[#04cccc] focus:ring-[#04cccc]/20"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 dark:text-slate-600 hover:text-[#04cccc]"
                            >
                                {showPassword ? (<EyeOff size={18} />) : (<Eye size={18} />)}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-xs text-red-500 pl-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Avatar URL */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                            Avatar Image URL
                            <span className="text-[10px] ml-1 font-normal normal-case tracking-normal">
                                (Optional)
                            </span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-slate-600">
                                <ImageIcon size={18} />
                            </span>
                            <input
                                type="url"
                                placeholder="https://example.com/avatar.png"
                                {...register("imageUrl")}
                                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-[#04cccc] focus:ring-2 focus:ring-[#04cccc]/20 transition-all text-slate-800 dark:text-slate-100"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-[#04cccc] to-[#15a3a3] hover:opacity-95 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-teal-500/20 group text-sm cursor-pointer"
                    >
                        Register Student Account
                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </form>

                {/* Divider */}
                <div className="relative flex py-1 items-center">
                    <div className="grow border-t border-slate-200 dark:border-slate-800" />
                    <span className="shrink mx-4 text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wider font-bold">
                        Or connect with
                    </span>
                    <div className="grow border-t border-slate-200 dark:border-slate-800" />
                </div>

                {/* Google Sign In */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white dark:bg-black border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-100 font-medium py-3 rounded-xl transition-all text-sm cursor-pointer shadow-xs"
                >
                    <FcGoogle size={20} /> Continue with Google
                </button>

                {/* Login Redirect */}
                <div className="text-center pt-1">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-bold text-[#04cccc] hover:underline"
                        >
                            Log In
                        </Link>
                    </p>
                </div>

            </div>
        </section>
    );
}

export default Register;