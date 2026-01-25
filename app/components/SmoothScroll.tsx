"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"], a[href*="#"]');
      
      if (link) {
        const href = link.getAttribute('href');
        if (href && href.includes('#')) {
          const hashPart = href.split('#')[1];
          if (hashPart) {
            // Check if it's a same-page link or cross-page link
            if (href.startsWith('#')) {
              // Same-page anchor link
              e.preventDefault();
              const targetElement = document.querySelector(`#${hashPart}`);
              if (targetElement) {
                targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            } else {
              // Cross-page link - let it navigate normally, but scroll after page load
              // The scroll will be handled by the page load effect below
            }
          }
        }
      }
    };

    // Handle initial page load with hash
    const handlePageLoad = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 100); // Small delay to ensure page is fully loaded
        }
      }
    };

    // Handle click events for anchor links
    document.addEventListener('click', handleSmoothScroll);
    
    // Handle initial page load
    handlePageLoad();
    
    // Also handle hash changes
    window.addEventListener('hashchange', handlePageLoad);
    
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      window.removeEventListener('hashchange', handlePageLoad);
    };
  }, []);

  return null;
}
