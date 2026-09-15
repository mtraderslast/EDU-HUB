"use client";

import { useForm } from "react-hook-form";
import {
    Phone,
    Mail,
    Clock,
    Building2,
    Globe,
    MessageSquareCode,
    Send,
} from "lucide-react";
import Swal from "sweetalert2";
import { sendContactEmail } from "@/lib/action/contact";

function ContactSection() {
    const whatsappUrl = "https://wa.me/13163617579";
    const telegramUrl = "https://t.me/Mtradersla_bot";

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            issueCategory: "",
            message: "",
        },
    });

    const onSubmit = async (data) => {
        Swal.fire({
            title: "Sending Email...",
            text: "Please wait a moment while we send your email.",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const payload = {
                name: data.name.trim(),
                email: data.email.trim(),
                issue: data.issueCategory,
                issueCategory: data.issueCategory,
                courseName: data.issueCategory,
                message: data.message.trim(),
            };

            const res = await sendContactEmail(payload);

            // Axios or Direct Handler Check
            const isSuccess = res?.success || res?.data?.success || res?.status === 200;

            if (isSuccess) {
                Swal.fire({
                    icon: "success",
                    title: "Message Sent!",
                    text: "Thank you for contacting us. We will get back to you soon!",
                    confirmButtonColor: "#04cccc",
                });
                reset();
            } else {
                throw new Error(res?.message || res?.data?.message || "Failed to send email");
            }
        } catch (error) {
            console.error("Error submitting form:", error);

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:
                    error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong! Please try again later.",
                confirmButtonColor: "#ef4444",
            });
        }
    };

    return (
        <section className="w-full py-10 dark:bg-black text-slate-900 dark:text-slate-100 transition-colors">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                {/* Section Header */}
                <div className="flex flex-col items-center justify-center space-y-3 text-center">
                    <div className="flex items-center space-x-2">
                        <span className="h-[2px] w-6 bg-[#04cccc]"></span>
                        <span className="text-xs font-semibold tracking-wider text-[#04cccc] uppercase">
                            Get in Touch
                        </span>
                        <span className="h-[2px] w-6 bg-[#04cccc]"></span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                        <span className="bg-gradient-to-r from-[#04cccc] to-[#15a3a3] bg-clip-text text-transparent">
                            Let's Talk
                        </span>{" "}
                        <span className="text-slate-900 dark:text-slate-100">
                            About Your Query
                        </span>
                    </h2>

                    <p className="max-w-2xl text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                        Have questions about our courses or platform? Reach out to us and we'll respond as soon as possible.
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column - Contact Info */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                Contact Information
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Fill out the form and our support team will get back to you within 24 hours.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                            {/* WhatsApp */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3.5 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#04cccc] dark:hover:border-[#04cccc] transition-colors group shadow-sm"
                            >
                                <div className="p-2.5 rounded-md bg-cyan-50 dark:bg-cyan-950/50 text-[#04cccc]">
                                    <MessageSquareCode className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">WhatsApp Us</p>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">+1 (316) 361-7579</p>
                                </div>
                            </a>

                            {/* Phone */}
                            <a
                                href="tel:+44 7882740776"
                                className="flex items-center space-x-3.5 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#04cccc] dark:hover:border-[#04cccc] transition-colors group shadow-sm"
                            >
                                <div className="p-2.5 rounded-md bg-cyan-50 dark:bg-cyan-950/50 text-[#04cccc]">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Call Us Direct</p>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">+44 7882740776</p>
                                </div>
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:hello@mtradershklimited.com"
                                className="flex items-center space-x-3.5 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#04cccc] dark:hover:border-[#04cccc] transition-colors group shadow-sm"
                            >
                                <div className="p-2.5 rounded-md bg-cyan-50 dark:bg-cyan-950/50 text-[#04cccc]">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Email Us</p>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">hello@mtradershklimited.com</p>
                                </div>
                            </a>

                            {/* Telegram */}
                            <a
                                href={telegramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3.5 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#04cccc] dark:hover:border-[#04cccc] transition-colors group shadow-sm"
                            >
                                <div className="p-2.5 rounded-md bg-cyan-50 dark:bg-cyan-950/50 text-[#04cccc]">
                                    <Send className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Telegram Bot</p>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">@Mtradersla_bot</p>
                                </div>
                            </a>
                        </div>

                        {/* Additional Info Box */}
                        <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                            <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                                <Building2 className="w-4 h-4 text-[#04cccc]" />
                                <span className="text-xs sm:text-sm">1317 85 DUNSTALL HILL || 
                                    WOLVERHAMPTON WV6 0SR
                                </span>
                            </div>
                            <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                                <Clock className="w-4 h-4 text-[#04cccc]" />
                                <span className="text-xs sm:text-sm">Mon - Fri: 9:00 AM - 6:00 PM PST</span>
                            </div>
                            <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                                <Globe className="w-4 h-4 text-[#04cccc]" />
                                <span className="text-xs sm:text-sm">https://www.mtradershklimited.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="lg:col-span-7">
                        <div className="p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                                Send a Message
                            </h3>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* Name */}
                                <div className="space-y-1.5">
                                    <label htmlFor="name" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                        Your Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        className={`w-full px-3.5 py-2.5 rounded-lg border bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#04cccc] transition-colors ${errors.name ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                                            }`}
                                        {...register("name", { required: "Name is required" })}
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-red-500 pt-0.5">{errors.name.message}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className={`w-full px-3.5 py-2.5 rounded-lg border bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#04cccc] transition-colors ${errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                                            }`}
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-500 pt-0.5">{errors.email.message}</p>
                                    )}
                                </div>

                                {/* Issue Category */}
                                <div className="space-y-1.5">
                                    <label htmlFor="issueCategory" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                        Select Issue Category
                                    </label>
                                    <select
                                        id="issueCategory"
                                        className={`w-full px-3.5 py-2.5 rounded-lg border bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#04cccc] transition-colors ${errors.issueCategory ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                                            }`}
                                        {...register("issueCategory", { required: "Please select an issue category" })}
                                    >
                                        <option value="">Select Category...</option>
                                        <option value="Development">Development</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Creativity & Design">Creativity & Design</option>
                                        <option value="Professional Development">Professional Development</option>
                                        <option value="Sales & Marketing">Sales & Marketing</option>
                                        <option value="Freelance Marketplace">Freelance Marketplace</option>
                                        <option value="Business">Business</option>
                                        <option value="Personal Development">Personal Development</option>
                                        <option value="Language Learning">Language Learning</option>
                                        <option value="Teaching & Academic">Teaching & Academic</option>
                                        <option value="Workshop & Live">Workshop & Live</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.issueCategory && (
                                        <p className="text-xs text-red-500 pt-0.5">{errors.issueCategory.message}</p>
                                    )}
                                </div>

                                {/* Message */}
                                <div className="space-y-1.5">
                                    <label htmlFor="message" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        placeholder="How can we help you?"
                                        className={`w-full px-3.5 py-2.5 rounded-lg border bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#04cccc] transition-colors ${errors.message ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                                            }`}
                                        {...register("message", { required: "Message is required" })}
                                    />
                                    {errors.message && (
                                        <p className="text-xs text-red-500 pt-0.5">{errors.message.message}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 px-5 rounded-lg bg-[#04cccc] hover:opacity-90 text-white font-medium text-sm transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer pt-2.5"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default ContactSection;