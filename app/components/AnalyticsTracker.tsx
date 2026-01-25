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
      const target = e.target as HTMLElement;
      const element = target.tagName.toLowerCase();
      const className = target.className;
      const id = target.id;
      const text = target.innerText?.trim().substring(0, 50);
      const href = (target as HTMLAnchorElement).href;
      const alt = target.getAttribute('alt');
      
      // Create human-readable description
      let description = "";
      
      if (text && text.length > 0) {
        description = `"${text}"`;
      } else if (alt && alt.length > 0) {
        description = `Image: ${alt}`;
      } else if (href) {
        const linkText = new URL(href).pathname;
        description = `Link to ${linkText}`;
      } else if (id) {
        description = `#${id}`;
      } else if (className) {
        const firstClass = className.split(' ')[0];
        description = `${element}.${firstClass}`;
      } else {
        description = element;
      }
      
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
