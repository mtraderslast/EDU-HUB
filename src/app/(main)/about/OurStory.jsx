"use client";

export default function OurStory() {
    return (
        <section className="w-full py-5 bg-white dark:bg-black text-slate-900 dark:text-slate-100 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

                <div className="text-left space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-[2px] bg-[#04cccc] rounded-full"></span>
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#04cccc]">
                            How It Began
                        </span>
                        <span className="w-6 h-[2px] bg-[#04cccc] rounded-full"></span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                        Our Journey & <span className="text-[#04cccc]">Vision</span>
                    </h2>
                </div>

                <div className="space-y-8 leading-relaxed sm:leading-loose text-slate-700 dark:text-neutral-300 font-normal text-justify">
                    <p>
                        Our journey started with a critical observation in the modern tech education landscape: traditional learning frameworks were consistently failing to keep pace with the rapidly evolving demands of the global software industry. Students and aspiring developers were spending countess months completing tutorial courses heavily loaded with passive theoretical knowledge, only to find themselves completely unprepared when faced with actual real-world production challenges. Driven by the core vision to bridge this widening gap, we set out to build a comprehensive, high-impact educational ecosystem that fundamentally replaces outdated video watching with active hands-on problem solving, production-ready project architectures, and dedicated one-on-one mentorship from active engineers.
                    </p>

                    <p>
                        Today, our platform has transformed into a thriving global academy connecting tens of thousands of ambitious learners, expert instructors, and industry veterans under a unified mission. We work closely alongside senior software engineers, technology leaders, and educational strategists to continuously update, refine, and stress-test our curriculum to ensure every single lesson, exercise, and capstone project reflects current enterprise standards. Whether you are taking your very first step into the world of web development, pivoting your career toward high-paying tech roles, or advancing your existing technical skills toward senior architecture, our core commitment remains unchanged: to provide fully structured, transparent, and career-defining education that truly empowers you to build with absolute confidence and independence.
                    </p>
                </div>

            </div>
        </section>
    );
}