import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SessionProviderWrapper from "./components/SessionProviderWrapper";
import "./globals.css";
import "highlight.js/styles/github.css";

export const metadata: Metadata = {
  title: "Scheduling Assistant",
  description: "Family scheduling coordination app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
