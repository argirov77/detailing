"use client";

import { useState } from "react";

function mergeClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SkeletonImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  onLoad,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = (event) => {
    setLoaded(true);
    onLoad?.(event);
  };

  return (
    <div className={mergeClasses("relative overflow-hidden", className)}>
      <div
        aria-hidden="true"
        className={mergeClasses(
          "absolute inset-0 rounded-lg bg-slate-700/40",
          loaded ? "opacity-0" : "animate-pulse"
        )}
      />
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        className={mergeClasses(
          "h-full w-full object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          imageClassName
        )}
        loading="lazy"
        {...props}
      />
    </div>
  );
}
