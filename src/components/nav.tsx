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
import { GithubIcon } from "./github-icon";
import { useTime } from "@/hooks/use-time";
import { usePathname } from "next/navigation";
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
  showGithub?: boolean;
}

// 根据路径获取 Nav 属性的函数
const getNavProps = (pathname: string) => {
  // 首页路径
  if (pathname === "/" || pathname === "/zh" || pathname === "/en" || pathname === "/ja") {
    return {
      showLanguageSwitcher: true,
      showThemeToggle: true,
      showShareButton: true,
      showGithub: true,
    };
  }

  // 时钟页面路径
  if (
    pathname.includes("/basic") ||
    pathname.includes("/digital") ||
    pathname.includes("/comic") ||
    pathname.includes("/flip") ||
    pathname.includes("/analog") ||
    pathname.includes("/led")
  ) {
    return {
      showClockTypeSelector: true,
      showLanguageSwitcher: true,
      showTimeFormatToggle: true,
      showSoundToggle: true,
      showThemeToggle: true,
      showBackgroundToggle: true,
      showShareButton: true,
      showFullscreenToggle: true,
      showGithub: true,
    };
  }

  // 默认属性
  return {
    showLanguageSwitcher: true,
    showThemeToggle: true,
    showGithub: true,
  };
};

export function Nav(props: NavProps = {}) {
  const pathname = usePathname();
  const { is24Hour, toggleTimeFormat, mounted } = useTime();

  // 根据路径获取动态属性
  const dynamicProps = getNavProps(pathname);

  // 合并传入的 props 和动态属性，传入的 props 优先级更高
  const {
    showClockTypeSelector = dynamicProps.showClockTypeSelector || false,
    showLanguageSwitcher = dynamicProps.showLanguageSwitcher || false,
    showTimeFormatToggle = dynamicProps.showTimeFormatToggle || false,
    showSoundToggle = dynamicProps.showSoundToggle || false,
    showThemeToggle = dynamicProps.showThemeToggle || false,
    showBackgroundToggle = dynamicProps.showBackgroundToggle || false,
    showShareButton = dynamicProps.showShareButton || false,
    showFullscreenToggle = dynamicProps.showFullscreenToggle || false,
    showGithub = dynamicProps.showGithub || false,
  } = props;

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
    showFullscreenToggle ||
    showGithub;

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
              {showFullscreenToggle && <FullscreenToggle />}
              {showTimeFormatToggle && <TimeFormatToggle is24Hour={is24Hour} onToggle={toggleTimeFormat} />}
              {showSoundToggle && <SoundToggle />}
              {showLanguageSwitcher && <LanguageSwitcher />}
              {showShareButton && <ShareButton />}
              {showThemeToggle && <ThemeToggle />}
              {showGithub && <GithubIcon />}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
