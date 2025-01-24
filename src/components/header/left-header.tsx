"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";

function HeaderLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  const { theme } = useTheme();
  return (
    <Link href={href}>
      <span
        className={cn(
          "font-medium hover:underline",
          theme === "dark" ? "text-white" : "text-black",
          active ? "underline" : "",
        )}
      >
        {children}
      </span>
    </Link>
  );
}

export default function LeftHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <div className="flex items-center gap-2">
      <HeaderLink href="/" active={isActive("/")}>
        Normal
      </HeaderLink>
      <Separator className="w-[1px] h-[18px] bg-black dark:bg-white" orientation="vertical" />
      <HeaderLink href="/clip" active={isActive("/clip")}>
        Clip
      </HeaderLink>
    </div>
  );
}
