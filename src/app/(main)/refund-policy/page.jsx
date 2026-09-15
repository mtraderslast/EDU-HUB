import React from 'react';

export default function RefundPolicy() {
    return (
        <main className="min-h-screen mt-5 bg-white text-slate-900 dark:bg-black dark:text-slate-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

                {/* Header Section */}
                <header className="mb-12 text-center md:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                        <span className="bg-gradient-to-r from-[#04cccc] to-[#15a3a3] bg-clip-text text-transparent">
                            Refund Policy
                        </span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-3xl">
                        Last updated: July 26, 2026. Review our official refund guidelines, evaluation terms, and claims process for EduHub courses.
                    </p>
                </header>

                {/* Content Section */}
                <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-justify">

                    {/* Section 1 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            1. General Non-Refundable Policy Standard
                        </h2>
                        <p>
                            EduHub provides specialized, high-quality online technical education, complete with structured lifetime curriculum access and 3-day weekly 1-on-1 mentorship sessions. Due to the immediate digital delivery of our course assets, proprietary code repositories, video modules, and access to dedicated mentor resources upon enrollment, all course purchases made on EduHub are strictly non-refundable under standard purchasing conditions.
                        </p>
                        <p>
                            Students are strongly advised to thoroughly review the publicly accessible course curriculum, pre-requisites, skill expectations, and video previews before completing any transaction on our platform. Change of mind, personal scheduling conflicts, lack of personal effort, or hardware/software limitations on the student's personal device do not constitute valid grounds for requesting a refund.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            2. Exceptional Circumstances for Refund Claims
                        </h2>
                        <p>
                            At EduHub, we maintain high standards of content precision and technical integrity. While our standard policy is non-refundable, we acknowledge that rare instances may occur where course content contains severe factual errors, critical misinformations, or defective materials that directly hinder a student's ability to proceed with their learning journey.
                        </p>
                        <p>
                            A refund claim will only be accepted for formal review under the specific condition that the enrolled student discovers a major error, incorrect technical instruction, or platform functionality flaw within the purchased course that prevents reasonable progress, and where EduHub's technical team fails to resolve or rectify the issue within a reasonable timeframe.
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            3. Verification Standards and Submitting Solid Proof
                        </h2>
                        <p>
                            To prevent fraudulent claims and protect the integrity of our educational platform, any student seeking a refund under the exceptional circumstances outlined above must submit a formal request to our Help Team accompanied by concrete, verifiable proof. Verbal statements or general complaints without supporting technical documentation will not be considered.
                        </p>
                        <p>
                            Valid proof must include comprehensive documentation such as unedited video screen recordings demonstrating the specific course error, detailed screenshots of failing code outputs caused directly by faulty course instructions, time-stamped logs of technical glitches, and clear evidence of communication showing that the issue severely disrupts learning.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            4. Review, Evaluation, and Approval Process
                        </h2>
                        <p>
                            Upon receiving a refund claim with the required proof, EduHub’s dedicated Help and Quality Assurance Team will initiate a manual review. The investigation process follows strict procedures:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-left">
                            <li>
                                <strong>Audit & Investigation:</strong> Our senior instructors and technical auditors will reproduce the reported error using the exact parameters provided in your claim.
                            </li>
                            <li>
                                <strong>Technical Resolution Attempt:</strong> If the reported error can be corrected, updated, or resolved by our technical team within 5 business days, the course material will be fixed and the refund request will be marked as resolved.
                            </li>
                            <li>
                                <strong>Evaluation Period:</strong> Official claim evaluations generally take between 5 to 7 business days from the date of receiving complete documentation.
                            </li>
                            <li>
                                <strong>Final Determination:</strong> If the audit confirms that the course contains fundamental, unresolvable errors that render the course unusable as advertised, EduHub management will approve the refund. EduHub holds sole discretion in determining whether submitted evidence meets the criteria for a refund.
                            </li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            5. Processing Approved Refunds and Payment Methods
                        </h2>
                        <p>
                            Once a refund request is officially approved by EduHub management, the user's course access, lifetime dashboard privileges, and eligibility for weekly 1-on-1 mentorship sessions for that course will be permanently revoked immediately.
                        </p>
                        <p>
                            Approved refunds will be processed back to the original payment method utilized during the initial transaction (e.g., credit card, debit card, or supported digital gateway) within <strong>1 business day (24 hours)</strong> after approval.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            6. Contact for Refund Inquiries
                        </h2>
                        <p>
                            If you believe your situation meets the criteria for an exceptional refund claim, or if you need to submit verifiable proof to our support desk, please contact our Help Team directly at:
                        </p>
                        <div className="pt-2 text-left">
                            <p><strong>Official Contact Email:</strong> hello@mtraderslastllc.com</p>
                            <p><strong>Support Channel:</strong> EduHub Helpdesk & Ticket System</p>
                        </div>
                    </section>

                </article>

            </div>
        </main>
    );
}