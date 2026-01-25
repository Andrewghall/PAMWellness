import type { Metadata } from "next";
import { DM_Serif_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import MobileHeader from "./components/MobileHeader";

const displayFont = DM_Serif_Display({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PAM Wellness · DREAM Discovery & Reimagine Output",
  description:
    "Structured synthesis of the PAM Wellness DREAM session including discovery insights, reimagined care journeys, operating model design, and CareCore platform vision.",
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { href: "/discovery-summary", label: "Discovery summary" },
    { href: "/reimagine-output", label: "Reimagine output" },
    { href: "/constraints", label: "Constraints" },
    { href: "/solution-overview", label: "Solution overview" },
    { href: "/executive", label: "Executive dashboard" },
    { href: "/commercial-estimates", label: "Commercial estimates" },
    { href: "/summary", label: "Summary" },
    { href: "/journey", label: "Journey mapping" },
  ];

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ethenta_dots_transparent.png" sizes="any" />
        <link rel="icon" href="/ethenta_dots_transparent.png" type="image/png" />
        <link rel="apple-touch-icon" href="/ethenta_dots_transparent.png" />
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
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
      </body>
    </html>
  );
}
