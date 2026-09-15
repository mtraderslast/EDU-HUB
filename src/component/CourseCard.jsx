"use client";
import React from 'react';
import Link from 'next/link';

export default function CourseCard({ course }) {
    return (
        <div className="group bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm transition-all duration-300 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Prominent Category Badge */}
                <div className="absolute top-3 left-3 bg-[#04cccc] text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                    {course.category}
                </div>

                {/* Level Tag */}
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-700/50">
                    {course.level}
                </div>
            </div>

            {/* Body Content */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 line-clamp-2 mb-2 group-hover:text-[#04cccc] transition-colors leading-snug">
                    {course.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-6 flex-grow leading-relaxed">
                    {course.description}
                </p>

                {/* Price and Footer CTA */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                    <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase block">Price</span>
                        <span className="text-2xl font-black text-slate-900 dark:text-slate-100">
                            ${course.price}
                        </span>
                    </div>

                    <Link
                        href={`/courses/${course._id}`}
                        className="px-5 py-2.5 bg-[#04cccc] hover:bg-[#15a3a3] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        View Course
                    </Link>
                </div>
            </div>
        </div>
    );
}