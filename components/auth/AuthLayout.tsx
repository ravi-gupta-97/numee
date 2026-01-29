"use client";

import { useId } from "react";
import Link from "next/link";
import { NetworkGraph } from "./NetworkGraph";
import { NuMeeLogo } from "./NuMeeLogo";

const logoTextClassName =
  "font-bold bg-gradient-to-r from-blue-500 to-amber-500 bg-clip-text text-transparent";

export function AuthLayout({
  children,
  rightPanelOverflow,
}: {
  children: React.ReactNode;
  rightPanelOverflow?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const nodeGradientId = `node-${id}`;
  const logoGradientId = `logo-${id}`;

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0f5c5c] overflow-hidden">
        <NetworkGraph gradientId={nodeGradientId} />
        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14">
          <div>
            <NuMeeLogo gradientId={logoGradientId} size="md" href="/" />
          </div>
          <div className="space-y-4 max-w-md">
            <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight">
              Secure & Scalable Mentorship Management
            </h1>
            <p className="text-white/90 text-base leading-relaxed">
              Orchestrate thousands of mentorship connections with our AI-powered engine. Enterprise-grade
              security keeps your data safe.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 bg-white/5 w-fit">
            <svg className="w-5 h-5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-sm font-medium text-white">Protected by Enterprise Shield</span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div
        className={`w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-white ${rightPanelOverflow ? "overflow-y-auto" : ""}`}
      >
        <div className="w-full max-w-md space-y-6 py-4">
          <div className="lg:hidden mb-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className={`text-xl ${logoTextClassName}`}>NuMee</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
