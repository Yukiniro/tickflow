import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from '@/components/nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "TickFlow - 优雅的时钟应用",
  description: "一个基于 Next.js 和 Tailwind CSS 的优雅时钟应用",
  keywords: "online clock, real-time clock, digital clock, current time, time display, world clock",
  openGraph: {
    title: "TickFlow - 优雅的时钟应用",
    description: "一个基于 Next.js 和 Tailwind CSS 的优雅时钟应用",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TickFlow - 优雅的时钟应用",
    description: "一个基于 Next.js 和 Tailwind CSS 的优雅时钟应用",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <Nav />
            <main className="pt-14">{children}</main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
