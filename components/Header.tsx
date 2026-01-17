'use client';

import Link from 'next/link';
export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#FE6535]/20 bg-white/80 backdrop-blur-md">
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
                </div>

            </div>
        </header>
    );
}

