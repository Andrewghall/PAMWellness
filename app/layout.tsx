import type { Metadata } from "next";
import { DM_Serif_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import AuthGate from "./components/AuthGate";
import { AdminProvider } from "./components/AdminContext";
import Navigation from "./components/Navigation";

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
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ethenta_dots_transparent.png" sizes="any" />
        <link rel="icon" href="/ethenta_dots_transparent.png" type="image/png" />
        <link rel="apple-touch-icon" href="/ethenta_dots_transparent.png" />
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        <AdminProvider>
          <AuthGate>
            <Navigation>
              {children}
            </Navigation>
          </AuthGate>
        </AdminProvider>
      </body>
    </html>
  );
}
