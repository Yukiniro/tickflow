"use client";

import { ComicClock } from "@/components/clock/comic-clock";
import { BackgroundImage } from "@/components/background-image";
import { FullscreenContainer } from "@/components/fullscreen-container";

export default function ComicClockPage() {
  return (
    <>
      <FullscreenContainer className="pt-14">
        <BackgroundImage />
        <ComicClock />
      </FullscreenContainer>
    </>
  );
}
