import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata = {
  title: 'SVA Detailing',
  description: 'Профессиональные услуги детейлинга',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
