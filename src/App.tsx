import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import HowItWorksSection from './sections/HowItWorksSection';
import SymptomAnalysisSection from './sections/SymptomAnalysisSection';
import ImageAnalysisSection from './sections/ImageAnalysisSection';
import OfflineSection from './sections/OfflineSection';
import VoiceAccessibilitySection from './sections/VoiceAccessibilitySection';
import NavigationSection from './sections/NavigationSection';
import CommunitySection from './sections/CommunitySection';
import HealthProfileSection from './sections/HealthProfileSection';
import TrainingSection from './sections/TrainingSection';
import PrivacySection from './sections/PrivacySection';
import DownloadSection from './sections/DownloadSection';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;
            
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-vita-bg min-h-screen">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <main className="relative">
        {/* Core Emergency Features */}
        <HeroSection className="z-10" />
        <HowItWorksSection className="z-20" />
        
        {/* AI Analysis Features */}
        <SymptomAnalysisSection className="z-30" />
        <ImageAnalysisSection className="z-40" />
        
        {/* Accessibility & Offline */}
        <OfflineSection className="z-50" />
        <VoiceAccessibilitySection className="z-[60]" />
        
        {/* Navigation & Community */}
        <NavigationSection className="z-[70]" />
        <CommunitySection className="z-[80]" />
        
        {/* Profile & Training */}
        <HealthProfileSection className="z-[90]" />
        <TrainingSection className="z-[100]" />
        
        {/* Trust & Download */}
        <PrivacySection className="z-[110]" />
        <DownloadSection className="z-[120]" />
      </main>
    </div>
  );
}

export default App;
