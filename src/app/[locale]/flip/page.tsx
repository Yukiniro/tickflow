import { BackgroundImage } from "@/components/background-image";
import { FlipClock } from "@/components/clock/flip-clock";
import { FullscreenContainer } from "@/components/fullscreen-container";

export default async function FlipClockPage() {
  return (
    <>
      <FullscreenContainer>
        <BackgroundImage />
        <FlipClock />
      </FullscreenContainer>
    </>
  );
}
