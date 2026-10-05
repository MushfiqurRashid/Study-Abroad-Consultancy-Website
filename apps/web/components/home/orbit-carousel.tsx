"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

// --- Data: countries ---
const countries = [
  {
    id: 1,
    name: "South Korea",
    slug: "south-korea",
    universities: "6 Selected Universities",
    image: "/flags/south-korea.png",
    description: "Premier education with work opportunities"
  },
  {
    id: 2,
    name: "Italy",
    slug: "italy",
    universities: "0 Universities — Coming Soon",
    image: "/flags/italy.png",
    description: "Arts, culture & world-class education"
  },
  {
    id: 3,
    name: "Malta",
    slug: "malta",
    universities: "0 Universities — Coming Soon",
    image: "/flags/malta.png",
    description: "English-speaking EU destination"
  },
  {
    id: 4,
    name: "Austria",
    slug: "austria",
    universities: "0 Universities — Coming Soon",
    image: "/flags/austria.webp",
    description: "Research & innovation excellence"
  },
  {
    id: 5,
    name: "Hungary",
    slug: "hungary",
    universities: "0 Universities — Coming Soon",
    image: "/flags/hungary.jpg",
    description: "Affordable quality education"
  },
];

// --- Utility for fallback images ---
const safeImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.src = "https://placehold.co/100x100/E0E7FF/4338CA?text=Error";
};

// --- Custom hook for mobile detection ---
const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkScreenSize = (): void => setIsMobile(window.innerWidth < breakpoint);
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);
  
  return isMobile;
};



// --- Main Component ---
export default function OrbitCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isMobile = useIsMobile();
  const router = useRouter();
  const lastManualInteractionRef = React.useRef(0);

  const containerRadius = isMobile ? 130 : 200;
  const profileSize = isMobile ? 60 : 80;
  const containerSize = containerRadius * 2 + 100;
  const AUTO_ROTATE_MS = 4500;

  // Calculate rotation for each profile
  const getRotation = React.useCallback(
    (index: number): number => (index - activeIndex) * (360 / countries.length),
    [activeIndex]
  );

  const markManualInteraction = React.useCallback(() => {
    lastManualInteractionRef.current = Date.now();
  }, []);

  const next = React.useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % countries.length);
  }, []);

  const prev = React.useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + countries.length) % countries.length);
  }, []);

  const handleNext = React.useCallback(() => {
    markManualInteraction();
    next();
  }, [markManualInteraction, next]);

  const handlePrev = React.useCallback(() => {
    markManualInteraction();
    prev();
  }, [markManualInteraction, prev]);

  const handleExplore = React.useCallback(() => {
    const slug = countries[activeIndex].slug;
    router.push(`/courses?country=${encodeURIComponent(slug)}`);
  }, [activeIndex, router]);

  // Auto-rotate in a stable interval. Skip immediate tick after manual interaction.
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - lastManualInteractionRef.current;
      if (elapsed < AUTO_ROTATE_MS) return;
      next();
    }, AUTO_ROTATE_MS);

    return () => clearInterval(intervalId);
  }, [next]);

  const handleProfileClick = React.useCallback((index: number) => {
    if (index === activeIndex) return;
    markManualInteraction();
    setActiveIndex(index);
  }, [activeIndex, markManualInteraction]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'ArrowLeft') handlePrev();
      else if (event.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div className="flex flex-col items-center p-4 relative min-h-[400px] bg-white dark:bg-black transition-colors duration-300">

      <div
        className="relative flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        {/* Single orbit circle */}
        <div
          className="absolute rounded-full border border-gray-300 dark:border-gray-700"
          style={{
            width: containerRadius * 2,
            height: containerRadius * 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Active Country Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={countries[activeIndex].id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="z-10 bg-white dark:bg-gray-950 backdrop-blur-sm shadow-xl dark:shadow-2xl dark:shadow-gray-900/50 rounded-xl p-4 md:p-6 w-56 md:w-64 text-center border border-gray-100 dark:border-gray-800"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              src={countries[activeIndex].image}
              alt={countries[activeIndex].name}
              onError={safeImage}
              className="w-24 h-24 md:w-28 md:h-28 rounded-lg mx-auto -mt-12 md:-mt-16 border-4 border-white dark:border-black object-cover shadow-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <h2 className="mt-4 text-lg md:text-2xl font-bold text-gray-800 dark:text-white">
                {countries[activeIndex].name}
              </h2>
              <div className="flex items-center justify-center text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2 font-semibold">
                {countries[activeIndex].universities}
              </div>
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                {countries[activeIndex].description}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex justify-center items-center mt-4 space-x-2"
            >
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronLeft size={18} className="text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={handleExplore}
                className="px-6 py-2 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:opacity-90 dark:bg-primary dark:hover:bg-primary/90 transition-all"
              >
                Explore
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronRight size={18} className="text-gray-700 dark:text-gray-300" />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Orbiting Countries with Counter-Rotation */}
        {countries.map((country, i) => {
          const rotation = getRotation(i);
          return (
            <motion.div
              key={country.id}
              animate={{
                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
              }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{
                width: profileSize,
                height: profileSize,
                position: "absolute",
                top: `calc(50% - ${profileSize / 2}px)`,
                left: `calc(50% - ${profileSize / 2}px)`,
              }}
            >
              {/* Counter-rotation to keep image upright */}
              <motion.div
                animate={{ rotate: -rotation }}
                transition={{
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="w-full h-full"
              >
                <motion.img
                  src={country.image}
                  alt={country.name}
                  onError={safeImage}
                  onClick={() => handleProfileClick(i)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full h-full object-cover rounded-full cursor-pointer transition-all duration-300 ${
                    i === activeIndex 
                      ? "border-4 border-primary dark:border-primary shadow-lg" 
                      : "border-2 border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary"
                  }`}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
