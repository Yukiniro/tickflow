"use client";

import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { soundEnabledAtom } from "@/store/sound";

export function SoundToggle() {
  const [soundEnabled, setSoundEnabled] = useAtom(soundEnabledAtom);

  return (
    <Button variant="ghost" size="icon" onClick={() => setSoundEnabled(!soundEnabled)} className="h-9 w-9">
      {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      <span className="sr-only">切换秒针提示音</span>
    </Button>
  );
}
