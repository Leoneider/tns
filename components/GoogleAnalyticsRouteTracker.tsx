"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "@/lib/gtag";

export default function GoogleAnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!pathname) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const queryString = searchParams.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    pageview(url);
  }, [pathname, searchParams]);

  return null;
}
