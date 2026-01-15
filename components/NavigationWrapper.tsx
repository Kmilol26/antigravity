'use client';

import { usePathname } from "next/navigation";
import { BusinessNav } from "@/components/BusinessNav";

export function NavigationWrapper() {
  const pathname = usePathname();

  // Detecta si estamos en /events/[id] pero no en /events ni /events/new
  const isEventDashboard =
    pathname.startsWith("/events/") &&
    pathname !== "/events" &&
    !pathname.includes("/new");

  // Si es dashboard de evento, no mostramos la navegación general
  if (isEventDashboard) {
    return null;
  }

  return <BusinessNav />;
}
