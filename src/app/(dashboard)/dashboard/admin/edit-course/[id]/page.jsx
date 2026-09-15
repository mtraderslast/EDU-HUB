"use client";
import { fetchCourseDetails, updateCourse } from '@/lib/action/course';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

export default function EditCourseForm() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            category: 'Development',
            description: '',
            image: '',
            price: '',
            duration: '',
            level: 'Beginner',
            certificateProvided: true,
        }
    });

    // Dynamic Array States
    const [whatYouWillLearn, setWhatYouWillLearn] = useState([]);
    const [targetAudience, setTargetAudience] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [tags, setTags] = useState([]);

    // UI Loading States
    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);

    // Fetch Course Details when ID is available
    useEffect(() => {
        let isMounted = true;

        const getCourseData = async () => {
            if (!id) return;

            try {
                setFetching(true);
                const response = await fetchCourseDetails(id);

                // Extract data safely regardless of API response structure
                const courseData = response?.data || response?.course || response?.result || response;

                if (courseData && isMounted) {
                    // Populate Form Fields
                    reset({
                        title: courseData.title || '',
                        category: courseData.category || 'Development',
                        description: courseData.description || '',
                        image: courseData.image || '',
                        price: courseData.price !== undefined ? Math.round(Number(courseData.price)) : '',
                        duration: courseData.duration || '',
                        level: courseData.level || 'Beginner',
                        certificateProvided: courseData.certificateProvided ?? true,
                    });

                    // Populate Dynamic Arrays
                    setWhatYouWillLearn(Array.isArray(courseData.whatYouWillLearn) ? courseData.whatYouWillLearn : []);
                    setTargetAudience(Array.isArray(courseData.targetAudience) ? courseData.targetAudience : []);
                    setRequirements(Array.isArray(courseData.requirements) ? courseData.requirements : []);
                    setTags(Array.isArray(courseData.tags) ? courseData.tags : []);
                }
            } catch (error) {
                console.error('Failed to fetch course details:', error);
                if (isMounted) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to load course details. Please try again.',
                        icon: 'error',
                        confirmButtonColor: '#04cccc',
                    });
                }
            } finally {
                if (isMounted) {
                    setFetching(false);
                }
            }
        };

        getCourseData();

        return () => {
            isMounted = false;
        };
    }, [id, reset]);

    // Form Submit Handler
    const onSubmit = async (data) => {
        const confirmResult = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to update this course details?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#04cccc',
            cancelButtonColor: '#d33',
        });

        if (!confirmResult.isConfirmed) return;

        setLoading(true);

        // Sanitize price to avoid floating-point inaccuracies
        const parsedPrice = parseFloat(data.price);
        const cleanPrice = isNaN(parsedPrice) ? 0 : Math.round(parsedPrice);

        const finalData = {
            ...data,
            price: cleanPrice,
            whatYouWillLearn,
            targetAudience,
            requirements,
            tags
        };

        try {
            const response = await updateCourse(id, finalData);

            if (response) {
                await Swal.fire({
                    title: 'Updated!',
                    text: 'Course has been updated successfully.',
                    icon: 'success',
                    confirmButtonColor: '#04cccc',
                });

                // Redirect to manage course page after successful update
                router.push('/dashboard/admin/manage-course');
            }
        } catch (error) {
            console.error('Failed to update course:', error);

            Swal.fire({
                title: 'Error!',
                text: error?.response?.data?.message || 'Failed to update course. Please try again.',
                icon: 'error',
                confirmButtonColor: '#04cccc',
            });
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-10 h-10 border-4 border-[#04cccc] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium">Loading course details...</p>
            </div>
        );
    }

    return (
        <div className="mx-auto dark:bg-slate-900">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                Edit Course
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Course Title *
                    </label>
                    <input
                        {...register('title', { required: 'Title is required' })}
                        type="text"
                        className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#04cccc]"
                        placeholder="e.g. Full-Stack Web Development with MERN"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>

                {/* Category & Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Category *
                        </label>
                        <select
                            {...register('category')}
                            className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#04cccc]"
                        >
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
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Level
                        </label>
                        <select
                            {...register('level')}
                            className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#04cccc]"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="All Levels">All Levels</option>
                        </select>
                    </div>
                </div>

                {/* Price & Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Price ($) *
                        </label>
                        <input
                            {...register('price', { required: 'Price is required' })}
                            type="number"
                            step="1"
                            className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#04cccc]"
                            placeholder="e.g. 199"
                        />
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Duration *
                        </label>
                        <input
                            {...register('duration', { required: 'Duration is required' })}
                            type="text"
                            className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#04cccc]"
                            placeholder="e.g. 45 Hours"
                        />
                        {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
                    </div>
                </div>

                {/* Thumbnail Image URL */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Image Thumbnail URL *
                    </label>
                    <input
                        {...register('image', { required: 'Image URL is required' })}
                        type="text"
                        className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#04cccc]"
                        placeholder="https://example.com/image.png"
                    />
                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Description *
                    </label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        rows={4}
                        className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#04cccc]"
                        placeholder="Write details about the course..."
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                {/* Certificate Checkbox */}
                <div className="flex items-center gap-3">
                    <input
                        {...register('certificateProvided')}
                        type="checkbox"
                        id="certificateProvided"
                        className="w-5 h-5 accent-[#04cccc] rounded cursor-pointer"
                    />
                    <label htmlFor="certificateProvided" className="text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                        Certificate Provided?
                    </label>
                </div>

                <hr className="my-6 border-slate-200 dark:border-slate-800" />

                {/* Dynamic Array Inputs */}
                <TagArrayInput
                    label="What You Will Learn"
                    placeholder="Type a point and press Enter or Click Add"
                    items={whatYouWillLearn}
                    setItems={setWhatYouWillLearn}
                />

                <TagArrayInput
                    label="Target Audience"
                    placeholder="Type an audience and press Enter or Click Add"
                    items={targetAudience}
                    setItems={setTargetAudience}
                />

                <TagArrayInput
                    label="Requirements"
                    placeholder="Type a requirement and press Enter or Click Add"
                    items={requirements}
                    setItems={setRequirements}
                />

                <TagArrayInput
                    label="Tags"
                    placeholder="Type a tag and press Enter or Click Add"
                    items={tags}
                    setItems={setTags}
                />

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-[#04cccc] text-white font-bold text-lg rounded-lg hover:bg-[#15a3a3] shadow-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Updating...' : 'Update Course'}
                    </button>
                </div>
            </form>
        </div>
    );
}

// Reusable Tag/Chip Array Input Component
function TagArrayInput({ label, placeholder, items, setItems }) {
    const [inputValue, setInputValue] = useState('');

    const handleAddItem = (e) => {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (trimmed && !items.includes(trimmed)) {
            setItems([...items, trimmed]);
            setInputValue('');
        }
    };

    const handleRemoveItem = (indexToRemove) => {
        setItems(items.filter((_, index) => index !== indexToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddItem(e);
        }
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                {label}
            </label>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#04cccc]"
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-5 py-3 bg-[#04cccc] text-white font-semibold rounded-lg hover:bg-[#15a3a3] transition-colors"
                >
                    Add
                </button>
            </div>

            {items.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 px-3 py-1.5 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-sm text-slate-800 dark:text-slate-200"
                        >
                            <span>{item}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveItem(index)}
                                className="text-slate-400 hover:text-red-500 text-base font-bold leading-none pl-1 transition-colors"
                                title="Remove"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}