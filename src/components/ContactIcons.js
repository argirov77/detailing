"use client";
import { FaWhatsapp, FaTelegram, FaViber, FaPhoneAlt } from 'react-icons/fa';

export default function ContactIcons() {
  const phoneNumber = '+359893976715'; // Ваш номер
  const rawMessage = 'Здравейте, искам да се възползвам от безплатна консултация.';
  const message = encodeURIComponent(rawMessage);

  // WhatsApp:
  //   https://wa.me/<phoneWithoutPlus>?text=...
  // Telegram (общий share):
  //   https://t.me/share/url?url=&text=...
  // Viber (пересылка текста):
  //   viber://forward?text=...
  //   (Нет официального URI для прямого чата с номером + текстом без Viber API)
  // Phone:
  //   tel:<phoneNumber>

  // Удаляем "+" для wa.me:
  const phoneForWhatsApp = phoneNumber.replace('+', '');

  return (
    <div className="flex space-x-6 justify-center items-center text-3xl">
      {/* Телефон */}
      <a
        href={`tel:${phoneNumber}`}
        className="text-blue-600 hover:text-blue-800"
      >
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
        href={`https://t.me/share/url?url=&text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <FaTelegram />
      </a>
      
      {/* Viber */}
      <a
        href={`viber://forward?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 hover:text-purple-800"
      >
        <FaViber />
      </a>
    </div>
  );
}
