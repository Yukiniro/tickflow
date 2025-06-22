"use client";

import { useTranslations } from "next-intl";
import { ContactLink } from "./contact-link";
import { CONTACT_LINKS } from "./constants";
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
    <footer className="mt-auto py-12 px-4 bg-muted/20 dark:bg-muted/10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold mb-4 text-lg text-foreground">{t("footer.about.title")}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{t("footer.about.description")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg text-foreground">{t("footer.quickLinks.title")}</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(link => (
                <li key={link.key}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {t(`footer.quickLinks.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-lg text-foreground">{t("footer.contact")}</h3>
            <ul className="space-y-3 text-sm">
              {CONTACT_LINKS.map(link => (
                <ContactLink key={link.type} {...link} />
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TickFlow. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
