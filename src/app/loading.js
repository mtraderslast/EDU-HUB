export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black transition-colors duration-300">

            {/* Center Logo & Spinner Container */}
            <div className="relative flex items-center justify-center">

                {/* 1. Outer Pulse Aura Background */}
                <div className="absolute w-28 h-28 rounded-full bg-[#04cccc]/20 dark:bg-[#07d1d1]/10 animate-ping opacity-75" />

                {/* 2. Rotating Gradient Spinner Ring */}
                <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-[#04cccc] border-r-[#15a3a3] dark:border-t-[#07d1d1] dark:border-r-[#0b6b6b] animate-spin" />

                {/* 3. Center Logo Image with Pulse Effect */}
                <div className="absolute flex items-center justify-center p-2 rounded-full bg-white dark:bg-black shadow-inner">
                    <img
                        src="/logo.png"
                        alt="Loading..."
                        className="h-10 w-10 object-contain animate-pulse"
                    />
                </div>
            </div>

            {/* Logo Text Brand Below */}
            <div className="mt-6 flex items-center justify-center">
                <span className="text-xl font-black tracking-tight animate-pulse">
                    <span className="py-0.5 pl-2 pr-0.5 rounded-l-sm bg-[#04cccc] text-white dark:bg-[#07d1d1] font-bold text-lg">
                        EDU
                    </span>
                    <span className="py-0.5 pr-2 pl-0.5 rounded-r-sm bg-[#15a3a3] text-white dark:bg-[#0b6b6b] font-bold text-lg">
                        HUB
                    </span>
                </span>
            </div>

            {/* Subtle Loading Text */}
            <p className="mt-2 text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-600 animate-pulse">
                Loading, please wait...
            </p>

        </div>
    );
}