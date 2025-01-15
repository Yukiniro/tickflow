"use client";

import { Clock } from "@/components/clock";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <Clock />
    </div>
  );
}
