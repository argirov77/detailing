"use client";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef(null);
  const [videoStarted, setVideoStarted] = useState(false);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("User interaction needed, but iOS blocked:", err);
      });
      setVideoStarted(true);
    }
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        loop
        muted
        playsInline
      >
        <source src="/videos/video.webm" type="video/webm" />
        <source src="/videos/video.mp4" type="video/mp4" />
        Your browser does not support video.
      </video>

      {/* Overlay if video not started */}
      {!videoStarted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <button
            onClick={handlePlayVideo}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Tap to Play
          </button>
        </div>
      )}

      {/* Content (under the button overlay if videoStarted = false) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 bg-black/40">
        <h1 className="text-5xl font-bold">SVA Detailing</h1>
        <p className="text-xl mt-4">Professional detailing services for your car</p>
      </div>
    </section>
  );
}
