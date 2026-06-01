"use client";

import { useTranslations } from "next-intl";
import { ContactLink } from "./contact-link";
import { CONTACT_LINKS } from "./constants";
import { LiveTime } from "./live-time";
import Link from "next/link";

export function Footer() {
  const t = useTranslations("home");

  const quickLinks = [
    { key: "basic", href: "/basic" },
    { key: "flip", href: "/flip" },
    { key: "digital", href: "/digital" },
    { key: "comic", href: "/comic" },
    { key: "analog", href: "/analog" },
    { key: "led", href: "/led" },
  ];

  return (
    <footer className="mt-auto bg-background">
      {/* 顶部:品牌 + 实时时间(发车牌) */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-b-2 border-foreground px-6 py-6">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 bg-rail" />
          <span className="text-xl font-extrabold uppercase tracking-tight text-foreground">TickFlow</span>
        </div>
        <LiveTime className="text-2xl text-foreground" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
              {t("footer.about.title")}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{t("footer.about.description")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
              {t("footer.quickLinks.title")}
            </h3>
            <ul className="space-y-1">
              {quickLinks.map((link, i) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 py-1 text-sm text-foreground transition-colors duration-75 hover:text-rail"
                  >
                    <span className="font-mono text-xs tabular-nums text-muted-foreground group-hover:text-rail">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t(`footer.quickLinks.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3 text-sm">
              {CONTACT_LINKS.map(link => (
                <ContactLink key={link.type} {...link} />
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} TickFlow · {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
