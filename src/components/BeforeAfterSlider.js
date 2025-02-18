"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

export default function BeforeAfterSlider({ images }) {
  const [index, setIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  // Начало движения ползунка
  const handlePointerDown = (e) => {
    isDragging.current = true;
    e.preventDefault();
  };

  // Окончание движения
  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Обновление позиции ползунка с requestAnimationFrame
  const handlePointerMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newPosition;

    if (e.touches) {
      newPosition = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    } else {
      newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    }

    requestAnimationFrame(() => {
      setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
    });
  };

  // Обработчик свайпа с debounce (оставляем задержку только для смены пары)
  const debouncedSwipe = useCallback(
    (direction) => {
      if (!isDragging.current) {
        setIndex((prev) => {
          const nextIndex =
            direction === "left"
              ? (prev + 1) % images.length
              : (prev - 1 + images.length) % images.length;
          return nextIndex;
        });
      }
    },
    []
  );

  const handlers = useSwipeable({
    onSwiping: (e) => {
      if (isDragging.current) {
        e.event.stopPropagation();
      }
    },
    onSwipedLeft: () => debouncedSwipe("left"),
    onSwipedRight: () => debouncedSwipe("right"),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  useEffect(() => {
    document.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => document.removeEventListener("pointerup", handlePointerUp);
  }, []);

  return (
    <div
      {...handlers}
      className="relative w-full max-w-4xl mx-auto h-96 md:h-[500px] rounded-lg shadow-lg overflow-hidden select-none"
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
          <div
            ref={containerRef}
            className="relative w-full h-full cursor-pointer"
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerDown}
          >
            {/* Нижнее изображение (После) */}
            <img src={images[index].after} className="absolute inset-0 w-full h-full object-cover" alt="After" />

            {/* Верхнее изображение (До), скрывающееся через clip-path */}
            <img
              src={images[index].before}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Before"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            />

            {/* Ползунок */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-pointer touch-none"
              style={{ left: `${sliderPosition}%` }}
            />

            {/* Круглый контрол */}
            <div
              className="absolute top-1/2 w-6 h-6 bg-white border border-gray-600 rounded-full cursor-pointer touch-none"
              style={{ left: `calc(${sliderPosition}% - 12px)`, transform: "translateY(-50%)" }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Стрелки для переключения фото */}
      <button
        onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
      >
        ←
      </button>
      <button
        onClick={() => setIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
      >
        →
      </button>

      {/* Индикатор текущего слайда */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-gray-500"}`}></div>
        ))}
      </div>
    </div>
  );
}
