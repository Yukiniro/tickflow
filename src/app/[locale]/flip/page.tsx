import { BackgroundImage } from "@/components/background-image";
import { FlipClock } from "@/components/clock/flip-clock";

export default async function FlipClockPage() {
  return (
    <>
      <BackgroundImage />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <FlipClock />
      </div>
    </>
  );
}
