"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ContactIcons from "@/components/ContactIcons";
import Map from "@/components/Map";
import { useLanguage } from "@/contexts/LanguageContext";
import SkeletonImage from "@/components/SkeletonImage";

const QuizWizard = dynamic(() => import("@/components/QuizWizard"), { ssr: false });

export default function Home() {
  const { t } = useLanguage();
  const [showQuiz, setShowQuiz] = useState(false);
  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.05 }
    );

    fadeElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleHashOpen = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (hash === "#booking" || hash === "#quiz") {
        setShowQuiz(true);
      }
    };

    handleHashOpen();
    window.addEventListener("hashchange", handleHashOpen);
    return () => window.removeEventListener("hashchange", handleHashOpen);
  }, []);

  const closeQuiz = () => {
    setShowQuiz(false);
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash === "#booking" || hash === "#quiz") {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="relative overflow-x-hidden">
        {/* Hero */}
        <Hero onOpenQuiz={() => setShowQuiz(true)} />

        {/* За нас */}
        <section
          id="about"
          className="fade-in flex flex-col items-center justify-center bg-[var(--color-secondary)]"
        >
          <div className="container mx-auto text-center space-y-6 py-12">
            <h2 className="text-5xl font-bold">{t("about.title")}</h2>
            <p className="max-w-3xl mx-auto text-lg">{t("about.description")}</p>
            <button
              onClick={() => setShowQuiz(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              {t("about.quizCta")}
            </button>
          </div>
        </section>

        {/* Услуги */}
        <section id="services" className="fade-in flex flex-col items-center justify-center">
          <div className="container mx-auto">
            <h2 className="text-5xl font-bold mb-10 text-center">{t("services.title")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["/images/polirovka.jpg", "/images/zashita.jpg", "/images/polirovka-far.jpg"].map((image, index) => {
                const service = t("services.items")?.[index];
                return (
                  <div key={image} className="service-card p-6 flex flex-col justify-between">
                    <SkeletonImage
                      src={image}
                      alt={service?.title || "Service"}
                      className="h-72 w-full rounded-lg"
                    />
                    <div>
                      <h3 className="text-2xl font-semibold mt-4">{service?.title}</h3>
                      <p>{service?.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Преди и След */}
        <section
          id="portfolio"
          className="fade-in flex flex-col items-center justify-center bg-[var(--color-secondary)]"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-bold mb-10">{t("portfolio.title")}</h2>

            <BeforeAfterSlider
              images={[
                { before: "/images/before1.jpg", after: "/images/after1.jpg" },
                { before: "/images/before2.jpg", after: "/images/after2.jpg" },
                { before: "/images/before3.jpg", after: "/images/after3.jpg" },
              ]}
            />
          </div>
        </section>

        {/* Контакти */}
        <section
          id="contacts"
          className="fade-in flexz flex flex-col items-center justify-center py-16"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-bold mb-8">{t("contacts.title")}</h2>

            <div className="mt-8">
              <SkeletonImage
                src="/images/master.jpg"
                alt={t("contacts.expert")}
                className="mx-auto h-32 w-32 rounded-full"
                imageClassName="rounded-full"
              />
              <p className="text-white mt-4">
                <b>{t("contacts.expert")}</b>
              </p>
            </div>

            <p className="max-w-xl mx-auto text-lg mb-6">{t("contacts.description")}</p>

            <ContactIcons />
            <Map />
          </div>
        </section>
      </main>
      <Footer />
      {showQuiz ? <QuizWizard open={showQuiz} onClose={closeQuiz} /> : null}
    </>
  );
}
