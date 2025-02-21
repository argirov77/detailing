"use client";
import { useState, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

export default function BeforeAfterSlider({ images }) {
  const [index, setIndex] = useState(0);           // текущата двойка
  const [sliderPosition, setSliderPosition] = useState(50); // позиция на плъзгача (в проценти)
  const containerRef = useRef(null);
  const isDragging = useRef(false);                // флаг, че местим плъзгача

  // Начало на движение на плъзгача
  const handlePointerDown = (e) => {
    isDragging.current = true;
    e.stopPropagation(); // Изключва свайп карусел, ако се хване плъзгачът
  };

  // Край на движение на плъзгача
  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Логика за движение на плъзгача
  const handlePointerMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let clientX = e.clientX;
    if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
    }
    const newPosition = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
  };

  // Обработчик за свайп за смяна на двойката
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isDragging.current) {
        setIndex((prev) => (prev + 1) % images.length);
      }
    },
    onSwipedRight: () => {
      if (!isDragging.current) {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  // Стрелки за смяна на двойката
  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      {...handlers}
      className="relative w-full max-w-4xl mx-auto h-96 md:h-[500px] rounded-lg shadow-lg overflow-hidden select-none"
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute w-full h-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative w-full h-full cursor-pointer">
            {/* Долно изображение (След) */}
            <img
              src={images[index].after}
              alt="След"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Горно изображение (Преди), което се скрива чрез clip-path */}
            <img
              src={images[index].before}
              alt="Преди"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            />
            {/* Линия на плъзгача */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white"
              style={{ left: `${sliderPosition}%` }}
            />
            {/* Кръгче на плъзгача */}
            <div
              className="absolute top-1/2 w-6 h-6 bg-white border border-gray-600 rounded-full"
              style={{
                left: `calc(${sliderPosition}% - 12px)`,
                transform: "translateY(-50%)",
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Стрелки наляво/надясно */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
      >
        ←
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
      >
        →
      </button>

      {/* Индикатор на текущата двойка */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-gray-500"}`}
          />
        ))}
      </div>
    </div>
  );
}
