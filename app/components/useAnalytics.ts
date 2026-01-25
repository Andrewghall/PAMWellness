"use client";

import { useEffect, useState } from "react";

interface PageView {
  page: string;
  timestamp: number;
  duration?: number;
  userId: string;
}

interface ClickEvent {
  element: string;
  timestamp: number;
  userId: string;
  page: string;
}

interface ScrollEvent {
  maxScroll: number;
  timestamp: number;
  userId: string;
  page: string;
}

export function useAnalytics() {
  const [userId] = useState(() => {
    let id = sessionStorage.getItem("analytics_user_id");
    if (!id) {
      id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("analytics_user_id", id);
    }
    return id;
  });

  const trackPageView = (page: string) => {
    const view: PageView = {
      page,
      timestamp: Date.now(),
      userId,
    };
    
    const views = JSON.parse(localStorage.getItem("page_views") || "[]");
    views.push(view);
    localStorage.setItem("page_views", JSON.stringify(views));
  };

  const trackPageDuration = (page: string, duration: number) => {
    const views = JSON.parse(localStorage.getItem("page_views") || "[]");
    const lastView = views[views.length - 1];
    if (lastView && lastView.page === page && lastView.userId === userId) {
      lastView.duration = duration;
      localStorage.setItem("page_views", JSON.stringify(views));
    }
  };

  const trackClick = (element: string, page: string) => {
    const click: ClickEvent = {
      element,
      timestamp: Date.now(),
      userId,
      page,
    };
    
    const clicks = JSON.parse(localStorage.getItem("click_events") || "[]");
    clicks.push(click);
    localStorage.setItem("click_events", JSON.stringify(clicks));
  };

  const trackScroll = (maxScroll: number, page: string) => {
    const scroll: ScrollEvent = {
      maxScroll,
      timestamp: Date.now(),
      userId,
      page,
    };
    
    const scrolls = JSON.parse(localStorage.getItem("scroll_events") || "[]");
    scrolls.push(scroll);
    localStorage.setItem("scroll_events", JSON.stringify(scrolls));
  };

  return {
    userId,
    trackPageView,
    trackPageDuration,
    trackClick,
    trackScroll,
  };
}
