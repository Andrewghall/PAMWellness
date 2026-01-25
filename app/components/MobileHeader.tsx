'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';

export default function MobileHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin } = useAdmin();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu-container')) {
        closeMobileMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

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
        <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-white shadow-lg border-b border-black/10 mobile-menu-container">
          <div className="max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-black/10">
              <h2 className="text-lg font-semibold text-black">Navigation</h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-black/5 transition-colors"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-1">
              {navItems.map((item) => (
                <a 
                  key={item.href} 
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="py-3 px-4 rounded-lg transition-all duration-200 hover:bg-black/5 hover:text-black font-medium text-black/70"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
