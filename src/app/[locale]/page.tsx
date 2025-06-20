import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams() {
  return ["en", "zh", "ja"].map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("home");

  return {
    title: t("title"),
    description: t("subtitle"),
    keywords:
      locale === "zh"
        ? "在线时钟, 模拟时钟, 数字时钟, 多时区, 网页时钟, 时间显示"
        : locale === "ja"
        ? "オンライン時計, アナログ時計, デジタル時計, 複数タイムゾーン, ウェブ時計, 時間表示"
        : "online clock, analog clock, digital clock, multiple timezones, web clock, time display",
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <div className="min-h-screen flex flex-col pt-14 bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-background/80 to-muted/30 dark:from-background dark:via-background/90 dark:to-muted/20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold py-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">{t("subtitle")}</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/basic"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">{t("features.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl border border-border bg-card hover:bg-accent/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-card-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {t("features.analog.title")}
              </h3>
              <p className="text-muted-foreground text-center leading-relaxed">{t("features.analog.description")}</p>
            </div>

            <div className="group p-8 rounded-2xl border border-border bg-card hover:bg-accent/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="12" rx="1" />
                  <line x1="7" y1="8" x2="7" y2="12" />
                  <line x1="11" y1="8" x2="11" y2="12" />
                  <line x1="15" y1="8" x2="17" y2="12" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-card-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {t("features.digital.title")}
              </h3>
              <p className="text-muted-foreground text-center leading-relaxed">{t("features.digital.description")}</p>
            </div>

            <div className="group p-8 rounded-2xl border border-border bg-card hover:bg-accent/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-card-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {t("features.timezone.title")}
              </h3>
              <p className="text-muted-foreground text-center leading-relaxed">{t("features.timezone.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">{t("cta.title")}</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{t("cta.description")}</p>
          <Link
            href="/basic"
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>

      {/* Footer */}
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
                <li className="text-muted-foreground hover:text-foreground transition-colors">
                  <a href="mailto:contact@tickflow.com" className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    {t("footer.email")}
                  </a>
                </li>
                <li className="text-muted-foreground hover:text-foreground transition-colors">
                  <a
                    href="https://github.com/tickflow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    {t("footer.github")}
                  </a>
                </li>
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
    </div>
  );
}
