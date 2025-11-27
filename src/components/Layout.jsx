import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Activity, Calculator, CheckCircle, TrendingUp, BarChart2, FileQuestion, Home } from 'lucide-react';
import { clsx } from 'clsx';

const NavItem = ({ to, label, icon: Icon, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => clsx(
            "flex items-center w-full px-4 py-3 text-sm font-medium transition-all duration-200 rounded-full mb-1",
            isActive
                ? "bg-secondary-container text-on-secondary-container shadow-sm"
                : "text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface"
        )}
    >
        <Icon className="w-5 h-5 mr-3" />
        {label}
    </NavLink>
);

export default function Layout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <div className="min-h-screen bg-background font-sans text-on-background flex">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-md border-b border-outline/10 z-50 flex items-center justify-between px-4">
                <div className="font-bold text-xl text-primary flex items-center">
                    <span className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center mr-2 text-sm">CL</span>
                    ChanceLab
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-colors"
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar Navigation (Drawer) */}
            <nav className={clsx(
                "fixed lg:sticky top-0 left-0 h-screen w-[280px] bg-surface-variant/30 lg:bg-surface border-r border-outline/10 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto",
                isMobileMenuOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
            )}>
                <div className="p-6">
                    <div className="font-bold text-2xl text-primary flex items-center mb-1">
                        <span className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center mr-3 text-sm">CL</span>
                        ChanceLab
                    </div>
                    <p className="text-xs text-on-surface-variant ml-11">Probability & Statistics</p>
                </div>

                <div className="px-3 pb-8 space-y-6">
                    <div>
                        <NavItem to="/" label="Home" icon={Home} />
                    </div>

                    <div>
                        <div className="px-4 text-xs font-bold text-primary uppercase tracking-wider mb-2">Theory</div>
                        <NavItem to="/bernoulli" label="Bernoulli Distribution" icon={BookOpen} />
                        <NavItem to="/binomial" label="Binomial Distribution" icon={BookOpen} />
                    </div>

                    <div>
                        <div className="px-4 text-xs font-bold text-primary uppercase tracking-wider mb-2">Interactive</div>
                        <NavItem to="/visualizer" label="Distribution Visualizer" icon={Activity} />
                        <NavItem to="/calculator" label="Probability Calculator" icon={Calculator} />
                    </div>

                    <div>
                        <div className="px-4 text-xs font-bold text-primary uppercase tracking-wider mb-2">Simulations</div>
                        <NavItem to="/law-of-large-numbers" label="Law of Large Numbers" icon={TrendingUp} />
                        <NavItem to="/normal-approximation" label="Normal Approximation" icon={BarChart2} />
                    </div>

                    <div>
                        <div className="px-4 text-xs font-bold text-primary uppercase tracking-wider mb-2">Practice</div>
                        <NavItem to="/quiz" label="Knowledge Check" icon={CheckCircle} />
                        <NavItem to="/exam-questions" label="Exam Questions" icon={FileQuestion} />
                    </div>
                </div>
            </nav>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 min-w-0 pt-16 lg:pt-0">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
