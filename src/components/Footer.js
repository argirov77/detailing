"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-black text-white py-4 text-center mt-10">
      <p>
        © {new Date().getFullYear()} SVA Detailing. {t("footer")}
      </p>
    </footer>
  );
}
