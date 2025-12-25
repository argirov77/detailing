import './globals.css';
import { Montserrat, Open_Sans } from 'next/font/google';

const montserratFont = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const openSansFont = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const metadata = {
  title: 'SVA Detailing',
  description: 'Профессиональные услуги детейлинга',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bg" className={`${montserratFont.variable} ${openSansFont.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
