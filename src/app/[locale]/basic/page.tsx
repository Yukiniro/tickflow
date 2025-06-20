import { BasicClock } from "@/components/clock/basic-clock";
import { BackgroundImage } from "@/components/background-image";
import { FullscreenContainer } from "@/components/fullscreen-container";

export default function BasicClockPage() {
  return (
    <>
      <FullscreenContainer>
        <BackgroundImage />
        <BasicClock />
      </FullscreenContainer>
    </>
  );
}
