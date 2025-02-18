'use client';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4 text-center mt-10">
      <p>© {new Date().getFullYear()} SVA Detailing. Все права защищены.</p>
    </footer>
  );
}
