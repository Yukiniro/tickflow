"use client";

import { ComicClock } from "@/components/clock/comic-clock";
import { BackgroundImage } from "@/components/background-image";

export default function ComicClockPage() {
  return (
    <>
      <BackgroundImage />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <ComicClock />
      </div>
    </>
  );
}
