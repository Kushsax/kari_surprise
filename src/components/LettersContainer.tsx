import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { situationalLetters } from '../content/letters';
import { siteConfig } from '../content/siteConfig';

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  if (!IconComponent) {
    return <Icons.FileText className={className} />;
  }
  return <IconComponent className={className} />;
}

export default function LettersContainer() {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeLetter = situationalLetters[activeIdx];

  return (
    <section 
      id="letters" 
      className="py-24 px-6 bg-zinc-950/80 border-b border-white/5 relative overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-[40%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-rose-500/5 blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold font-serif text-zinc-100"
          >
            Letters Through Time
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
            Open these digital letter capsules whenever you need a boost, a reminder, or a laugh.
          </motion.p>
        </div>

        {/* Layout: Sidebar + Reader Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Tabs */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-3 pb-4 lg:pb-0 scrollbar-none shrink-0">
            {situationalLetters.map((letter, index) => {
              const isActive = index === activeIdx;

              return (
                <button
                  key={letter.id}
                  onClick={() => setActiveIdx(index)}
                  className={`px-5 py-4 rounded-2xl text-left border transition-all duration-300 flex items-center gap-4 cursor-pointer min-w-[200px] lg:min-w-0 flex-1 lg:flex-none ${
                    isActive
                      ? 'bg-rose-500/10 border-rose-500 text-rose-400 shadow-lg'
                      : 'bg-zinc-900/40 border-white/5 text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200'
                  }`}
                >
                  <div className={`p-2 rounded-lg border transition-colors ${
                    isActive ? 'bg-rose-500 text-white border-rose-400' : 'bg-white/5 border-white/10 text-zinc-400'
                  }`}>
                    <DynamicIcon name={letter.iconName} className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-0.5">Capsule</span>
                    <span className="block text-sm font-semibold truncate font-sans">{letter.category}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Reader Pane */}
          <div className="lg:col-span-8 bg-zinc-900/40 border border-white/5 p-6 sm:p-12 rounded-3xl shadow-xl backdrop-blur-md min-h-[380px] relative overflow-hidden flex flex-col justify-between">
            
            {/* Background design envelope shadow */}
            <div className="absolute top-4 right-4 text-rose-500/5">
              <DynamicIcon name={activeLetter.iconName} className="w-32 h-32 stroke-[1]" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeLetter.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 relative z-10 text-left"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-rose-400 font-bold block mb-1">
                      {activeLetter.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                      {activeLetter.title}
                    </h3>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest self-start sm:self-center">
                    {activeLetter.date}
                  </span>
                </div>

                {/* Content Body */}
                <div className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light font-serif italic whitespace-pre-line min-h-[160px]">
                  {activeLetter.content}
                </div>

                {/* Footer Sign-off */}
                <div className="pt-4 border-t border-white/5 text-right font-serif italic">
                  <span className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest">Always with you,</span>
                  <span className="text-lg font-bold text-rose-400">{siteConfig.coupleNames.partner1}</span>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
