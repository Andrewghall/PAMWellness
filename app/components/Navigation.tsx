"use client";

import { useAdmin } from "./AdminContext";
import AnalyticsTracker from "./AnalyticsTracker";
import MobileHeader from "./MobileHeader";
import SmoothScroll from "./SmoothScroll";

export default function Navigation({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAdmin();
  
  const navItems = [
    { href: "/discovery-summary", label: "Discovery summary" },
    { href: "/reimagine-output", label: "Reimagine output" },
    { href: "/constraints", label: "Constraints" },
    { href: "/solution-overview", label: "Solution overview" },
    { href: "/executive", label: "Executive dashboard" },
    { href: "/commercial-estimates", label: "Commercial estimates" },
    { href: "/summary", label: "Summary" },
    { href: "/journey", label: "Journey mapping" },
    ...(isAdmin ? [{ href: "/admin", label: "Admin Dashboard" }] : []),
  ];

  return (
    <>
      <AnalyticsTracker page={typeof window !== 'undefined' ? window.location.pathname : '/'} />
      <SmoothScroll />
      <header className="sticky top-0 z-20 border-b border-black/10 bg-white/70 backdrop-blur-lg">
        <div className="flex w-full items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <a href="/" className="flex items-center gap-4 flex-shrink-0">
            <img
              src="/pam-wellness-logo.png"
              alt="PAM Wellness"
              className="h-8 w-auto md:h-10"
            />
            <div className="hidden md:block">
              <p className="text-sm uppercase tracking-[0.3em] text-black/50">CARECORE</p>
              <p className="text-[10px] text-black/40">AI-Enabled Wellness Platform</p>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:flex-1 lg:justify-center lg:items-center lg:gap-8">
            <div className="flex items-center gap-8 text-sm font-medium text-black/70">
              {navItems.map((item) => (
                <a 
                  key={item.href} 
                  href={item.href}
                  className="relative py-2 px-3 rounded-lg transition-all duration-200 hover:bg-black/5 hover:text-black hover:font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Mobile Hamburger Menu */}
          <div className="flex-shrink-0">
            <MobileHeader />
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
