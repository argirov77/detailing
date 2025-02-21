"use client";
import { useEffect } from "react";
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ContactIcons from '@/components/ContactIcons';
import Map from '@/components/Map';  // Импортиране на компонента Map

export default function Home() {
  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.05 });

    fadeElements.forEach(el => observer.observe(el));
  }, []);

  return (
    <>
      <Header />
      <main className="relative overflow-x-hidden">
        {/* Hero секция */}
        <Hero />

        {/* За нас */}
        <section id="about" className="fade-in flex flex-col items-center justify-center bg-[var(--color-secondary)]">
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">За нас</h2>
            <p className="max-w-3xl mx-auto text-lg">
              Ние сме екип от професионалисти, специализирани в автомобилния детейлинг. Нашият опит и внимание към детайлите гарантират високо качество на услугите.
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
                ></div>
                <div>
                  <h3 className="text-2xl font-semibold mt-4">Полиране</h3>
                  <p>Висококачествено полиране за възстановяване на блесъка на вашия автомобил.</p>
                </div>
              </div>
              {/* Химическо почистване */}
              <div className="service-card p-6 flex flex-col justify-between">
                <div 
                  className="h-72 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: "url('/images/khimchistka.jpg')" }}
                ></div>
                <div>
                  <h3 className="text-2xl font-semibold mt-4">Химическо почистване</h3>
                  <p>Дълбоко почистване на салона с използване на професионални препарати.</p>
                </div>
              </div>
              {/* Защита на купето */}
              <div className="service-card p-6 flex flex-col justify-between">
                <div 
                  className="h-72 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: "url('/images/zashita.jpg')" }}
                ></div>
                <div>
                  <h3 className="text-2xl font-semibold mt-4">Защита на купето</h3>
                  <p>Нанасяне на защитни покрития за запазване на идеалното състояние на автомобила.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Преди и След */}
        <section id="portfolio" className="fade-in flex flex-col items-center justify-center bg-[var(--color-secondary)]">
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-bold mb-10">Преди и След</h2>
            <BeforeAfterSlider images={[
              { before: "/images/before1.jpg", after: "/images/after1.jpg" },
              { before: "/images/before2.jpg", after: "/images/after2.jpg" },
              { before: "/images/before3.jpg", after: "/images/after3.jpg" },
            ]} />
          </div>
        </section>

        {/* Контакти */}
        <section id="contacts" className="fade-in flex flex-col items-center justify-center">
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-bold mb-8">Контакти</h2>
            <p className="max-w-xl mx-auto text-lg mb-6">
              Свържете се с нас по удобния за вас начин и получете безплатна консултация!
            </p>
            <ContactIcons />
            {/* Добавяме карта */}
            <Map />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
