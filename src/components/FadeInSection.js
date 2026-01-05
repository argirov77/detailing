"use client";

import { useState, useRef } from "react";
import SkeletonImage from "./SkeletonImage";

export default function BeforeAfterSlider({ beforeImage, afterImage }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const position = ((touch.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <div className="absolute inset-0">
        <SkeletonImage src={afterImage} alt="After" className="h-full w-full" />
      </div>
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <SkeletonImage src={beforeImage} alt="Before" className="h-full w-full" />
      </div>
      <div
        className="absolute top-0 h-full border-l-2 border-white"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-6 h-6"></div>
      </div>
    </div>
  );
}
