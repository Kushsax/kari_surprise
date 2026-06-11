import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react';
import coverArt from '../assets/Carousel main.jpeg';

interface Track {
  title: string;
  artist: string;
  url: string;
  coverUrl: string;
}

const tracks: Track[] = [
  {
    title: "I Think They Call This Love",
    artist: "Elliot James Reay",
    url: "/i_think_they_call_this_love.mp3", // Sourced locally from public folder
    coverUrl: coverArt
  }
];

export default function MusicPlayer() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const activeTrack = tracks[currentIdx];

  // Sync audio instances on track changes (only run when index actually changes)
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (audioRef.current) {
      audioRef.current.src = activeTrack.url;
      audioRef.current.load();
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => setIsPlaying(false));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx]);

  // Audio Play/Pause listeners
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch((err) => {
              console.error("Audio playback error:", err);
              setIsPlaying(false);
            });
        } else {
          setIsPlaying(true);
        }
      } catch (err) {
        console.error("Immediate play crash:", err);
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    handleNext();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const muted = !isMuted;
    setIsMuted(muted);
    audioRef.current.muted = muted;
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
  };

  // Canvas visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const barCount = 28;
    const barWidth = 3;
    const gap = 3;
    const heights = Array(barCount).fill(2);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < barCount; i++) {
        // Rhythmic animation when playing, quiet when paused
        if (isPlaying) {
          const freq = 0.05 + (i * 0.02);
          const noise = Math.sin(Date.now() * freq) * 12 + Math.sin(Date.now() * 0.01) * 4;
          heights[i] = Math.max(3, 12 + noise + Math.random() * 6);
        } else {
          // Slow decay down to idle bar size
          heights[i] = heights[i] * 0.9 + 2 * 0.1;
        }

        const x = i * (barWidth + gap);
        const y = canvas.height - heights[i];

        // Draw double-sided glow bar
        const grad = ctx.createLinearGradient(0, y, 0, canvas.height);
        grad.addColorStop(0, '#f43f5e'); // Rose
        grad.addColorStop(0.5, '#ec4899'); // Pink
        grad.addColorStop(1, '#8b5cf6'); // Violet

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, heights[i]);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  // Format MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-[340px] w-[calc(100vw-48px)]">
      {/* HTML5 Audio Core */}
      <audio
        ref={audioRef}
        src={activeTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />

      {/* Floating Glassmorphic Player Card */}
      <div className="bg-zinc-950/80 border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-lg relative overflow-hidden group">
        
        {/* Spotlighting subtle background glow */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-rose-500/5 blur-2xl group-hover:bg-rose-500/10 transition-colors pointer-events-none" />

        <div className="flex items-center gap-3.5 relative z-10">
          
          {/* Cover Art (Spins when playing) */}
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 relative bg-zinc-800 flex items-center justify-center">
              <img 
                src={activeTrack.coverUrl} 
                alt="Track Cover" 
                className={`w-full h-full object-cover transition-transform duration-[8s] linear infinite ${
                  isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''
                }`}
              />
              <div className="absolute inset-0 rounded-full border border-black/20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-white/10" />
              </div>
            </div>
          </div>

          {/* Track Details & Visualizer */}
          <div className="flex-1 min-w-0 text-left">
            <div className="flex justify-between items-start">
              <div className="min-w-0 pr-2">
                <h4 className="text-xs font-bold text-white truncate font-sans">
                  {activeTrack.title}
                </h4>
                <p className="text-[10px] text-zinc-500 truncate mt-0.5 font-light">
                  {activeTrack.artist}
                </p>
              </div>
              
              {/* Visualizer Canvas */}
              <canvas 
                ref={canvasRef} 
                width={160} 
                height={24} 
                className="w-24 h-4 shrink-0 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Timeline Slider (Current time, Duration, Scrub-bar) */}
        <div className="mt-3 relative z-10">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-rose-500 hover:bg-white/10 transition-colors"
          />
          <div className="flex justify-between items-center text-[9px] text-zinc-500 font-semibold mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Media Interaction Buttons */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 relative z-10">
          
          {/* Mute and volume */}
          <div className="flex items-center gap-1.5 group/vol w-24">
            <button 
              onClick={toggleMute} 
              className="text-zinc-500 hover:text-rose-400 transition-colors"
              aria-label="Toggle mute"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-rose-500 opacity-0 group-hover/vol:opacity-100 transition-opacity w-14"
            />
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrev} 
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="Previous track"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg transition-transform duration-250 active:scale-95"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>

            <button 
              onClick={handleNext} 
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="Next track"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Music indicator symbol */}
          <div className="w-6 text-right">
            <Music className={`w-3.5 h-3.5 text-rose-500 inline-block ${
              isPlaying ? 'animate-bounce' : 'opacity-30'
            }`} />
          </div>

        </div>

      </div>
    </div>
  );
}
