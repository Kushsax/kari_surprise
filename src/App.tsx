import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';
import Reasons from './components/Reasons';
import LoveLetter from './components/LoveLetter';
import Quiz from './components/Quiz';
import Countdown from './components/Countdown';
import LettersContainer from './components/LettersContainer';
import MusicPlayer from './components/MusicPlayer';
import { siteConfig } from './content/siteConfig';

function App() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200 font-sans antialiased">
      {/* Dynamic Global Glow Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-rose-500/[0.02] blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-violet-500/[0.02] blur-[150px]" />
      </div>

      {/* Floating Navigation Header */}
      <Navbar />

      {/* Main Sections Wrapper */}
      <main className="relative z-10">
        <Hero />
        <Gallery />
        <Timeline />
        <Reasons />
        <LoveLetter />
        <Quiz />
        <Countdown />
        <LettersContainer />
      </main>

      {/* Persistent Audio Widget */}
      <MusicPlayer />

      {/* Footer Branding */}
      <footer className="relative z-10 py-16 bg-zinc-950 border-t border-white/5 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <p className="font-serif text-sm italic text-zinc-400">
            "We write our own chapters, day by day."
          </p>
          <div className="h-px w-8 bg-zinc-800 mx-auto" />
          <p className="tracking-wide">
            Designed with ❤️ for {siteConfig.coupleNames.partner2} by {siteConfig.coupleNames.partner1} • {new Date().getFullYear()}
          </p>
          <p className="text-[10px] text-zinc-600">
            This project is configured as a fully static application ready for GitHub Pages.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
