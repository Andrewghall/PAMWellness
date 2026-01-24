import type { Metadata } from "next";
import { DM_Serif_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import AuthGate from "./components/AuthGate";

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
  title: "CARECORE · AI-Enabled Wellness System Demo",
  description:
    "A strategic demonstration app showing Discovery insights, OHIO blockers, AI-enabled capabilities, and regulatory guardrails for PAM Wellness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        <AuthGate>
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
              <nav className="hidden items-center gap-6 text-sm font-medium text-black/70 lg:flex">
                <a href="/discovery-summary">Discovery summary</a>
                <a href="/reimagine-output">Reimagine output</a>
                <a href="/constraints">Constraints</a>
                <a href="/solution-overview">Solution overview</a>
                <a href="/executive">Executive dashboard</a>
                <a href="/commercial-estimates">Commercial estimates</a>
                <a href="/summary">Summary</a>
                <a href="/journey">Journey mapping</a>
              </nav>
            </div>
          </header>
          {children}
        </AuthGate>
      </body>
    </html>
  );
}
