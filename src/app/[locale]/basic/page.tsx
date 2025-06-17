"use client";

import { BasicClock } from "@/components/clock/basic-clock";
import { BackgroundImage } from "@/components/background-image";

export default function BasicClockPage() {
  return (
    <>
      <BackgroundImage />
      <div className="flex w-screen h-screen flex-col items-center justify-center">
        <BasicClock />
      </div>
    </>
  );
}
