import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import confetti from 'canvas-confetti';
import { Heart, MapPin, Star } from 'lucide-react';

export default function Surprise() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  }));

  // Monitor viewport dimensions for ReactConfetti positioning
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    
    // Automatically trigger confetti
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#f43f5e', '#ec4899', '#8b5cf6', '#fbbf24']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#f43f5e', '#ec4899', '#8b5cf6', '#fbbf24']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Fade out continuous falling confetti after 8 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section 
      id="surprise" 
      className="py-32 px-6 bg-gradient-to-t from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden"
    >
      {/* Screen-wide Confetti overlay */}
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={150}
          recycle={true}
          colors={['#f43f5e', '#ec4899', '#8b5cf6', '#fbbf24', '#3b82f6']}
        />
      )}

      {/* Floating background glowing spotlights */}
      <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[25%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center flex justify-center">
        
        {/* REVEALED FINAL SURPRISE PANEL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="bg-zinc-900/60 border border-amber-500/20 p-8 sm:p-16 rounded-3xl shadow-2xl backdrop-blur-lg max-w-3xl w-full flex flex-col items-center gap-8 relative overflow-hidden text-center"
        >
          {/* Gold light frame effects */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500" />
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-500/5 blur-2xl" />

          <div className="space-y-4">
            <div className="flex justify-center gap-1">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-float" />
              <Star className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <span className="text-xs text-amber-400 font-bold uppercase tracking-widest block">The Surprise ending</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight text-gradient-rose-violet italic">
              Surprise! I Got Us Tickets!
            </h2>
          </div>

          {/* Event/Surprise card details */}
          <div className="bg-zinc-950/60 border border-white/5 p-6 rounded-2xl w-full max-w-md text-left flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400 self-start shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">Surprise Event Details</span>
              <h4 className="text-base font-bold text-white leading-tight font-sans">
                Weekend Cabin Getaway & Hot Springs Spa
              </h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Check your email for the confirmation details! We're headed to the mountains for a weekend of stargazing, hikes, and complete relaxation.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-semibold">
                <span className="text-rose-400">Date: August 15 - 17, 2026</span>
                <span className="text-zinc-500 uppercase tracking-widest font-bold">Booked & Confirmed</span>
              </div>
            </div>
          </div>

          {/* Personal Closing Statement */}
          <p className="text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed font-light font-serif italic">
            "I can't wait to add this next chapter to our story. Thank you for making every single day an adventure worth living. Here's to us, to the memories we've made, and to the beautiful ones still waiting ahead."
          </p>

          <div className="px-5 py-2.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider animate-pulse">
            Countdown Active ⏳
          </div>
        </motion.div>

      </div>
    </section>
  );
}
