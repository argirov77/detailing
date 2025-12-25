"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ContactIcons from "@/components/ContactIcons";
import Map from "@/components/Map";

export default function Home() {
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

  return (
    <>
      <Header />
      <main className="relative overflow-x-hidden">
        {/* Hero */}
        <Hero />

        {/* За нас */}
        <section
          id="about"
          className="fade-in flex flex-col items-center justify-center bg-[var(--color-secondary)]"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">За нас</h2>
            <p className="max-w-3xl mx-auto text-lg">
              SVA Детайлинг е студио за професионален автомобилен детайлинг.
              Работим с внимание към всеки детайл и подбираме процедури според
              състоянието на автомобила, за да постигнем максимален ефект и
              дълготрайна защита.
            </p>
          </div>
        </section>

        {/* Услуги */}
        <section id="services" className="fade-in flex flex-col items-center justify-center">
          <div className="container mx-auto">
            <h2 className="text-5xl font-bold mb-10 text-center">Услуги</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Полиране */}
              <div className="service-card p-6 flex flex-col justify-between">
                <div
                  className="h-72 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: "url('/images/polirovka.jpg')" }}
                />
                <div>
                  <h3 className="text-2xl font-semibold mt-4">
                    Корекция и полиране на лак
                  </h3>
                  <p>
                    Премахване на леки до средни дефекти (микро драскотини, холограми,
                    матовини) и възстановяване на дълбок блясък на боята.
                  </p>
                </div>
              </div>

              {/* Защита на купето (керамика) */}
              <div className="service-card p-6 flex flex-col justify-between">
                <div
                  className="h-72 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: "url('/images/zashita.jpg')" }}
                />
                <div>
                  <h3 className="text-2xl font-semibold mt-4">Керамична защита</h3>
                  <p>
                    Нанасяне на керамично покритие за по-висока устойчивост,
                    хидрофобен ефект и по-лесна поддръжка на автомобила.
                  </p>
                </div>
              </div>

              {/* Полиране на фарове */}
              <div className="service-card p-6 flex flex-col justify-between">
                <div
                  className="h-72 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: "url('/images/polirovka-far.jpg')" }}
                />
                <div>
                  <h3 className="text-2xl font-semibold mt-4">Полиране на фарове</h3>
                  <p>
                    Възстановяване на прозрачността при пожълтяване и помътняване,
                    за по-добра видимост и по-свежа визия на автомобила.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Преди и След */}
        <section
          id="portfolio"
          className="fade-in flex flex-col items-center justify-center bg-[var(--color-secondary)]"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-bold mb-10">Преди и След</h2>

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
            <h2 className="text-5xl font-bold mb-8">Контакти</h2>

            <div className="mt-8">
              <img
                src="/images/master.jpg"
                alt="Нашият експерт Алекс"
                className="mx-auto rounded-full w-32 h-32 object-cover"
              />
              <p className="text-white mt-4">
                <b>Вашият детайлър: Алекс</b>
              </p>
            </div>

            <p className="max-w-xl mx-auto text-lg mb-6">
              Свържете се с нас за безплатна консултация и записване на час.
              Работим с предварителна уговорка.
            </p>

            <ContactIcons />
            <Map />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
