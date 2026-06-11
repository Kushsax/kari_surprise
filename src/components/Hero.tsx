import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteConfig } from '../content/siteConfig';
import MediaRenderer from './MediaRenderer';

import img1 from '../assets/Carousel main.jpeg';
import img2 from '../assets/carousel1.JPG';
import img3 from '../assets/carousel2.JPG';
import img4 from '../assets/carousel3.JPG';

const fallbackImages = [img1, img2, img3, img4];

export default function Hero() {
  const [carouselIdx, setCarouselIdx] = useState(0);

  const images = siteConfig.heroCarouselImages || [];

  // Auto-play timer for hero image slide rotations
  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCarouselIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      // Pure deterministic pseudo-random values based on sine hashing
      const r1 = (Math.abs(Math.sin(i * 12.9898 + 4.3)) * 43758.5453) % 1;
      const r2 = (Math.abs(Math.sin(i * 78.2330 + 1.2)) * 43758.5453) % 1;
      const r3 = (Math.abs(Math.sin(i * 45.6700 + 7.8)) * 43758.5453) % 1;
      const r4 = (Math.abs(Math.sin(i * 89.1200 + 3.4)) * 43758.5453) % 1;

      return {
        id: i,
        top: `${r1 * 100}%`,
        left: `${r2 * 100}%`,
        duration: 4 + r3 * 4,
        delay: r4 * 5,
      };
    });
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 px-6 pt-24"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-rose-500/10 blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-violet-500/10 blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Floating Sparkles/Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1.5 h-1.5 rounded-full bg-pink-500/20"
            style={{
              top: p.top,
              left: p.left,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Side: Elegant Text Content */}
        <div className="lg:col-span-7 text-left space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight pt-4"
          >
            <span className="block text-zinc-400 font-sans font-light text-2xl sm:text-3xl mb-1">
              {siteConfig.heroGreeting}
            </span>
            <span className="block text-gradient-rose-violet font-serif font-bold italic leading-tight text-5xl sm:text-7xl lg:text-8xl select-none">
              {siteConfig.siteTitle}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-lg text-zinc-400 max-w-xl font-light leading-relaxed"
          >
            {siteConfig.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            <a
              href="#gallery"
              className="px-6 py-3 rounded-full text-center font-medium bg-rose-500 hover:bg-rose-600 text-white shadow-xl shadow-rose-500/10 hover:shadow-rose-600/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Start the Journey
            </a>
            <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 font-medium px-4 py-3">
              <Calendar className="w-4 h-4 text-rose-500/70" />
              <span>Since March 2025</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Big Premium Image Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="lg:col-span-5 flex justify-center w-full"
        >
          <div className="relative w-full max-w-[400px] aspect-[4/5] bg-zinc-900 border border-white/10 p-3 pb-16 rounded-2xl shadow-2xl overflow-hidden group cursor-pointer">
            {/* Soft backdrop glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 to-violet-500 rounded-2xl opacity-20 group-hover:opacity-30 blur-2xl transition-all duration-500 pointer-events-none" />
            
            {/* Slider Viewport */}
            <div className="relative w-full h-full overflow-hidden rounded-xl bg-zinc-950">
              <AnimatePresence>
                <motion.div
                  key={carouselIdx}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1.08 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    opacity: { duration: 1.2, ease: 'easeInOut' },
                    scale: { duration: 4.5, ease: 'easeOut' }
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <MediaRenderer 
                    src={images[carouselIdx]} 
                    fallback={fallbackImages[carouselIdx % fallbackImages.length]}
                    alt={`Us Carousel ${carouselIdx + 1}`} 
                    className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls overlay */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-rose-500 hover:text-white transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-rose-500 hover:text-white transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Panel: Indicators and title */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between z-20">
              <span className="font-serif text-base font-bold text-rose-400 italic">Our Album</span>
              
              {/* Dot Indicators */}
              <div className="flex gap-1.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIdx(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      carouselIdx === idx ? 'bg-rose-500 scale-125' : 'bg-zinc-600 hover:bg-zinc-400'
                    }`}
                    aria-label={`Jump to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <span className="font-sans text-[10px] tracking-widest text-zinc-500 uppercase">
                {carouselIdx + 1} / {images.length}
              </span>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Parallax Scroll Down Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 z-10">
        <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-rose-500/80" />
        </motion.div>
      </div>
    </section>
  );
}
