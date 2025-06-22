"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Clock } from "lucide-react";

const clockTypes = [
  {
    key: "basic",
    path: "/basic",
  },
  {
    key: "flip",
    path: "/flip",
  },
  {
    key: "digital",
    path: "/digital",
  },
  {
    key: "comic",
    path: "/comic",
  },
  {
    key: "analog",
    path: "/analog",
  },
  {
    key: "led",
    path: "/led",
  },
] as const;

export function ClockTypeSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("navigation");

  const currentClockType = clockTypes.find(type => type.path === pathname);

  const handleClockTypeChange = (path: string) => {
    router.push(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Clock className="h-4 w-4" />
          <span className="hidden sm:inline">{currentClockType ? t(currentClockType.key) : t("basic")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {clockTypes.map(type => (
          <DropdownMenuItem
            key={type.path}
            onClick={() => handleClockTypeChange(type.path)}
            className={pathname === type.path ? "bg-accent" : ""}
          >
            {t(type.key)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
