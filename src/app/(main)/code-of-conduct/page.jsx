import React from 'react';

export default function StudentCodeOfConduct() {
    return (
        <main className="min-h-screen mt-5 bg-white text-slate-900 dark:bg-black dark:text-slate-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

                {/* Header Section */}
                <header className="mb-12 text-center md:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                        <span className="bg-gradient-to-r from-[#04cccc] to-[#15a3a3] bg-clip-text text-transparent">
                            Student Code of Conduct
                        </span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-3xl">
                        Last updated: July 26, 2026. Establish professional behavioral standards, interaction guidelines, and platform integrity expectations for EduHub.
                    </p>
                </header>

                {/* Content Section */}
                <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-justify">

                    {/* Section 1 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            1. Purpose and Scope of Conduct Guidelines
                        </h2>
                        <p>
                            At EduHub, we strive to cultivate a professional, inclusive, and highly productive learning environment for all aspiring developers and tech professionals. This Student Code of Conduct outlines the ethical expectations, behavioral standards, and responsibilities governing every student enrolled in our courses, community channels, and mentorship platforms.
                        </p>
                        <p>
                            By enrolling in any EduHub course or interacting with our instructional staff and fellow peers, you agree to adhere strictly to these behavioral guidelines. This policy applies across all EduHub ecosystem touchpoints, including 1-on-1 mentorship sessions, discussion forums, live code reviews, assignment submission platforms, and community groups.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            2. Professional Ethics in 1-on-1 Mentorship Sessions
                        </h2>
                        <p>
                            EduHub provides active students with structured 1-on-1 discussion opportunities with technical mentors 3 days per week to resolve learning roadblocks, review project architecture, and refine coding skills. To maintain the value and safety of these technical sessions, all students must uphold strict professional decorum:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-left">
                            <li>
                                <strong>Punctuality & Preparation:</strong> Students must arrive on time for scheduled mentorship sessions with clear, pre-formulated technical questions, relevant code repositories, and specific debugging logs ready for review.
                            </li>
                            <li>
                                <strong>Strictly Course-Focused Communication:</strong> Conversations during 1-on-1 sessions must focus strictly on course curriculum, assignments, project architecture, and developer career guidance. Personal inquiries, non-technical solicitations, or irrelevant discussions are strictly prohibited.
                            </li>
                            <li>
                                <strong>Respect for Mentors:</strong> Professional respect, courteous language, and constructive dialogue are mandatory. Any form of harassment, argumentative hostility, or inappropriate personal comments toward mentors will result in immediate termination of the session and revocation of mentorship access.
                            </li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            3. Academic Integrity, Plagiarism, and Independent Learning
                        </h2>
                        <p>
                            True software engineering proficiency is built through genuine problem-solving, hands-on debugging, and individual effort. EduHub maintains a zero-tolerance policy for academic dishonesty, unauthorized code duplication, and fraudulent assignment submissions.
                        </p>
                        <p>
                            While collaboration and research are encouraged, submitting another developer's work, copying complete repository structures without comprehension, or using automated unauthorized means to complete course certification requirements undermines the integrity of your education. EduHub instructors reserve the right to perform oral code defense reviews during mentorship sessions to verify a student's authentic understanding of submitted assignments.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            4. Community Interaction and Respectful Engagement
                        </h2>
                        <p>
                            EduHub values diversity, mutual respect, and collaborative growth across all student discussion boards and community networks. We enforce an environment free from discrimination, hate speech, political propaganda, and personal attacks.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-left">
                            <li>
                                <strong>Zero Tolerance for Harassment:</strong> Bullying, hate speech, offensive comments regarding race, gender, religion, background, or skill level will lead to immediate, non-negotiable account suspension.
                            </li>
                            <li>
                                <strong>No Commercial Spam or Self-Promotion:</strong> Posting unauthorized marketing materials, promotional links, external product referral links, or soliciting personal financial services within EduHub community spaces is strictly forbidden.
                            </li>
                            <li>
                                <strong>Constructive Peer Feedback:</strong> When reviewing fellow students' project repositories or responding to community forum queries, feedback must remain encouraging, objective, and technical in nature.
                            </li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            5. Platform Security, Credential Sharing, and Anti-Piracy
                        </h2>
                        <p>
                            EduHub provides individual, non-transferable access to course assets and video materials under our lifetime access model. Attempting to compromise platform security, reverse-engineer proprietary codebases, or illegally distribute course resources directly violates our operational policy and federal intellectual property laws.
                        </p>
                        <p>
                            Sharing your account credentials with un-enrolled third parties, recording proprietary course videos for external hosting, selling course materials, or employing automated scraping tools will result in instant permanent banning from EduHub without eligibility for appeal or refund.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            6. Disciplinary Actions and Enforcement Procedure
                        </h2>
                        <p>
                            EduHub enforces misconduct reports rigorously to guarantee a safe educational environment. Depending on the severity and frequency of a code of conduct violation, EduHub management may institute the following progressive disciplinary actions:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-left">
                            <li>
                                <strong>Official Warning:</strong> A formal written notice issued to the student specifying the conduct violation and requesting immediate behavioral correction.
                            </li>
                            <li>
                                <strong>Mentorship Privilege Suspension:</strong> Temporary or permanent revocation of access to 1-on-1 mentor support sessions while preserving self-paced video dashboard access.
                            </li>
                            <li>
                                <strong>Permanent Account Termination:</strong> Complete, non-refundable revocation of all course access, student dashboard privileges, and community platform membership for severe or repeated violations.
                            </li>
                        </ul>
                    </section>

                    {/* Section 7 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            7. Reporting Misconduct and Support Enquiries
                        </h2>
                        <p>
                            If you witness a violation of this Student Code of Conduct, experience inappropriate behavior during a 1-on-1 mentorship session, or need to report platform misuse, please contact our student safety team immediately:
                        </p>
                        <div className="pt-2 text-left">
                            <p><strong>Official Contact Email:</strong> hello@mtraderslastllc.com</p>
                            <p><strong>Support Desk:</strong> EduHub Student Relations & Code Compliance Desk</p>
                        </div>
                    </section>

                </article>

            </div>
        </main>
    );
}