'use client';

import { cn } from "@/lib/utils";
import { useState } from "react";
import { EventGeneralForm } from "@/components/events/EventGeneralForm";
import { EventSpacesTab } from "@/components/events/EventSpacesTab";
import { EventsListTab } from "@/components/events/EventsListTab";
import { EventSalesTab } from "@/components/events/EventSalesTab";
import { EventListsTab } from "@/components/events/EventListsTab";
import { EventDashboardTab } from "@/components/events/EventDashboardTab";
import { EventPaymentsTab } from "@/components/events/EventPaymentsTab";

const TABS = ['Negocio', 'Espacios', 'Eventos', 'Ventas', 'Listas', 'Dashboard', 'Pagos'];
const CONTAINER = "max-w-[820px] mx-auto px-6 w-full";

export default function EventManagePage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState('Negocio');
    const eventName = "TikiFest";

    return (
        <div className="min-h-screen bg-white animate-in fade-in duration-500">
            {/* Header */}
            <div className={cn(CONTAINER, "py-1 flex justify-between items-center")}>
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                        ✨
                    </div>
                    <h1 className="text-[32px] font-bold tracking-tight bg-gradient-to-r from-[#FE6535] to-[#9747FF] bg-clip-text text-transparent">
                        {eventName}
                    </h1>
                </div>
            </div>

            {/* Tabs (borde full width, contenido alineado al container) */}
            <div className="border-b border-gray-100 mt-1">
                <div className={CONTAINER}>
                    <nav className="flex items-center gap-6 h-12">
                        {TABS.map((tab) => {
                            const isActive = tab === activeTab;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "h-full px-1 text-base font-medium transition-colors border-b-2",
                                        isActive
                                            ? "border-black text-black"
                                            : "border-transparent text-gray-500 hover:text-gray-900"
                                    )}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Content */}
            <div className={cn(CONTAINER, "py-8 space-y-8")}>
                {activeTab === 'Negocio' && <EventGeneralForm />}
                {activeTab === 'Espacios' && <EventSpacesTab />}
                {activeTab === 'Eventos' && <EventsListTab />}
                {activeTab === 'Ventas' && <EventSalesTab />}
                {activeTab === 'Listas' && <EventListsTab />}
                {activeTab === 'Dashboard' && <EventDashboardTab />}
                {activeTab === 'Pagos' && <EventPaymentsTab />}
            </div>
        </div>
    );
}
