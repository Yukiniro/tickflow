"use client";

import { FlipClock } from "./flip-clock";
import { BackgroundImage } from "@/components/background-image";

export function FlipClockClient() {
  return (
    <>
      <BackgroundImage />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <FlipClock />
      </div>
    </>
  );
}
