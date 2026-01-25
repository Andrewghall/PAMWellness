'use client';

import { useState } from 'react';
import { useAdmin } from './AdminContext';

export default function MobileHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin } = useAdmin();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
      {/* Mobile Hamburger Menu */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden flex flex-col justify-center items-center w-6 h-6 gap-1"
        aria-label="Toggle mobile menu"
      >
        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-black/10">
          <nav className="flex flex-col px-6 py-4 gap-4 text-sm font-medium text-black/70">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
