'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    Building2,
    LayoutGrid,
    Calendar,
    Users,
    LayoutDashboard,
    CreditCard,
    BarChart3,
    MoreHorizontal
} from 'lucide-react';

const navigation = [
    { name: 'Negocio', href: '/events/123', icon: Building2 },
    { name: 'Espacios', href: '/spaces', icon: LayoutGrid },
    { name: 'Eventos', href: '/events', icon: Calendar },
    { name: 'Listas', href: '/lists', icon: Users },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Ventas', href: '/sales', icon: BarChart3 },
    { name: 'Pagos', href: '/payments', icon: CreditCard },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-primary">
                    <span>tikipal</span>
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="mt-auto border-t p-4">
                <div className="flex items-center gap-3 px-2 py-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        GF
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">Grupo El Fabuloso</span>
                        <span className="text-xs text-muted-foreground">Admin</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
