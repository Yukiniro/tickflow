"use client";

import { useTranslations } from "next-intl";
import { ContactLink } from "./contact-link";
import { CONTACT_LINKS } from "./constants";

export function Footer() {
  const t = useTranslations("home");

  return (
    <footer className="mt-auto py-12 px-4 bg-muted/20 dark:bg-muted/10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between gap-8">
          {/* About */}
          <div className="w-96">
            <h3 className="font-semibold mb-4 text-lg text-foreground">{t("footer.about.title")}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{t("footer.about.description")}</p>
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
