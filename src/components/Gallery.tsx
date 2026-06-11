import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Calendar } from 'lucide-react';
import { galleryItems } from '../content/gallery';
import MediaRenderer from './MediaRenderer';

type CategoryFilter = 'all' | 'adventure' | 'cozy' | 'special';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (id: string) => {
    const idx = galleryItems.findIndex(item => item.id === id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev! - 1));
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev! + 1));
  };

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'All Memories' },
    { value: 'adventure', label: 'Adventures' },
    { value: 'cozy', label: 'Cozy Moments' },
    { value: 'special', label: 'Special Dates' }
  ];

  return (
    <section 
      id="gallery" 
      className="py-24 px-6 bg-zinc-950 border-b border-white/5 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold font-serif text-zinc-100"
          >
            Moments Captured
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
            A visual record of our favorite days, lazy weekends, and unforgettable memories.
          </motion.p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat.value
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="group relative bg-zinc-900 border border-white/5 rounded-xl overflow-hidden shadow-xl aspect-square cursor-pointer"
                onClick={() => openLightbox(item.id)}
              >
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-300 z-10" />
                
                {/* Photo hover overlay scale effect */}
                <MediaRenderer 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-4 right-4 p-2 bg-zinc-900/80 border border-white/10 rounded-full text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hover:text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Slider Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-950/95 flex items-center justify-center p-4 sm:p-8 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button 
              onClick={closeLightbox} 
              className="absolute top-4 right-4 p-3 bg-white/5 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200 z-55"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev button */}
            <button
              onClick={prevImage}
              className="absolute left-4 p-3 bg-white/5 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200 z-55"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={nextImage}
              className="absolute right-4 p-3 bg-white/5 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200 z-55"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image and details Panel */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="max-w-4xl w-full bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-54 flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media viewport */}
              <div className="md:w-3/5 bg-black aspect-video md:aspect-square flex items-center justify-center relative">
                <MediaRenderer
                  src={galleryItems[lightboxIndex].url}
                  alt={galleryItems[lightboxIndex].title}
                  className="w-full h-full object-cover"
                  controls={true}
                  muted={false}
                />
              </div>

              {/* Text info side */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between text-left bg-zinc-900/50">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-[10px] font-bold uppercase tracking-wider text-rose-400">
                      {galleryItems[lightboxIndex].category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-zinc-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(galleryItems[lightboxIndex].date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                    {galleryItems[lightboxIndex].title}
                  </h3>

                  <div className="h-px bg-white/5" />

                  <p className="text-sm text-zinc-400 leading-relaxed font-light">
                    {galleryItems[lightboxIndex].description}
                  </p>
                </div>

                <div className="text-xs text-zinc-600 mt-8 flex justify-between">
                  <span>Photo {lightboxIndex + 1} of {galleryItems.length}</span>
                  <span>Use ← and → keys to browse</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
