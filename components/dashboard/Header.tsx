"use client";

import { Bell, Menu } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
            <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={onMenuClick}
            >
                <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-4">
                <button className="relative rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                {/* User Dropdown stub */}
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
            </div>
        </header>
    );
}
