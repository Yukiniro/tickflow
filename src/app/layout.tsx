import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tickflow.vercel.app"),
  title: "TickFlow",
  description: "一个优雅的时钟应用",
  keywords: "online clock, real-time clock, digital clock, current time, time display, world clock",
  // icons: {
  //   icon: [{ url: "/favicon.ico" }, { url: "/logo.png", type: "image/png" }],
  //   apple: [{ url: "/logo.png", type: "image/png" }],
  // },
  openGraph: {
    title: "TickFlow - 优雅的时钟应用",
    description: "一个基于 Next.js 和 Tailwind CSS 的优雅时钟应用",
    type: "website",
    url: "https://tickflow.vercel.app",
    siteName: "TickFlow",
    locale: "zh_CN",
    images: [
      {
        url: "/logo.png",
        width: 810,
        height: 810,
        alt: "TickFlow Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TickFlow - 优雅的时钟应用",
    description: "一个基于 Next.js 和 Tailwind CSS 的优雅时钟应用",
    creator: "@tickflow",
    site: "@tickflow",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://tickflow.vercel.app",
    languages: {
      "zh-CN": "https://tickflow.vercel.app/zh-CN",
      "en-US": "https://tickflow.vercel.app/en-US",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="relative min-h-screen">
              <Nav />
              <main className="container flex min-h-screen flex-col items-center justify-center">{children}</main>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
