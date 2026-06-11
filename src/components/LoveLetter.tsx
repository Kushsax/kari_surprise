import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Heart, X } from 'lucide-react';
import { loveLetterData } from '../content/loveLetter';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    // Wait for envelope flap and slide-up animations to complete before showing full reader
    setTimeout(() => {
      setIsReading(true);
    }, 1200);
  };

  const handleCloseLetter = () => {
    setIsReading(false);
    setIsOpen(false);
  };

  return (
    <section 
      id="love-letter" 
      className="py-24 px-6 bg-zinc-950/80 border-b border-white/5 relative overflow-hidden"
    >
      {/* Soft background glows */}
      <div className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-rose-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-violet-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold font-serif text-zinc-100"
          >
            A Sealed Message
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[3px] bg-rose-500 mx-auto my-4 rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-zinc-400 font-light"
          >
            Click the wax seal below to open and read a letter written just for you.
          </motion.p>
        </div>

        {/* Envelope Container */}
        <div className="flex justify-center items-center py-12 relative min-h-[320px]">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              // SEALED ENVELOPE
              <motion.div
                key="closed-envelope"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                onClick={handleOpenEnvelope}
                className="relative bg-zinc-900 border border-white/10 rounded-2xl w-[320px] sm:w-[400px] h-[220px] sm:h-[260px] cursor-pointer shadow-2xl flex flex-col items-center justify-center p-6 transition-all duration-300 group overflow-hidden"
              >
                {/* Envelope Flap Creases (Lines) */}
                <div className="absolute inset-0 pointer-events-none border-b-[110px] sm:border-b-[130px] border-b-transparent border-l-[160px] sm:border-l-[200px] border-l-zinc-900/90 border-r-[160px] sm:border-r-[200px] border-r-zinc-900/90 border-t-[110px] sm:border-t-[130px] border-t-zinc-950/80 z-20" />
                <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl" />

                {/* Heart Wax Seal */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-rose-600 border border-rose-500 flex items-center justify-center shadow-lg group-hover:bg-rose-500 transition-colors duration-300 relative">
                    <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-25" />
                    <Heart className="w-6 h-6 text-white fill-white group-hover:scale-115 transition-transform duration-300" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mt-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    Open Letter
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 text-left flex flex-col z-10 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500">To:</span>
                  <span className="font-serif text-sm font-bold text-zinc-300 italic">{loveLetterData.greeting.split(',')[0]}</span>
                </div>
              </motion.div>
            ) : (
              // OPENING ANIMATION SEQUENCE
              <motion.div
                key="open-envelope"
                className="relative w-[320px] sm:w-[400px] h-[220px] sm:h-[260px] flex items-center justify-center"
              >
                {/* Envelope Body */}
                <div className="absolute bottom-0 w-full h-[180px] sm:h-[220px] bg-zinc-900 border border-white/10 rounded-b-2xl shadow-xl z-20 overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none border-b-[90px] sm:border-b-[110px] border-b-transparent border-l-[160px] sm:border-l-[200px] border-l-zinc-900/90 border-r-[160px] sm:border-r-[200px] border-r-zinc-900/90 border-t-[90px] sm:border-t-[110px] border-t-transparent" />
                </div>

                {/* Rotating Flap (3D Flip Open) */}
                <motion.div
                  initial={{ rotateX: 0, transformOrigin: 'top' }}
                  animate={{ rotateX: 180 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="absolute top-10 sm:top-10 w-full h-[80px] sm:h-[100px] bg-zinc-950 border border-white/5 rounded-t-2xl z-10"
                />

                {/* Letter Sliding Up */}
                <motion.div
                  initial={{ y: 0, opacity: 0.5, scale: 0.95 }}
                  animate={{ y: -100, opacity: 1, scale: 0.98 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                  className="absolute bottom-6 bg-zinc-800 border border-white/10 p-5 rounded-xl shadow-lg w-[280px] sm:w-[350px] h-[160px] sm:h-[200px] z-15 text-left flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="w-12 h-1 bg-rose-500/80 rounded" />
                    <span className="block font-serif text-sm text-zinc-300 pt-2 italic">{loveLetterData.greeting}</span>
                    <span className="block text-xs text-zinc-500 font-light truncate mt-1">{loveLetterData.paragraphs[0]}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-zinc-500">
                    <span>Unfolding...</span>
                    <span>Love, {loveLetterData.signature}</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Full Letter Reader View Overlays (Modal style for premium reading spacing) */}
      <AnimatePresence>
        {isReading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-950/98 flex items-center justify-center p-4 sm:p-6 backdrop-blur-lg overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="max-w-2xl w-full bg-zinc-900/60 border border-white/10 p-8 sm:p-12 rounded-3xl shadow-2xl my-8 text-left relative glass-panel flex flex-col gap-6"
            >
              {/* Close Button */}
              <button 
                onClick={handleCloseLetter}
                className="absolute top-4 right-4 p-3 bg-white/5 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Close Letter"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Heart Badge */}
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-rose-500/10 rounded-full border border-rose-500/20 text-rose-500">
                  <MailOpen className="w-6 h-6 fill-rose-500/10" />
                </div>
              </div>

              {/* Letter Title/Greeting */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100 italic">
                {loveLetterData.greeting}
              </h3>

              <div className="h-px bg-gradient-to-r from-rose-500/50 to-transparent" />

              {/* Letter Paragraphs */}
              <div className="space-y-6 text-zinc-300 font-serif text-base sm:text-lg leading-relaxed font-light italic">
                {loveLetterData.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="h-px bg-gradient-to-r from-rose-500/50 to-transparent mt-4" />

              {/* Sign-off */}
              <div className="space-y-1 font-serif italic text-right mt-4">
                <p className="text-sm text-zinc-500 font-sans uppercase tracking-widest">{loveLetterData.closing}</p>
                <p className="text-2xl font-bold text-rose-400">{loveLetterData.signature}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
