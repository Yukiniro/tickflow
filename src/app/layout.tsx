import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "quill/dist/quill.core.css";

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
