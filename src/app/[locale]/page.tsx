import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams() {
  return ["en", "zh", "ja"].map(locale => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
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
  const common = await getTranslations("common");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t("subtitle")}</p>
          <div className="flex gap-4 justify-center">
            <Link href="/clock" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t("features.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">{t("features.analog.title")}</h3>
              <p className="text-gray-600">{t("features.analog.description")}</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">{t("features.digital.title")}</h3>
              <p className="text-gray-600">{t("features.digital.description")}</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">{t("features.timezone.title")}</h3>
              <p className="text-gray-600">{t("features.timezone.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t("cta.title")}</h2>
          <p className="text-xl text-gray-600 mb-8">{t("cta.description")}</p>
          <Link
            href="/clock"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 px-4 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between gap-8">
            {/* About */}
            <div className="w-96">
              <h3 className="font-semibold mb-4">{t("footer.about.title")}</h3>
              <p className="text-gray-600 text-sm">{t("footer.about.description")}</p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">{t("footer.contact")}</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-600">{t("footer.email")}</li>
                <li className="text-gray-600">{t("footer.github")}</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            <p>
              © {new Date().getFullYear()} TickFlow. {t("footer.copyright")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
