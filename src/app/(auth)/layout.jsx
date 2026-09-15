import ThemeToggle from "@/component/ThemeToggle";

export const metadata = {
    title: "Auth - Trade Chain",
    description: "",
};

function AuthLayout({ children }) {
    return (
        <div className="auth-container min-h-screen bg-white dark:bg-black transition-colors duration-300">
            {/* Theme Toggle */}
            <div className="fixed top-2 right-6 z-50">
                <ThemeToggle />
            </div>
            {children}
        </div>
    );
}

export default AuthLayout;
