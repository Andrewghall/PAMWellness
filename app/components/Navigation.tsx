"use client";

import { useAdmin } from "./AdminContext";
import AnalyticsTracker from "./AnalyticsTracker";
import MobileHeader from "./MobileHeader";

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
      <header className="sticky top-0 z-20 border-b border-black/10 bg-white/70 backdrop-blur-lg">
        <div className="flex w-full items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-4">
            <img
              src="/pam-wellness-logo.png"
              alt="PAM Wellness"
              className="h-10 w-auto"
            />
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-black/50">CARECORE</p>
              <p className="text-[10px] text-black/40">AI-Enabled Wellness Platform</p>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-black/70 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Menu */}
          <MobileHeader />
        </div>
      </header>
      {children}
    </>
  );
}
