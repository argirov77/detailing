"use client";
import React from "react";

export default function Map() {
  // Пример координат (замените при необходимости)
  const lat = 43.21073;
  const lng = 27.94054;
  const zoom = 16;

  return (
    <div className="w-full h-96 mt-8 rounded-lg overflow-hidden border border-gray-600">
      <iframe
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&hl=bg&output=embed`}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Карта: Варна, Княз Борис 1ви 141"
      ></iframe>
    </div>
  );
}
