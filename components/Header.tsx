'use client';

import Link from 'next/link';
export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/60 backdrop-blur-xl supports-[backdrop-filter]:bg-white/40">
            <div className="mx-auto flex h-16 items-center justify-between px-6 max-w-7xl">

                {/* Logo */}
                <Link href="/dashboard" className="flex items-center hover:opacity-80 transition-opacity">
                    <img
                        src="/logo-tikipal.svg"
                        alt="Tikipal"
                        className="h-7 w-auto"
                    />
                </Link>

                {/* Right */}
                <div className="flex items-center gap-4">
                    <button className="text-sm font-medium text-gray-600 hover:text-[#FE6535] transition-colors">
                        Esp
                    </button>
                    <div className="w-px h-4 bg-gray-300/50"></div>
                    <button className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 transition-colors">
                        {/* Placeholder for Profile/Menu */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FE6535] to-[#FF9068] shadow-sm"></div>
                    </button>
                </div>

            </div>
        </header>
    );
}

