'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#FE6535] bg-white">
            <div className="mx-auto flex h-16 items-center justify-between px-6 max-w-7xl">

                {/* Logo */}
                <Link href="/dashboard" className="flex items-center">
                    <img
                        src="/logo-tikipal.svg"
                        alt="Tikipal"
                        className="h-8 w-auto"
                    />
                </Link>

                {/* Right */}
                <div className="flex items-center gap-4">
                    <button className="text-sm font-medium text-[#FE6535] hover:text-[#E55A28] transition-colors">
                        Esp
                    </button>

                    <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

            </div>
        </header>
    );
}

