"use client";

import { DigitalWatch } from "@/components/clock/digital-watch";
import { BackgroundImage } from "@/components/background-image";

export default function DigitalWatchPage() {
  return (
    <>
      <BackgroundImage />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <DigitalWatch />
      </div>
    </>
  );
}
