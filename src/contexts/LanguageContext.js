"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import translations from "@/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("bg");

  useEffect(() => {
    const savedLanguage = typeof window !== "undefined" ? localStorage.getItem("language") : null;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    if (!translations[newLanguage]) return;
    setLanguage(newLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", newLanguage);
    }
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage: changeLanguage,
      t: (path) => {
        const segments = path.split(".");
        return segments.reduce((acc, key) => acc?.[key], translations[language]);
      },
      translations: translations[language],
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
