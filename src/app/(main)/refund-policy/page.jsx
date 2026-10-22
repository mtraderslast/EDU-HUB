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
                        Last updated: October 22, 2026. Review our official refund guidelines, evaluation terms, and claims process for EduHub courses operated by M Traders HK Limited.
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
                            2. Access Problems and Technical Issues
                        </h2>
                        <p>
                            If a student has enrolled in a course and then cannot access it, cannot continue taking it, or is blocked by a technical problem on our side, the student should report the issue to our Help Team as soon as possible.
                        </p>
                        <p>
                            Once we receive the report, EduHub will investigate and resolve the access or technical problem within <strong>24 hours</strong>. Our first obligation is to restore the student’s ability to take the course. Change of mind, personal scheduling conflicts, lack of personal effort, or issues limited to the student’s own device or internet connection are not treated as platform technical faults.
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            3. Refund After the Issue Has Been Addressed
                        </h2>
                        <p>
                            If, after we have resolved or attempted to resolve the reported problem within 24 hours, the student still cannot reasonably take the course and wishes to return it for a refund, the student may submit a formal refund request.
                        </p>
                        <p>
                            The request must state the specific reason for returning the course and must include verifiable proof of the problem. Verbal statements or general complaints without supporting evidence will not be considered. Valid proof may include unedited screen recordings, screenshots, time-stamped error logs, and records of communication with our Help Team.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            4. Review of Reason and Proof
                        </h2>
                        <p>
                            Upon receiving a refund request with the required reason and proof, EduHub’s Help Team will review the claim. The process is as follows:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-left">
                            <li>
                                <strong>Report first:</strong> Access or technical problems must be reported so we can restore the course within 24 hours.
                            </li>
                            <li>
                                <strong>Reason and proof:</strong> If the student still requests a refund afterwards, we will examine the specific reason given and the evidence submitted.
                            </li>
                            <li>
                                <strong>Decision:</strong> Where the stated reason is valid and the proof supports it, the refund will be approved. EduHub holds sole discretion in determining whether submitted evidence meets these criteria.
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
                            Where the reason and proof are accepted, we will refund the course payment to the original payment method used at checkout (for example, card or supported digital gateway) within <strong>24 hours</strong>.
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
                            <p><strong>Operating Company:</strong> M Traders HK Limited</p>
                            <p><strong>Official Contact Email:</strong> hello@mtraderslastllc.com</p>
                            <p><strong>Support Channel:</strong> EduHub Helpdesk & Ticket System</p>
                        </div>
                    </section>

                </article>

            </div>
        </main>
    );
}