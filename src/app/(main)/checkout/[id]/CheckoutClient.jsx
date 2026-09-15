// app/checkout/[id]/CheckoutClient.jsx
'use client';

import { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, User, Mail } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutClient({ courseData }) {
    const initialTitle = courseData?.title || 'Course Enrollment';
    const initialPrice = courseData?.price || '0';
    const initialImage = courseData?.image || '';
    const courseId = courseData?._id || '';

    const [customPrice, setCustomPrice] = useState(initialPrice);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleProceedToPayment = async () => {
        if (!customPrice || Number(customPrice) <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/antom-pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId,
                    title: initialTitle,
                    amount: Number(customPrice),
                    currency: 'USD',
                    customerName,
                    customerEmail
                }),
            });

            const data = await response.json();

            if (data.success && data.checkoutUrl) {
                window.location.href = data.checkoutUrl;
            } else {
                alert(data.message || 'Failed to initiate payment. Please try again.');
            }
        } catch (error) {
            console.error('Payment Error:', error);
            alert('Something went wrong during payment processing.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-300">
            {/* আপনার আগের সম্পূর্ণ ডিজাইন কোড এখানে হুবুহু বসবে */}
            <div className="max-w-4xl w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* Course Summary Section */}
                <div className="p-8 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                    <div>
                        <span className="inline-block px-3 py-1 bg-[#04cccc]/10 text-[#04cccc] text-xs font-semibold rounded-full mb-4 border border-[#04cccc]/20">
                            Course Checkout
                        </span>

                        {initialImage && (
                            <div className="w-full h-48 rounded-xl overflow-hidden mb-6 border border-slate-200 dark:border-slate-800">
                                <img src={initialImage} alt={initialTitle} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            {initialTitle}
                        </h1>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                            Complete your payment details to get instant access to the full course content.
                        </p>
                    </div>

                    <div className="space-y-3 border-t border-slate-200 dark:border-slate-800 pt-6">
                        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                            <CheckCircle2 className="w-4 h-4 text-[#04cccc]" />
                            <span>Lifetime Access Included</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                            <ShieldCheck className="w-4 h-4 text-[#04cccc]" />
                            <span>Encrypted & Secure Antom Gateway</span>
                        </div>
                    </div>
                </div>

                {/* Custom Payment Form Section */}
                <div className="p-8 flex flex-col justify-between bg-white/50 dark:bg-slate-900/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-[#04cccc]" />
                            Payment Summary
                        </h2>

                        {/* Customer Info */}
                        <div className="space-y-4 mb-6 bg-white dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div>
                                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                                    <User className="w-3.5 h-3.5" /> Full Name
                                </label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="e.g. John Doe"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:border-[#04cccc]"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                                    <Mail className="w-3.5 h-3.5" /> Email Address
                                </label>
                                <input
                                    type="email"
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:border-[#04cccc]"
                                />
                            </div>
                        </div>

                        {/* Amount Input */}
                        <div className="mb-6 flex flex-col items-center justify-center py-4">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                                Total Payable (USD)
                            </label>
                            <div className="relative flex items-baseline justify-center group">
                                <span className="text-2xl font-bold text-slate-400 mr-1">$</span>
                                <input
                                    type="number"
                                    min="1"
                                    value={customPrice}
                                    onChange={(e) => setCustomPrice(e.target.value)}
                                    className="w-32 bg-transparent text-center border-b border-transparent group-hover:border-slate-300 focus:border-[#04cccc] text-4xl font-extrabold focus:outline-none transition-all"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <button
                            onClick={handleProceedToPayment}
                            disabled={isLoading}
                            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#04cccc] to-[#15a3a3] hover:opacity-90 text-white font-bold text-base transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <span>Redirecting...</span>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <span>Proceed to Payment</span>
                                    <Image src="https://cdn.marmot-cloud.com/storage/intl_website/2026/03/23/EgIXCDK/logo_antom.svg" alt="Antom" width={30} height={30} className="h-5 w-auto object-contain" />
                                </div>
                            )}
                        </button>
                        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Secured and powered by <strong>Antom</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}