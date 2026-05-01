"use client";

import { useEffect, useState } from "react";

export function MotorcyclePublicGallery({ title, images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeImages = Array.isArray(images) && images.length ? images : ["/assets/images/stock/vfr400.jpg"];
  const activeImage = safeImages[Math.min(activeIndex, safeImages.length - 1)] || safeImages[0];

  useEffect(() => {
    setActiveIndex(0);
  }, [safeImages.length]);

  return (
    <div className="product-gallery">
      <div className="product-visual">
        <img src={activeImage} alt={title || "Moto japonaise de collection"} width="1280" height="960" loading="eager" decoding="async" />
      </div>

      {safeImages.length > 1 ? (
        <div className="product-thumbnails" role="tablist" aria-label="Galerie de l'annonce">
          {safeImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={`product-thumb${index === activeIndex ? " is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
            >
              <img src={image} alt={`${title || "Moto"} - vue ${index + 1}`} width="320" height="240" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
