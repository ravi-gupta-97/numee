"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, GraduationCap, User, LogOut } from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
    { name: "Courses", href: "/user/courses", icon: BookOpen },
    { name: "Jobs", href: "/user/jobs", icon: GraduationCap },
    { name: "Profile", href: "/user/profile", icon: User },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col bg-[#3b5998] text-white shadow-xl z-10">
            {/* Logo */}
            <div className="flex h-20 items-center px-8 border-b border-blue-400/20">
                <h1 className="text-2xl font-bold flex items-center gap-1">
                    NuMee<span className="text-yellow-400 transform -rotate-12 inline-block">✈</span>
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-4 py-8">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-white/10 text-white shadow-sm backdrop-blur-sm transform scale-105"
                                    : "text-blue-100 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon
                                className={`mr-3 h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-yellow-400" : "text-blue-200 group-hover:text-white"
                                    }`}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile / Logout */}
            <div className="p-4 bg-blue-900/20">
                <button className="group flex w-full items-center rounded-lg px-4 py-2.5 text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-colors">
                    <LogOut className="mr-3 h-5 w-5 text-blue-300 group-hover:text-white" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
