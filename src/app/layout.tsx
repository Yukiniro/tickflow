import type { Metadata } from "next";
import Header from "@/components/header/";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real-Time Clock - Precise Time Display",
  description:
    "A clean and elegant online clock application that displays accurate current time in real-time. Features multiple time formats and a clear, intuitive interface.",
  keywords: "online clock, real-time clock, digital clock, current time, time display, world clock",
  openGraph: {
    title: "Real-Time Clock - Precise Time Display",
    description: "A clean and elegant online clock application that displays accurate time in real-time.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real-Time Clock - Precise Time Display",
    description: "A clean and elegant online clock application that displays accurate time in real-time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Analytics />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="w-screen h-screen overflow-hidden font-[family-name:var(--font-geist-sans)]">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
