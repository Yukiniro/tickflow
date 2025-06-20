import { DigitalWatch } from "@/components/clock/digital-watch";
import { BackgroundImage } from "@/components/background-image";
import { FullscreenContainer } from "@/components/fullscreen-container";

export default function DigitalWatchPage() {
  return (
    <>
      <FullscreenContainer>
        <BackgroundImage />
        <DigitalWatch />
      </FullscreenContainer>
    </>
  );
}
