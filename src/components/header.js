"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
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
            SVA Детейлинг
          </span>
        </div>

        {/* Меню */}
        <ul className="flex items-center gap-2 md:gap-6 text-sm md:text-base">
          <li>
            <Link href="#hero" className="text-white hover:text-blue-400 transition">
              Начало
            </Link>
          </li>
          <li>
            <Link href="#services" className="text-white hover:text-blue-400 transition">
              Услуги
            </Link>
          </li>
          <li>
            <Link
              href="#booking"
              className="bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Запази час
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
