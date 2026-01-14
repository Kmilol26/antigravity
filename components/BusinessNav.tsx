'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Negocio', href: '/business' },
    { name: 'Espacios', href: '/spaces' },
    { name: 'Inscripción', href: '/events' },
    { name: 'Listas', href: '/lists' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Ventas', href: '/sales' },
    { name: 'Pagos', href: '/payments' },
];

export function BusinessNav() {
    const pathname = usePathname();

    // Don't show on specific event management pages if needed
    // But NavigationWrapper will handle that.

    return (
        <div className="border-b bg-white/50 backdrop-blur-sm sticky top-14 z-40">
            <div className="mx-auto max-w-7xl px-6 pt-2">
                <div className="flex items-center gap-3 py-4">
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xs font-bold ring-2 ring-white shadow-sm">
                        GF
                    </div>
                    <h1 className="text-lg font-semibold tracking-tight text-foreground">Grupo El Fabuloso</h1>
                </div>

                <nav className="-mb-px flex gap-6 overflow-x-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "whitespace-nowrap border-b-2 py-3 text-sm font-medium transition-colors hover:text-foreground",
                                    isActive
                                        ? "border-black text-black"
                                        : "border-transparent text-gray-500"
                                )}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </div>
    );
}
