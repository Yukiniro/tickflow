"use client";

import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./theme-toggle";
import { TimeFormatToggle } from "./time-format-toggle";
import { SoundToggle } from "./sound-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { ClockTypeSelector } from "./clock-type-selector";
import { BackgroundToggle } from "./background-toggle";
import { useTime } from "@/hooks/use-time";
import Image from "next/image";

interface NavProps {
  showClockTypeSelector?: boolean;
  showLanguageSwitcher?: boolean;
  showTimeFormatToggle?: boolean;
  showSoundToggle?: boolean;
  showThemeToggle?: boolean;
  showGithubLink?: boolean;
  showBackgroundToggle?: boolean;
}

export function Nav({
  showClockTypeSelector = false,
  showLanguageSwitcher = false,
  showTimeFormatToggle = false,
  showSoundToggle = false,
  showThemeToggle = false,
  showGithubLink = false,
  showBackgroundToggle = false,
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
    showGithubLink ||
    showBackgroundToggle;

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
              {showLanguageSwitcher && <LanguageSwitcher />}
              {showTimeFormatToggle && <TimeFormatToggle is24Hour={is24Hour} onToggle={toggleTimeFormat} />}
              {showSoundToggle && <SoundToggle />}
              {showThemeToggle && <ThemeToggle />}
              {showGithubLink && (
                <a
                  href="https://github.com/Yukiniro/tickflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                  title="View on GitHub"
                >
                  <svg className="h-[1.2rem] w-[1.2rem]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
