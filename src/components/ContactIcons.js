"use client";

import { FaWhatsapp, FaTelegram, FaViber, FaPhoneAlt, FaInstagram } from 'react-icons/fa';
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactIcons() {
  const { t } = useLanguage();
  const phoneNumber = '+359893976715'; // Номер администратора
  const message = encodeURIComponent(t("contacts.whatsappMessage"));
  const phoneForWhatsApp = phoneNumber.replace('+', ''); // для wa.me
  
  return (
    <div className="flex space-x-6 justify-center items-center text-3xl">
      {/* Телефон */}
      <a href={`tel:${phoneNumber}`} className="text-blue-600 hover:text-blue-800">
        <FaPhoneAlt />
      </a>
      
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${phoneForWhatsApp}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-green-700"
      >
        <FaWhatsapp />
      </a>
      
      {/* Telegram */}
      <a
        href="https://t.me/ManDiversity"  // Замените на свой Telegram username
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <FaTelegram />
      </a>
      
      {/* Viber */}
      <a
        href={`viber://chat?number=${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 hover:text-purple-800"
      >
        <FaViber />
      </a>
      
      {/* Instagram */}
      <a
        href="https://instagram.com/sva_cardetailing"  // Замените на свой Instagram username
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 hover:text-pink-700"
      >
        <FaInstagram />
      </a>
    </div>
  );
}
