import React from 'react';

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen mt-5 bg-white text-slate-900 dark:bg-black dark:text-slate-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

                {/* Header Section */}
                <header className="mb-12 text-center md:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                        <span className="bg-gradient-to-r from-[#04cccc] to-[#15a3a3] bg-clip-text text-transparent">
                            Privacy Policy
                        </span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-3xl">
                        Last updated: July 26, 2026. Learn how EduHub collects, uses, protects, and handles your personal information when you use our platform.
                    </p>
                </header>

                {/* Content Section */}
                <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-justify">

                    {/* Section 1 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            1. Overview and Commitment to Privacy
                        </h2>
                        <p>
                            At EduHub, accessible from our web platform and mobile applications, protecting the privacy and personal data of our students and visitors is one of our paramount commitments. This comprehensive Privacy Policy document contains detailed descriptions of the types of information that are collected, logged, and processed by EduHub, as well as the exact parameters governing how we utilize, store, and safeguard that data.
                        </p>
                        <p>
                            By registering an account, enrolling in our technical development courses, participating in mentorship channels, or otherwise using any feature on EduHub, you acknowledge that you have read, understood, and agreed to the practices described in this Privacy Policy. If you have additional questions or require more information about our Privacy Policy, please do not hesitate to contact our dedicated data safety team.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            2. Information We Collect from Users
                        </h2>
                        <p>
                            To provide a seamless educational experience, maintain continuous lifetime access, and facilitate direct technical support, EduHub collects information through various interactions on our platform. The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we request your data.
                        </p>
                        <p>
                            <strong>Directly Provided Personal Data:</strong> When you register for an account on EduHub, we collect basic contact and identity details, including your full name, email address, phone number, and account credentials. When you enroll in a course or purchase educational access, payment information is processed through secure third-party payment gateways. We never store raw credit card credentials, CVV codes, or full banking details directly on our servers.
                        </p>
                        <p>
                            <strong>Technical and Usage Information:</strong> Like most web platforms, EduHub automatically collects diagnostic data transmitted by your browser or device when accessing our service. This includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamps, referring/exit pages, operating system details, clickstream data, and time spent on specific video modules or quiz pages.
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            3. Data Usage for 1-on-1 Mentorship Sessions
                        </h2>
                        <p>
                            EduHub provides active students with structured access to technical mentors 3 days per week through dedicated 1-on-1 interaction sessions. To maintain quality control, track student learning progression, and resolve potential disputes regarding course clarity or code reviews, we may retain session logs, text-based technical support tickets, and uploaded project files.
                        </p>
                        <p>
                            Any code repositories, project assets, or technical assignments shared during 1-on-1 mentorship interactions remain the intellectual property of the student. Mentors and staff members are bound by strict non-disclosure obligations and are prohibited from sharing, copying, or distributing student project materials outside the authorized learning environment.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            4. How We Use and Process Your Information
                        </h2>
                        <p>
                            We utilize the collected information in various ways to sustain and improve the quality of our educational services, including but not limited to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-left">
                            <li>
                                Providing, operating, and maintaining the core functionality of the EduHub web platform and lifetime course dashboards.
                            </li>
                            <li>
                                Scheduling, organizing, and executing weekly 3-day 1-on-1 mentorship sessions with technical instructors.
                            </li>
                            <li>
                                Verifying refund claims involving claimed errors in course material or critical technical defects prevented by our audit process.
                            </li>
                            <li>
                                Analyzing user interactions to fix bug reports, improve UI responsiveness, and optimize video streaming performance.
                            </li>
                            <li>
                                Communicating critical system updates, security alerts, administrative messages, and course curriculum revisions.
                            </li>
                            <li>
                                Detecting and preventing unauthorized account sharing, piracy, screen recording, and fraudulent transactions.
                            </li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            5. Cookies and Tracking Technologies
                        </h2>
                        <p>
                            EduHub uses 'Cookies' and similar web tracking tools to store information regarding visitor preferences, active session tokens, and the pages on the website that the visitor accessed or visited. The information is used to optimize user experience by customizing web page content based on visitors' browser type, dark/light theme preference, or other information transmitted via their browser session.
                        </p>
                        <p>
                            You can choose to disable cookies through your individual browser options. However, disabling essential cookies may impact your ability to maintain persistent login sessions, resume video playbacks, or access encrypted course content on EduHub.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            6. Data Sharing with Third Parties
                        </h2>
                        <p>
                            EduHub does not sell, trade, rent, or lease your personal identification information to third-party marketing companies. We may share limited anonymized data or encrypted tokens with trusted third-party service providers solely to operate our infrastructure smoothly. These third-party services include cloud hosting providers, video streaming delivery networks (CDNs), transactional email engines, and payment processor gateways.
                        </p>
                        <p>
                            All such service providers are contractually obligated to maintain strict data confidentiality and are restricted from using your personal information for any purpose other than facilitating EduHub's platform functionality. We may also disclose personal information if required to do so by law, court order, or governmental regulations.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            7. Data Security and Retention Standards
                        </h2>
                        <p>
                            The security of your personal data is critically important to us. EduHub employs industry-standard security measures, including transport layer security (TLS/SSL encryption), hashed password databases, secure API access layers, and routine vulnerability audits to shield your information from unauthorized access, alteration, disclosure, or destruction.
                        </p>
                        <p>
                            We retain user personal data for as long as your account remains active on EduHub to uphold your lifetime access privileges. Should you choose to delete your account, backup logs and financial transactional records will be retained only for as long as necessary to comply with legal, tax, and accounting obligations.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            8. User Rights and Data Protection Privileges
                        </h2>
                        <p>
                            Depending on your jurisdiction, you possess specific data protection rights regarding your personal information under applicable regulations (such as GDPR or local data protection frameworks):
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-left">
                            <li>
                                <strong>The Right to Access:</strong> You have the right to request copies of your personal data stored on EduHub.
                            </li>
                            <li>
                                <strong>The Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or incomplete.
                            </li>
                            <li>
                                <strong>The Right to Erasure:</strong> You have the right to request that we erase your personal data under certain qualifying conditions, provided it does not conflict with active lifetime course enrollments or financial audit laws.
                            </li>
                            <li>
                                <strong>The Right to Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under specific conditions.
                            </li>
                        </ul>
                    </section>

                    {/* Section 9 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-900 text-left">
                            9. Contact Our Privacy Office
                        </h2>
                        <p>
                            If you wish to exercise any of your privacy rights, report potential security concerns, or ask detailed questions regarding our privacy management, please reach out to our privacy compliance desk:
                        </p>
                        <div className="pt-2 text-left">
                            <p><strong>Email:</strong> hello@mtraderslastllc.com</p>
                            <p><strong>Official Address:</strong> EduHub Global Operations Center, Data Protection Office</p>
                        </div>
                    </section>

                </article>

            </div>
        </main>
    );
}