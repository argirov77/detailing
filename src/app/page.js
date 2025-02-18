"use client";
import { useEffect } from "react";
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ContactIcons from '@/components/ContactIcons';

export default function Home() {
  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.05 }); // Анимация начинается быстрее

    fadeElements.forEach(el => observer.observe(el));
  }, []);

  return (
    <>
      <Header />
      <main className="relative overflow-x-hidden">
        
        {/* Hero-секция */}
        <Hero />

        {/* О нас */}
        <section id="about" className="fade-in flex flex-col items-center justify-center bg-[var(--color-secondary)]">
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">О нас</h2>
            <p className="max-w-3xl mx-auto text-lg">
              Мы – команда профессионалов, специализирующихся на авто-детейлинге. Наш опыт и внимание к деталям гарантируют высокое качество услуг.
            </p>
          </div>
        </section>

        {/* Услуги */}
        <section id="services" className="fade-in flex flex-col items-center justify-center">
          <div className="container mx-auto">
            <h2 className="text-5xl font-bold mb-10 text-center">Услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Полировка */}
              <div className="service-card p-6 flex flex-col justify-between">
                <div 
                  className="h-72 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: "url('/images/polirovka.jpg')" }}
                ></div>
                <div>
                  <h3 className="text-2xl font-semibold mt-4">Полировка</h3>
                  <p>Высококачественная полировка для восстановления блеска вашего автомобиля.</p>
                </div>
              </div>
              {/* Химчистка */}
              <div className="service-card p-6 flex flex-col justify-between">
                <div 
                  className="h-72 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: "url('/images/khimchistka.jpg')" }}
                ></div>
                <div>
                  <h3 className="text-2xl font-semibold mt-4">Химчистка</h3>
                  <p>Глубокая чистка салона с использованием профессиональных средств.</p>
                </div>
              </div>
              {/* Защита кузова */}
              <div className="service-card p-6 flex flex-col justify-between">
                <div 
                  className="h-72 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: "url('/images/zashita.jpg')" }}
                ></div>
                <div>
                  <h3 className="text-2xl font-semibold mt-4">Защита кузова</h3>
                  <p>Нанесение защитных покрытий для сохранения идеального состояния автомобиля.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* До и После */}
        <section id="portfolio" className="fade-in flex flex-col items-center justify-center bg-[var(--color-secondary)]">
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-bold mb-10">До и После</h2>
            <BeforeAfterSlider images={[
              { before: "/images/before1.jpg", after: "/images/after1.jpg" },
              { before: "/images/before2.jpg", after: "/images/after2.jpg" },
              { before: "/images/before3.jpg", after: "/images/after3.jpg" },
            ]} />
          </div>
        </section>

        {/* Контакты */}
        <section id="contacts" className="fade-in flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold mb-8">Контакты</h2>
          <ContactIcons />
        </section>

      </main>
      <Footer />
    </>
  );
}
