"use client";

import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./theme-toggle";
import { TimeFormatToggle } from "./time-format-toggle";
import { SoundToggle } from "./sound-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { ClockTypeSelector } from "./clock-type-selector";
import { BackgroundToggle } from "./background-toggle";
import { ShareButton } from "./share-button";
import { FullscreenToggle } from "./fullscreen-toggle";
import { useTime } from "@/hooks/use-time";
import Image from "next/image";

interface NavProps {
  showClockTypeSelector?: boolean;
  showLanguageSwitcher?: boolean;
  showTimeFormatToggle?: boolean;
  showSoundToggle?: boolean;
  showThemeToggle?: boolean;
  showBackgroundToggle?: boolean;
  showShareButton?: boolean;
  showFullscreenToggle?: boolean;
}

export function Nav({
  showClockTypeSelector = false,
  showLanguageSwitcher = false,
  showTimeFormatToggle = false,
  showSoundToggle = false,
  showThemeToggle = false,
  showBackgroundToggle = false,
  showShareButton = false,
  showFullscreenToggle = false,
}: NavProps = {}) {
  const { is24Hour, toggleTimeFormat, mounted } = useTime();

  if (!mounted) {
    return null;
  }

  const hasLeftControls = showClockTypeSelector;
  const hasRightControls =
    showLanguageSwitcher ||
    showTimeFormatToggle ||
    showSoundToggle ||
    showThemeToggle ||
    showBackgroundToggle ||
    showShareButton ||
    showFullscreenToggle;

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-8 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="TickFlow Logo" width={24} height={24} className="rounded-sm" />
            <span className="text-lg font-semibold tracking-tight">TickFlow</span>
          </Link>
        </div>

        {hasRightControls && (
          <div
            className={`flex flex-1 items-center ${
              hasLeftControls ? "justify-between" : "justify-end"
            } space-x-2 md:justify-end`}
          >
            <div className="flex items-center space-x-2">
              {hasLeftControls && showClockTypeSelector && <ClockTypeSelector />}
              {showBackgroundToggle && <BackgroundToggle />}
              {showShareButton && <ShareButton />}
              {showFullscreenToggle && <FullscreenToggle />}
              {showLanguageSwitcher && <LanguageSwitcher />}
              {showTimeFormatToggle && <TimeFormatToggle is24Hour={is24Hour} onToggle={toggleTimeFormat} />}
              {showSoundToggle && <SoundToggle />}
              {showThemeToggle && <ThemeToggle />}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
