import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "./provider";

import dynamic from "next/dynamic";

const TerminalOverlay = dynamic(() => import("@/components/TerminalOverlay"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Hussein's Portfolio",
  description: "Modern & Minimal Web Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <TerminalOverlay />
        </ThemeProvider>
      </body>
    </html>
  );
}
