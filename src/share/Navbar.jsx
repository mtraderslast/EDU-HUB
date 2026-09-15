"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client"; // adjust path if different
import ThemeToggle from "@/component/ThemeToggle";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
    const pathname = usePathname();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const showDashboard = user?.role;
    const dashboardHref = `/dashboard/${user?.role}`;

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: "Blogs", href: "/blogs" },
        { name: "About", href: "/about" },
        { name: "Support", href: "/contact" },
    ];

    const isActive = (path) => pathname === path;

    return (
        <nav className="w-full fixed top-0 left-0 z-50 border-b transition-colors duration-300 bg-white/80 dark:bg-black backdrop-blur-md border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo Section */}
                    <div className="flex items-center">
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
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center justify-center space-x-8">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`font-medium transition-colors duration-200 relative group py-2 ${active
                                        ? "text-teal-500 dark:text-teal-400"
                                        : "text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400"
                                        }`}
                                >
                                    {link.name}
                                    <span className={`absolute bottom-0 left-0 h-0.5 bg-teal-500 dark:bg-teal-400 transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"
                                        }`}></span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Side Buttons */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <ThemeToggle />

                        {isPending ? (
                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-900 animate-pulse" />
                        ) : user ? (
                            <div className="relative">
                                {/* Avatar Button */}
                                <button
                                    onClick={() => setAvatarMenuOpen((prev) => !prev)}
                                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-500 dark:border-teal-400 hover:opacity-90 transition-opacity"
                                >
                                    <img
                                        src={user?.image || "/user.png"}
                                        alt={user?.name}
                                        className="object-cover w-10 h-10"
                                    />
                                </button>

                                {/* Dropdown */}
                                {avatarMenuOpen && (
                                    <>
                                        {/* backdrop to close on outside click */}
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setAvatarMenuOpen(false)}
                                        />
                                        <div className="absolute right-0 top-12 w-56 bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50">
                                            {/* User Info */}
                                            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                                                <img
                                                    src={user?.image || "/user.png"}
                                                    alt={user?.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div className="overflow-hidden">
                                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{user?.name}</p>
                                                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{user?.email}</p>
                                                </div>
                                            </div>
                                            {/* Actions */}
                                            <div className="p-2">
                                                {showDashboard && (
                                                    <Link
                                                        href={dashboardHref}
                                                        onClick={() => setAvatarMenuOpen(false)}
                                                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-teal-500 dark:hover:text-teal-400 transition-colors font-medium"
                                                    >
                                                        <LayoutDashboard size={15} /> Dashboard
                                                    </Link>
                                                )}

                                                <Link
                                                    href="/my-profile"
                                                    onClick={() => setAvatarMenuOpen(false)}
                                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                                                >
                                                    <User size={15} /> My Profile
                                                </Link>

                                                <button
                                                    onClick={() => {
                                                        setAvatarMenuOpen(false);
                                                        authClient.signOut({
                                                            fetchOptions: {
                                                                onSuccess: () => { window.location.href = "/"; }
                                                            }
                                                        });
                                                    }}
                                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                                                >
                                                    <LogOut size={15} /> Logout
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 via-[#04cccc] to-teal-600 rounded-lg hover:opacity-95 transition-all duration-300 shadow-md shadow-teal-500/20 active:scale-95"
                            >
                                Get Started
                            </Link>
                        )}

                        {/* Hamburger Menu Icon */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex lg:hidden items-center justify-center p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>

                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <div
                className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100 visible" : "max-h-0 opacity-0 invisible overflow-hidden"
                    }`}
                id="mobile-menu"
            >
                <div className="px-4 pt-2 pb-6 space-y-1 border-b bg-white dark:bg-black border-slate-200 dark:border-slate-800">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${active
                                    ? "text-teal-500 dark:text-teal-400 bg-slate-50 dark:bg-slate-900"
                                    : "text-slate-700 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}

                    {/* Mobile: user block or login */}
                    {isPending ? (
                        <div className="pt-4 px-3">
                            <div className="w-full h-12 rounded-lg bg-slate-200 dark:bg-slate-900 animate-pulse" />
                        </div>
                    ) : user ? (
                        <div className="pt-4 px-3 space-y-1 border-t border-slate-200 dark:border-slate-800 mt-3">
                            <div className="flex items-center gap-3 py-3">
                                <img
                                    src={user?.image || "/user.png"}
                                    alt={user?.name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-teal-500 dark:border-teal-400"
                                />
                                <div className="overflow-hidden">
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{user?.name}</p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{user?.email}</p>
                                </div>
                            </div>

                            {showDashboard && (
                                <Link
                                    href={dashboardHref}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 px-3 py-3 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                                >
                                    <LayoutDashboard size={16} /> Dashboard
                                </Link>
                            )}

                            <Link
                                href="/my-profile"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 px-3 py-3 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                            >
                                <User size={16} /> My Profile
                            </Link>

                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    authClient.signOut({
                                        fetchOptions: {
                                            onSuccess: () => { window.location.href = "/"; }
                                        }
                                    });
                                }}
                                className="flex items-center gap-2 w-full px-3 py-3 rounded-md text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    ) : (
                        <div className="pt-4 px-3">
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="w-full flex items-center justify-center px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-teal-500 via-[#04cccc] to-teal-600 rounded-lg hover:opacity-95 transition-all duration-300 shadow-md shadow-teal-500/20"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;