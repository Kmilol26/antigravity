'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export function EventNav({ activeTab }: { eventId?: string, activeTab?: string }) { // Keeping prop signature compatible but unused variables removed
    const pathname = usePathname();
    const navigation = [
        { name: 'Negocio', href: '/business' },
        { name: 'Espacios', href: '/spaces' },
        { name: 'Eventos', href: '/events' },
        { name: 'Ventas', href: '/sales' },
        { name: 'Listas', href: '/lists' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Pagos', href: '/payments' },
    ];

    return (
        <div className="border-b border-gray-100 mt-1">
            <div className="max-w-[820px] mx-auto px-6 w-full">
                <nav className="-mb-px flex gap-6 overflow-x-auto scrollbar-hide touch-pan-x">
                    {navigation.map((item) => {
                        let isActive = false;
                        if (activeTab) {
                            isActive = item.name === activeTab;
                        } else {
                            isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        }

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "whitespace-nowrap border-b-2 py-3 text-base font-medium transition-colors",
                                    isActive
                                        ? "border-black text-black"
                                        : "border-transparent text-gray-500 hover:text-gray-900"
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
