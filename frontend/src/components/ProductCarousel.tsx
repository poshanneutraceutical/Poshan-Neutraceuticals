import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCarouselProps {
  images: string[];
  productName: string;
}

export default function ProductCarousel({
  images,
  productName,
}: ProductCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prev = () => {
    setCurrent((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrent((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto Slide
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      next();
    }, 3500);

    return () => clearInterval(interval);
  }, [current, isHovered, images.length]);

  return (
    <div
      className="relative w-full aspect-square overflow-hidden bg-[#1a1a1a]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${productName} ${current + 1}`}
          draggable={false}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) {
              next();
            } else if (info.offset.x > 80) {
              prev();
            }
          }}
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -120, opacity: 0 }}
          transition={{ duration: 0.35 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.98 }}
          className="
            w-full
            h-full
            object-cover
            cursor-grab
            active:cursor-grabbing
            select-none
          "
        />
      </AnimatePresence>

      {/* Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className={`rounded-full transition-all duration-300 ${
                current === index
                  ? "w-6 h-2 bg-red-600"
                  : "w-2 h-2 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}