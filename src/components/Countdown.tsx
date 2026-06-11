import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hourglass, Calendar, MapPin } from 'lucide-react';
import { countdownsData } from '../content/countdowns';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPast, setIsPast] = useState(false);

  const activeTarget = countdownsData[selectedIdx];

  useEffect(() => {
    const updateCountdown = () => {
      const difference = +new Date(activeTarget.targetDate) - +new Date();
      
      if (difference <= 0) {
        setIsPast(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      setIsPast(false);
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [activeTarget]);

  return (
    <section 
      id="countdowns" 
      className="py-24 px-6 bg-zinc-950/80 border-b border-white/5 relative overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-[30%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-rose-500/5 blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold font-serif text-zinc-100"
          >
            Counting Down The Moments
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
            Anticipating our upcoming milestones, special events, and future trips together.
          </motion.p>
        </div>

        {/* Tab Selection buttons */}
        <div className="flex justify-center gap-3 mb-12">
          {countdownsData.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setSelectedIdx(index)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                selectedIdx === index
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200'
              }`}
            >
              {item.id === 'anniversary' ? <Calendar className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
              {item.title}
            </button>
          ))}
        </div>

        {/* Countdown display cards */}
        <div className="bg-zinc-900/40 border border-white/5 p-8 sm:p-12 rounded-3xl shadow-xl backdrop-blur-md relative overflow-hidden">
          
          <div className="absolute top-4 right-4 text-rose-500/10">
            <Hourglass className="w-24 h-24 stroke-[1]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTarget.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 relative z-10"
            >
              <div className="text-center max-w-lg mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mb-2">
                  {activeTarget.title}
                </h3>
                <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mb-4">
                  {new Date(activeTarget.targetDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  {activeTarget.description}
                </p>
              </div>

              {/* Countdown Ticker Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto pt-6">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds }
                ].map((unit) => (
                  <div 
                    key={unit.label}
                    className="bg-zinc-950/60 border border-white/5 p-5 rounded-2xl flex flex-col items-center shadow-lg group hover:border-white/10 transition-colors"
                  >
                    <span className="text-3xl sm:text-4xl font-extrabold font-sans text-white text-gradient-rose-violet">
                      {isPast ? 0 : String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1 group-hover:text-rose-400 transition-colors">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              {isPast && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl max-w-sm mx-auto text-sm font-medium mt-6"
                >
                  The big day is here! Celebrate together!
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
