"use client";

import { DigitalWatch } from "@/components/clock/digital-watch";
import { BackgroundImage } from "@/components/background-image";
import { FullscreenContainer } from "@/components/fullscreen-container";

export default function DigitalWatchPage() {
  return (
    <>
      <BackgroundImage />
      <FullscreenContainer className="pt-14">
        <DigitalWatch />
      </FullscreenContainer>
    </>
  );
}
