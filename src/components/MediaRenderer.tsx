import { useState, useEffect } from 'react';

interface MediaRendererProps {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  controls?: boolean;
}

const isVideoUrl = (url: string) => {
  return /\.(mp4|webm|ogg|mov)($|\?)/i.test(url) || url.toLowerCase().includes('video');
};

export default function MediaRenderer({
  src,
  fallback,
  alt,
  className = "w-full h-full object-cover",
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false
}: MediaRendererProps) {
  const [mediaSrc, setMediaSrc] = useState(src);
  const [failed, setFailed] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  // Sync state if source prop changes dynamically (e.g., in a carousel)
  if (src !== prevSrc) {
    setPrevSrc(src);
    setMediaSrc(src);
    setFailed(false);
  }

  useEffect(() => {
    setMediaSrc(src);
    setFailed(false);
  }, [src]);

  const isVideo = isVideoUrl(mediaSrc);

  if (isVideo) {
    return (
      <video
        src={mediaSrc}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        className={className}
        onError={() => {
          if (!failed && fallback) {
            setMediaSrc(fallback);
            setFailed(true);
          }
        }}
      />
    );
  }

  return (
    <img
      src={mediaSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (!failed && fallback) {
          setMediaSrc(fallback);
          setFailed(true);
        }
      }}
    />
  );
}
