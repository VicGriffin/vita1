import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Map, Download, Brain, WifiOff, Check, BookOpen, Shield, Bug, Droplets, Thermometer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface OfflineSectionProps {
  className?: string;
}

const africanEmergencyGuides = [
  { icon: Bug, label: 'Snake Bites', region: 'Common in rural areas' },
  { icon: Droplets, label: 'Malaria', region: 'Sub-Saharan Africa' },
  { icon: Thermometer, label: 'Fever Management', region: 'Essential skill' },
  { icon: Shield, label: 'Bleeding Control', region: 'Universal' },
  { icon: BookOpen, label: 'Burns & Scalds', region: 'Household risk' },
  { icon: Shield, label: 'Fractures', region: 'Rural accidents' },
];

const offlineFeatures = [
  { icon: Brain, label: 'Local AI Model', desc: 'Works without internet' },
  { icon: Map, label: 'Cached Maps', desc: 'GPS without data' },
  { icon: BookOpen, label: 'Preloaded Guides', desc: 'Text, diagrams, voice' },
];

const OfflineSection = ({ className = '' }: OfflineSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  
  const [downloadedGuides, setDownloadedGuides] = useState<string[]>(['Snake Bites', 'Malaria', 'Bleeding Control']);
  const [downloading, setDownloading] = useState<string | null>(null);

  const downloadGuide = (guide: string) => {
    if (downloadedGuides.includes(guide)) return;
    
    setDownloading(guide);
    setTimeout(() => {
      setDownloadedGuides(prev => [...prev, guide]);
      setDownloading(null);
    }, 1500);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.7,
        }
      });

      scrollTl.fromTo(wipeRef.current,
        { y: '100vh' },
        { y: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(cardRef.current,
        { y: '60vh', opacity: 0, rotateX: 12 },
        { y: 0, opacity: 1, rotateX: 0, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(titleRef.current,
        { x: '-18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(bodyRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(screenshotRef.current,
        { x: '50vw', opacity: 0, scale: 0.97 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(cardRef.current,
        { x: 0, opacity: 1 },
        { x: '28vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(screenshotRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="offline" className={`section-pinned ${className}`}>
      <div ref={wipeRef} className="absolute inset-0 bg-vita-bg-secondary" style={{ transform: 'translateY(100vh)' }} />

      <div className="absolute inset-0 w-full h-full">
        <img src="/rural_road.jpg" alt="Offline capability" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-vita-bg/70 via-vita-bg/50 to-vita-bg/80" />
      </div>

      <div ref={cardRef} className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[min(92vw,1200px)] h-[min(65vh,600px)] glass-card flex items-center justify-between p-6 lg:p-10">
        <div ref={bodyRef} className="flex flex-col justify-center h-full max-w-[45%]">
          <div className="mb-2 flex items-center gap-2">
            <WifiOff size={14} className="text-vita-accent" />
            <span className="mono-label text-vita-accent">Offline-First for Africa</span>
          </div>
          
          <h2 ref={titleRef} className="font-heading text-[clamp(24px,2.8vw,44px)] font-bold text-vita-text leading-tight mb-4">
            Works without signal
          </h2>
          
          <p className="text-vita-text-muted text-[clamp(13px,1vw,16px)] leading-relaxed mb-4">
            Downloaded guides, offline maps, and local AI—ready when networks aren't. 
            Critical for rural African communities with poor connectivity.
          </p>
          
          {/* Downloadable Guides - Interactive */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Download size={14} className="text-vita-accent" />
              <span className="text-vita-text text-xs font-medium">Emergency Guides for Africa</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {africanEmergencyGuides.map((guide, index) => {
                const isDownloaded = downloadedGuides.includes(guide.label);
                const isDownloading = downloading === guide.label;
                
                return (
                  <button
                    key={index}
                    onClick={() => downloadGuide(guide.label)}
                    disabled={isDownloaded || isDownloading}
                    className={`flex items-center gap-2 p-2 rounded-lg text-left transition-all ${
                      isDownloaded 
                        ? 'bg-vita-accent/20 border border-vita-accent/50' 
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isDownloaded ? 'bg-vita-accent' : 'bg-white/20'
                    }`}>
                      {isDownloaded ? (
                        <Check size={12} className="text-vita-bg" />
                      ) : isDownloading ? (
                        <div className="w-3 h-3 border-2 border-vita-accent border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <guide.icon size={12} className="text-vita-text-muted" />
                      )}
                    </div>
                    <div>
                      <span className={`text-xs block ${isDownloaded ? 'text-vita-text' : 'text-vita-text-muted'}`}>
                        {guide.label}
                      </span>
                      <span className="text-[9px] text-vita-text-muted/70">{guide.region}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-vita-text-muted text-[10px] mt-2">
              {downloadedGuides.length} of {africanEmergencyGuides.length} guides downloaded
            </p>
          </div>

          {/* Offline Features */}
          <div className="grid grid-cols-3 gap-2">
            {offlineFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col items-center p-2 rounded-xl bg-white/5 border border-white/10">
                <feature.icon size={18} className="text-vita-accent mb-1" />
                <span className="text-vita-text text-[10px] font-medium text-center">{feature.label}</span>
                <span className="text-vita-text-muted text-[9px] text-center">{feature.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={screenshotRef} className="relative h-[85%] aspect-[9/19] rounded-2xl overflow-hidden shadow-2xl animate-float">
          <img src="/ui_mock_offline.jpg" alt="VITA Offline Mode" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-vita-bg/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default OfflineSection;
