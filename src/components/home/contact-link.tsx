"use client";

import { useTranslations } from "next-intl";

interface ContactLinkProps {
  type: "twitter" | "email" | "github";
  href: string;
  icon: React.ReactNode;
  isExternal?: boolean;
}

export function ContactLink({ type, href, icon, isExternal = false }: ContactLinkProps) {
  const t = useTranslations("home");

  const linkProps = isExternal
    ? {
        target: "_blank" as const,
        rel: "noopener noreferrer" as const,
      }
    : {};

  return (
    <li className="text-muted-foreground hover:text-foreground transition-colors">
      <a href={href} className="flex items-center gap-2" {...linkProps}>
        {icon}
        {t(`footer.${type}`)}
      </a>
    </li>
  );
}
