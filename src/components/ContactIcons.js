import { FaWhatsapp, FaTelegram, FaViber, FaPhoneAlt } from 'react-icons/fa';

export default function ContactIcons() {
  const phoneNumber = '+1234567890'; // Замените на ваш номер
  const message = encodeURIComponent('Здравствуйте, хочу воспользоваться бесплатной консультацией');

  return (
    <div className="flex space-x-4 justify-center items-center">
      <a href={`tel:${phoneNumber}`} className="text-3xl text-blue-600 hover:text-blue-800">
        <FaPhoneAlt />
      </a>
      <a 
        href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`}
        target="_blank" rel="noopener noreferrer"
        className="text-3xl text-green-500 hover:text-green-700"
      >
        <FaWhatsapp />
      </a>
      <a 
        href={`https://t.me/share/url?url=&text=${message}`}
        target="_blank" rel="noopener noreferrer"
        className="text-3xl text-blue-500 hover:text-blue-700"
      >
        <FaTelegram />
      </a>
      <a 
        href={`viber://chat?number=${phoneNumber}`}
        target="_blank" rel="noopener noreferrer"
        className="text-3xl text-purple-600 hover:text-purple-800"
      >
        <FaViber />
      </a>
    </div>
  );
}
