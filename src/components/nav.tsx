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
    pathname.includes("/led") ||
    pathname.includes("/binary") ||
    pathname.includes("/nixie") ||
    pathname.includes("/shichen")
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
  const { is24Hour, toggleTimeFormat, mounted, seconds } = useTime();

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
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background">
      <div className="container flex h-14 items-center">
        <div className="mr-8 flex">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="h-3.5 w-3.5 bg-rail transition-transform duration-75 group-hover:scale-110" />
            <span className="text-lg font-extrabold uppercase tracking-tight text-foreground">TickFlow</span>
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

      {/* 秒进度线:每分钟从 0 推进到满,呼应站台时钟的滴答(全站签名) */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px bg-rail"
        style={{
          width: `${((seconds + 1) / 60) * 100}%`,
          transition: seconds === 0 ? "none" : "width 1s linear",
        }}
      />
    </nav>
  );
}
