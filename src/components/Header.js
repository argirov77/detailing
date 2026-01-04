"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-black/80 backdrop-blur-sm py-2 fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto px-4 flex items-center justify-between">
        {/* Лого и (скрытый на мобильном) текст */}
        <div className="flex items-center space-x-2">
          {/* Лого в белом кружке */}
          <div className="bg-white rounded-full p-1">
            <Image
              src="/images/logo.png"
              alt="SVA Детейлинг"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          {/* Текст скрыт на мобильных */}
          <span className="hidden md:block text-white font-bold text-xl">
            {t("header.brand")}
          </span>
        </div>

        {/* Меню */}
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-2 md:gap-6 text-sm md:text-base">
            <li>
              <Link href="#hero" className="text-white hover:text-blue-400 transition">
                {t("header.nav.home")}
              </Link>
            </li>
            <li>
              <Link href="#services" className="text-white hover:text-blue-400 transition">
                {t("header.nav.services")}
              </Link>
            </li>
            <li>
              <Link
                href="#booking"
                className="bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {t("header.nav.book")}
              </Link>
            </li>
          </ul>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="bg-gray-900/80 text-white border border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="bg">BG</option>
            <option value="en">EN</option>
            <option value="ru">RU</option>
          </select>
        </div>
      </nav>
    </header>
  );
}
