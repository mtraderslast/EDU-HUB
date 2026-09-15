import React from 'react';

export default function TermsAndConditions() {
    return (
        <main className="min-h-screen mt-5 bg-white text-slate-900 dark:bg-black dark:text-slate-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

                {/* Header Section */}
                <header className="mb-12 text-center md:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                        <span className="bg-gradient-to-r from-[#04cccc] to-[#15a3a3] bg-clip-text text-transparent">
                            Terms & Conditions
                        </span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-3xl">
                        Last updated: July 26, 2026. Please read these terms and conditions carefully before using EduHub services.
                    </p>
                </header>

                {/* Content Section */}
                <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-justify">

                    {/* Section 1 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            1. Introduction and Acceptance of Terms
                        </h2>
                        <p>
                            Welcome to EduHub. These Terms and Conditions govern your access to and use of the EduHub website, mobile applications, interactive features, and online educational content. By creating an account, enrolling in a course, or interacting with our platform, you agree to be legally bound by these terms.
                        </p>
                        <p>
                            If you do not agree to all of the terms and conditions stated herein, you must immediately discontinue your use of our platform. EduHub reserves the right to modify, amend, or update these terms at any time without prior individual notice.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            2. User Account and Security
                        </h2>
                        <p>
                            To access courses and mentorship sessions, you must register for an account by providing accurate, complete, and current information. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-left">
                            <li>
                                <strong>Single User License:</strong> Each enrolled account is strictly for individual use. Account sharing, credential distribution, or group access to a single account is strictly prohibited.
                            </li>
                            <li>
                                <strong>Account Integrity:</strong> You agree to notify our support team immediately if you suspect any unauthorized access or breach of security related to your account.
                            </li>
                            <li>
                                <strong>Termination:</strong> EduHub reserves the right to suspend or terminate accounts that violate security protocols or share access without authorization.
                            </li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            3. Lifetime Access Policy
                        </h2>
                        <p>
                            Upon purchasing a course on EduHub, users are granted lifetime access to the video lessons, downloadable materials, and curriculum associated with that specific course, subject to the continuous operation of the platform.
                        </p>
                        <p>
                            "Lifetime Access" refers to the operational lifetime of the course content on the EduHub platform. In the rare event of major platform restructuring, server transitions, or service deprecation, EduHub will provide reasonable advance notice to enrolled users.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            4. Mentorship and 1-on-1 Sessions
                        </h2>
                        <p>
                            EduHub provides dedicated mentorship support to assist students through their learning journey. Mentorship access is provided based on the following framework:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-left">
                            <li>
                                <strong>Schedule:</strong> Enrolled students are entitled to 1-on-1 discussion sessions with assigned mentors 3 days per week according to the published schedule for their respective courses.
                            </li>
                            <li>
                                <strong>Code of Conduct:</strong> All interactions with mentors must remain strictly professional, constructive, and focused on course material. Unprofessional or abusive behavior toward mentors will lead to immediate cancellation of mentorship privileges.
                            </li>
                            <li>
                                <strong>Rescheduling:</strong> Mentorship schedules are subject to adjustment due to technical maintenance or instructor availability, with advance communication provided whenever possible.
                            </li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            5. Payment, Non-Refundable Policy, and Claim Exceptions
                        </h2>
                        <p>
                            All course purchases on EduHub are final and non-refundable under standard conditions. Students are expected to carefully review the syllabus, course preview, and prerequisites prior to completing a purchase.
                        </p>
                        <p>
                            <strong>Refund Claim Exceptions:</strong> A refund request will only be considered if a student encounters severe errors, factually incorrect information, or significant technical flaws in the course content that directly prevent successful learning progress. All refund claims must be submitted to the Help Team accompanied by verifiable proof, which will be audited by EduHub management for approval.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            6. Intellectual Property Rights
                        </h2>
                        <p>
                            All content provided on EduHub—including video recordings, source code, design elements, graphics, written guides, and assets—is the exclusive intellectual property of EduHub and is protected under applicable copyright laws.
                        </p>
                        <p>
                            Users are strictly prohibited from copying, screen-recording, distributing, reselling, or re-uploading any portion of the course material. Any unauthorized distribution will result in legal action and immediate, non-refundable account revocation.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            7. Limitation of Liability
                        </h2>
                        <p>
                            EduHub strives to deliver high-quality technical education and support. However, career outcomes, job placement, and skill mastery depend on individual dedication and practice. EduHub does not guarantee specific employment opportunities, income levels, or individual commercial success as a result of taking our courses.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            8. Contact Information
                        </h2>
                        <p>
                            If you have any questions or concerns regarding these Terms & Conditions, please reach out to our legal and support team:
                        </p>
                        <div className="pt-2 text-left">
                            <p><strong>Email:</strong> hello@mtraderslastllc.com</p>
                            <p><strong>Support Portal:</strong> EduHub Helpdesk Center</p>
                        </div>
                    </section>

                </article>

            </div>
        </main>
    );
}