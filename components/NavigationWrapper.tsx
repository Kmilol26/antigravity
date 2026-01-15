'use client';

import { usePathname } from "next/navigation";
import { BusinessNav } from "./BusinessNav"; // ajusta la ruta real donde esté BusinessNav

export function NavigationWrapper() {
  const pathname = usePathname();

  const isEventDashboard =
    pathname.startsWith("/events/") &&
    pathname !== "/events" &&
    !pathname.startsWith("/events/new");

  if (isEventDashboard) return null;

  return <BusinessNav />;
}
