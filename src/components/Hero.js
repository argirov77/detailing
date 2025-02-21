"use client";
import React, { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef(null);
  const [isIOS, setIsIOS] = useState(null);

  // Определяме типа устройство (iOS или не-iOS)
  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);
  }, []);

  useEffect(() => {
    if (isIOS === null) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.loop = true;
    video.preload = "auto";
    video.autoplay = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("disablePictureInPicture", "true");

    const playVideo = () => {
      video.play().catch((err) => console.log("Грешка при възпроизвеждане:", err));
    };

    const isAndroid = /android/i.test(navigator.userAgent);
    const eventName = isIOS ? "loadeddata" : (isAndroid ? "canplay" : "loadeddata");
    video.addEventListener(eventName, playVideo);

    let onFirstTouch;
    if (isIOS) {
      onFirstTouch = () => {
        playVideo();
        document.removeEventListener("touchstart", onFirstTouch);
      };
      document.addEventListener("touchstart", onFirstTouch);
    }

    return () => {
      video.removeEventListener(eventName, playVideo);
      if (isIOS && onFirstTouch) {
        document.removeEventListener("touchstart", onFirstTouch);
      }
    };
  }, [isIOS]);

  // Функция за плавно превъртане до секцията "Контакти"
  const scrollToContacts = () => {
    const contactsSection = document.getElementById("contacts");
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isIOS === null) {
    return <div>Зарежда се...</div>;
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline="true"
        disablePictureInPicture
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        {isIOS ? (
          <source src="/videos/video.mp4" type="video/mp4" />
        ) : (
          <>
            <source src="/videos/video.webm" type="video/webm" />
            <source src="/videos/video.mp4" type="video/mp4" />
          </>
        )}
        Вашият браузър не поддържа видео.
      </video>
      
      {/* Затемняващ слой */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Съдържание върху видеото */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl font-bold">SVA Детейлинг</h1>
        <p className="text-xl mt-4">Професионален детейлинг за вашия автомобил</p>
        <button
          onClick={scrollToContacts}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Запази час
        </button>
      </div>
    </section>
  );
}
