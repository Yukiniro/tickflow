"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { GithubLink } from "./github-link";
import { TimeFormatToggle } from "./time-format-toggle";
import { SoundToggle } from "./sound-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { useTime } from "@/hooks/use-time";
import Image from "next/image";

const routes = [
  {
    key: "basic",
    path: "/basic",
  },
  // {
  //   name: "翻页时钟",
  //   path: "/flip",
  // },
  {
    key: "digital",
    path: "/digital",
  },
  {
    key: "comic",
    path: "/comic",
  },
] as const;

export function Nav() {
  const pathname = usePathname();
  const { is24Hour, toggleTimeFormat, mounted } = useTime();
  const t = useTranslations("navigation");

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-8 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="TickFlow Logo" width={24} height={24} className="rounded-sm" />
            <span className="text-lg font-semibold tracking-tight">TickFlow</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-6 mr-6">
            {routes.map(route => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.path ? "text-primary" : "text-muted-foreground",
                )}
              >
                {t(route.key)}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <TimeFormatToggle is24Hour={is24Hour} onToggle={toggleTimeFormat} />
            <SoundToggle />
            <ThemeToggle />
            <GithubLink />
          </div>
        </div>
      </div>
    </nav>
  );
}
