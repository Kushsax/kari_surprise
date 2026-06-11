import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { loveReasons } from '../content/reasons';

// Dynamic helper to resolve Lucide Icon components by string key
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  if (!IconComponent) {
    return <Icons.Heart className={className} />; // Fallback
  }
  return <IconComponent className={className} />;
}

interface CardGlowProps {
  reason: typeof loveReasons[0];
  index: number;
}

function ReasonCard({ reason, index }: CardGlowProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-zinc-900/40 border border-white/5 p-8 rounded-2xl shadow-xl backdrop-blur-md overflow-hidden cursor-default group hover:border-white/10 hover:shadow-2xl transition-all duration-500"
    >
      {/* Stripe-style cursor spotlight effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-0"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(244, 63, 94, 0.12), transparent 70%)`
          }}
        />
      )}

      {/* Decorative Accent Ring */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-rose-500/5 blur-2xl group-hover:bg-rose-500/10 transition-all duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-start gap-4">
        {/* Icon wrapper */}
        <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 group-hover:scale-105">
          <DynamicIcon name={reason.iconName} className="w-6 h-6" />
        </div>

        <div className="space-y-2 text-left">
          <h3 className="text-lg font-bold font-serif text-white tracking-wide group-hover:text-rose-400 transition-colors duration-300">
            {reason.title}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed font-light group-hover:text-zinc-300 transition-colors duration-300">
            {reason.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Reasons() {
  return (
    <section 
      id="reasons" 
      className="py-24 px-6 bg-zinc-950 border-b border-white/5 relative overflow-hidden"
    >
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />

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
            Reasons I Love You
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
            A few small highlights from an endless list of things that make you so special to me.
          </motion.p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loveReasons.map((reason, index) => (
            <ReasonCard 
              key={reason.id} 
              reason={reason} 
              index={index} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
