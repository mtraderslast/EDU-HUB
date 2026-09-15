"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Loader2 } from "lucide-react";
import { getHomeTopReviewsApi } from "@/lib/action/review";

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeReviews = async () => {
            try {
                const response = await getHomeTopReviewsApi();
                if (response?.success) {
                    setReviews(response.data || []);
                }
            } catch (error) {
                console.error("Failed to load home reviews:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHomeReviews();
    }, []);

    const duplicatedReviews = [...reviews, ...reviews];

    if (loading) {
        return (
            <div className="w-full bg-white dark:bg-black py-20 flex justify-center items-center text-slate-400">
                <Loader2 className="animate-spin mr-2 text-[#04cccc]" size={24} />
                <span>Loading testimonials...</span>
            </div>
        );
    }

    if (reviews.length === 0) return null;

    return (
        <section className="w-full bg-white dark:bg-black py-10 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#04cccc]">
                    Testimonials
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-2 text-slate-900 dark:text-white">
                    What Our Community Says
                </h2>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-3 max-w-xl mx-auto">
                    Real stories from verified learners who achieved their goals through EduHub.
                </p>
            </div>

            <div className="flex w-full overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-6 pr-6 flex-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        ease: "linear",
                        duration: reviews.length > 3 ? reviews.length * 5 : 20,
                        repeat: Infinity,
                    }}
                    whileHover={{ animationPlayState: "paused" }}
                >
                    {duplicatedReviews.map((review, index) => {
                        if (!review) return null;

                        const reviewId = typeof review._id === "object" ? review._id.$oid : review._id;

                        return (
                            <div
                                key={`${reviewId}-${index}`}
                                className="w-[350px] md:w-[400px] shrink-0 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl flex flex-col justify-between relative transition-all duration-300 hover:border-[#04cccc] dark:hover:border-[#04cccc]"
                            >
                                <Quote className="absolute right-6 top-6 text-[#04cccc]/10 dark:text-[#04cccc]/10 w-12 h-12 pointer-events-none" />

                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={`${i < review.rating
                                                    ? "fill-[#04cccc] text-[#04cccc]"
                                                    : "text-slate-300 dark:text-slate-700"
                                                }`}
                                        />
                                    ))}
                                </div>

                                <p className="text-sm font-normal text-slate-700 dark:text-slate-300 leading-relaxed flex-grow italic mb-6">
                                    "{review.comment}"
                                </p>

                                <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                    <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                        <img
                                            src={review.userImage || "/avatar-placeholder.png"}
                                            alt={review.userName}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = "/avatar-placeholder.png";
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                                            {review.userName}
                                        </h4>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-[#04cccc]">
                                            Verified Learner
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

export default Reviews;