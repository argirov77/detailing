'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black/70 backdrop-blur-sm py-4 fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto flex justify-between items-center px-4">
        {/* Логотип и название */}
        <div className="flex items-center space-x-2">
          <Image 
            src="/images/logo.png"  // Разместите логотип в public/images/logo.png
            alt="SVA Detailing"
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
          <span className="text-white font-bold text-xl">SVA Detailing</span>
        </div>
        {/* Навигационное меню */}
        <ul className="flex space-x-6">
          <li>
            <Link href="#hero" className="text-white hover:text-blue-400 transition">
              Главная
            </Link>
          </li>
          <li>
            <Link href="#about" className="text-white hover:text-blue-400 transition">
              О нас
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-white hover:text-blue-400 transition">
              Контакты
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
