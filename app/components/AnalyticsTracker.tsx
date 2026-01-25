"use client";

import { useEffect } from "react";
import { useAnalytics } from "./useAnalytics";

export default function AnalyticsTracker({ page }: { page: string }) {
  const { trackPageView, trackPageDuration, trackClick, trackScroll, userId } = useAnalytics();

  useEffect(() => {
    trackPageView(page);
    
    const startTime = Date.now();
    
    // Track page duration when user leaves
    const handlePageUnload = () => {
      const duration = Date.now() - startTime;
      trackPageDuration(page, duration);
    };

    // Track clicks
    const handleClick = (e: MouseEvent) => {
      const element = (e.target as HTMLElement).tagName.toLowerCase();
      const className = (e.target as HTMLElement).className;
      const id = (e.target as HTMLElement).id;
      const description = id ? `#${id}` : className ? `.${className.split(' ')[0]}` : element;
      trackClick(description, page);
    };

    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = (window.scrollY / scrollHeight) * 100;
      if (currentScroll > maxScroll) {
        maxScroll = currentScroll;
        trackScroll(Math.round(maxScroll), page);
      }
    };

    window.addEventListener("beforeunload", handlePageUnload);
    document.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("beforeunload", handlePageUnload);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      handlePageUnload();
    };
  }, [page, trackPageView, trackPageDuration, trackClick, trackScroll]);

  return null;
}
