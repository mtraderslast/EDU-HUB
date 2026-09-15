"use client";
import { useState } from "react";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardHeader from "./components/DashboardHeader";
import ProtectedRoute from "@/middleware/ProtectedRoute";

export const dynamic = "force-dynamic";

function Dashboard({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <ProtectedRoute roles={['admin', "user"]} fallbackUrl="/login">
            <div className="flex min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 transition-colors duration-300">
                <div
                    className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <DashboardSidebar
                        isOpen={isSidebarOpen}
                        closeSidebar={() => setIsSidebarOpen(false)}
                    />
                </div>

                {isSidebarOpen && (
                    <div
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    />
                )}

                <div className="flex-1 flex flex-col min-w-0">
                    <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                    <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default Dashboard;