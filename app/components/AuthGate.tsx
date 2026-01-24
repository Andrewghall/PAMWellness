"use client";

import { useState, useEffect } from "react";

const ACCESS_CODE = "PAMWELLNESS2026";
const AUTH_KEY = "carecore_authenticated";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if already authenticated in session storage
    const isAuth = sessionStorage.getItem(AUTH_KEY) === "true";
    setIsAuthenticated(isAuth);
  }, []);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (codeInput === ACCESS_CODE) {
      sessionStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid access code");
    }
  };

  // Show nothing while checking auth status
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/20 border-t-black/70" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-10">
        <div className="w-full max-w-md">
          <div className="rounded-[32px] border border-black/10 bg-white/80 p-8 text-center shadow-xl backdrop-blur-lg">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200">
              <span className="text-4xl">🔐</span>
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-black">PAM Wellness</h1>
            <p className="mt-1 text-sm text-black/50">CARECORE Platform</p>
            <p className="mt-4 text-sm text-black/60">
              This platform contains confidential information. Please enter your access code to continue.
            </p>
            <form onSubmit={handleCodeSubmit} className="mt-6">
              <input
                type="password"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Enter access code"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-center text-lg tracking-widest outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
              <button
                type="submit"
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:from-amber-600 hover:to-amber-700"
              >
                Access Platform
              </button>
            </form>
            <p className="mt-6 text-xs text-black/40">
              Contact your administrator if you need access credentials.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
