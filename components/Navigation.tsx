"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navigation() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { href: "/", label: { ko: "Works", en: "Works" } },
    { href: "/archive", label: { ko: "Archive", en: "Archive" } },
    { href: "/article", label: { ko: "Article", en: "Article" } },
    { href: "/about", label: { ko: "About", en: "About" } },
  ];

  return (
    <nav className="border-b-1px border-editorial-border">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-[1fr_auto] items-center">
          {/* Logo */}
          <div className="border-r-1px border-editorial-border p-4 md:p-6">
            <Link href="/" className="block">
              <div className="flex items-baseline gap-2">
                <h1 className="text-xl md:text-2xl font-medium tracking-tight">
                  {t("디지털 아카이브", "Digital Archive")}
                </h1>
                <span className="text-xs text-editorial-gray">
                  {t("편집 디자인 포트폴리오", "Editorial Design Portfolio")}
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation & Language Toggle */}
          <div className="flex items-stretch">
            {/* Nav Items */}
            <div className="hidden md:flex items-stretch">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-6 py-4 text-sm uppercase tracking-wider
                    transition-colors duration-200
                    hover:bg-editorial-text hover:text-editorial-bg
                    ${pathname === item.href ? 'bg-editorial-text text-editorial-bg' : ''}
                    ${index < navItems.length - 1 ? 'border-r-1px border-editorial-border' : ''}
                  `}
                >
                  {language === 'ko' ? item.label.ko : item.label.en}
                </Link>
              ))}
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
              className="px-4 md:px-6 py-4 border-l-1px border-editorial-border text-xs uppercase tracking-wider hover:bg-editorial-text hover:text-editorial-bg transition-colors duration-200"
              aria-label="Toggle language"
            >
              {language === 'ko' ? 'EN' : 'KO'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden grid grid-cols-4 border-t-1px border-editorial-border">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                px-3 py-3 text-xs text-center uppercase tracking-wider
                transition-colors duration-200
                hover:bg-editorial-text hover:text-editorial-bg
                ${pathname === item.href ? 'bg-editorial-text text-editorial-bg' : ''}
                ${index < navItems.length - 1 ? 'border-r-1px border-editorial-border' : ''}
              `}
            >
              {language === 'ko' ? item.label.ko : item.label.en}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
