import './globals.css';

export const metadata = {
  title: 'SVA Detailing',
  description: 'Профессиональные услуги детейлинга',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
