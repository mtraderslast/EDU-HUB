"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ChevronRight, X, FolderKanban, FilePlusCorner, UserPen, LucideFilePlusCorner, Video, } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const MENU_CONFIG = {
    admin: [
        { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Manage Course", href: "/dashboard/admin/manage-course", icon: FolderKanban },
        { name: "Add Course", href: "/dashboard/admin/add-course", icon: FilePlusCorner },
        { name: "Add Blog", href: "/dashboard/admin/add-blog", icon: LucideFilePlusCorner },
        { name: "Profile", href: "/my-profile", icon: UserPen },
    ],

    user: [
        { name: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
        { name: "My Courses", href: "/dashboard/user/courses", icon: Video },
        { name: "Profile", href: "/my-profile", icon: UserPen },
    ],
};

function DashboardSidebar({ isOpen, closeSidebar }) {
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;
    const role = user?.role;

    if (isPending) {
        return (
            <aside className="fixed inset-y-0 left-0 z-50 flex h-screen w-64 items-center justify-center border-r border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-black dark:text-slate-100 lg:sticky lg:top-0">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#04cccc] border-t-transparent" />
            </aside>
        );
    }

    if (!user || !role) return null;

    const menuItems = MENU_CONFIG[role] || [];

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col justify-between border-r border-slate-200 bg-white text-slate-900 transition-all duration-300 dark:border-slate-800 dark:bg-black dark:text-slate-100 lg:sticky lg:top-0 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
        >
            <div className="flex flex-1 flex-col overflow-y-auto pt-6">
                <div className="mb-8 flex items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="h-8 w-8 sm:h-10 sm:w-10 object-contain transition-transform group-hover:scale-105"
                        />
                        <span className="text-xl sm:text-2xl font-black tracking-tight">
                            <span className="py-0.5 rounded-l-sm bg-[#04cccc] text-white dark:bg-[#07d1d1] font-bold text-lg sm:text-xl pl-2">EDU</span>
                            <span className="py-0.5 rounded-r-sm bg-[#15a3a3] text-white dark:bg-[#0b6b6b] font-bold text-lg sm:text-xl pr-2">
                                HUB
                            </span>
                        </span>
                    </Link>

                    <button
                        onClick={() => closeSidebar?.()}
                        className="rounded-lg p-1.5 text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-[#04cccc] dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-[#04cccc] lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="mb-6 px-4">
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
                        <img
                            src={user?.image || "/user.png"}
                            alt={user?.name || "User"}
                            className="h-10 w-10 rounded-full border border-slate-200 dark:border-slate-800 object-cover"
                        />

                        <div className="min-w-0 flex-1">
                            <h4 className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                                {user?.name}
                            </h4>

                            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </div>

                <nav className="space-y-1 px-3">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        const isDashboard = item.href === `/dashboard/${role}`;

                        const isActive = isDashboard
                            ? pathname === item.href
                            : pathname === item.href ||
                            pathname.startsWith(item.href + "/");

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => closeSidebar?.()}
                                className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-gradient-to-r from-[#04cccc] to-[#15a3a3] text-white shadow-md shadow-[#04cccc]/20"
                                    : "text-slate-700 hover:bg-slate-100 hover:text-[#04cccc] dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-[#04cccc]"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon
                                        size={18}
                                        className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? "" : "opacity-75 group-hover:opacity-100"
                                            }`}
                                    />

                                    <span>{item.name}</span>
                                </div>

                                {isActive && (
                                    <ChevronRight
                                        size={14}
                                        className="opacity-90"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t border-slate-200 p-4 dark:border-slate-800">
                <div className="rounded-lg bg-slate-50 px-3 py-2 transition-colors duration-300 dark:bg-slate-900">
                    <p className="text-center text-[11px] font-medium capitalize text-slate-600 dark:text-slate-400">
                        Logged in as {user?.role?.replace("_", " ")}
                    </p>
                </div>
            </div>
        </aside>
    );
}

export default DashboardSidebar;