import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, Heart } from 'lucide-react';
import { timelineMilestones } from '../content/timeline';
import MediaRenderer from './MediaRenderer';

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Track scroll position of the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef}
      id="timeline" 
      className="py-24 px-6 bg-zinc-950/80 border-b border-white/5 relative"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-[30%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-rose-500/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-violet-500/5 blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold font-serif text-zinc-100"
          >
            Our Love Story Timeline
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
            From the very first walk in GEL to the major milestones we celebrate today.
          </motion.p>
        </div>

        {/* Timeline Path (Vertical Line) */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-40 bottom-12 w-[2px] bg-white/5" />
        <motion.div 
          className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-40 bottom-12 w-[2px] bg-gradient-to-b from-rose-500 via-pink-500 to-violet-500 origin-top z-0"
          style={{ scaleY }}
        />

        <div className="space-y-16 relative">
          {timelineMilestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div 
                key={milestone.id} 
                className={`flex flex-col md:flex-row relative items-start md:items-center ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                
                {/* Milestone Node (Circle on vertical line) */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-zinc-900 border border-rose-500 flex items-center justify-center z-10 shadow-lg"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                </motion.div>

                {/* Milestone Card */}
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    x: isLeft ? -50 : 50,
                    y: 10
                  }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`w-full md:w-[45%] ml-12 md:ml-0 ${
                    isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                  }`}
                >
                  <div className="bg-zinc-900/60 border border-white/5 p-6 rounded-2xl shadow-xl backdrop-blur-md hover:border-white/10 transition-all duration-300 group">
                    
                    {/* Image placeholder inside card (if available) */}
                    {milestone.imageUrl && (
                      <div className="overflow-hidden rounded-xl h-40 w-full bg-zinc-800 mb-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent z-10" />
                        <MediaRenderer 
                          src={milestone.imageUrl} 
                          alt={milestone.title} 
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Metadata Header */}
                    <div className={`flex flex-wrap items-center gap-2 mb-2 text-xs font-semibold ${
                      isLeft ? 'md:justify-end' : 'md:justify-start'
                    }`}>
                      <span className="flex items-center gap-1 text-rose-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {milestone.date}
                      </span>
                      {milestone.tag && (
                        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-500 border border-white/5">
                          {milestone.tag}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold font-serif text-white mb-2 flex items-center gap-2 justify-start md:group-hover:text-rose-400 transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-light">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
