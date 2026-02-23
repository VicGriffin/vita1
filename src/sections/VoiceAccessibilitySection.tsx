import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mic, Globe, Volume2, Speaker, Play, Pause } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VoiceAccessibilitySectionProps {
  className?: string;
}

const africanLanguages = [
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', sample: 'Habari, ninaumwa kichwa' },
  { code: 'ha', name: 'Hausa', native: 'Hausa', sample: 'Ina ciwo a kai' },
  { code: 'yo', name: 'Yoruba', native: 'Yorùbá', sample: 'Mo ni irora ori' },
  { code: 'am', name: 'Amharic', native: 'አማርኛ', sample: 'ራስ ምታት አለኝ' },
  { code: 'zu', name: 'Zulu', native: 'isiZulu', sample: 'Ngiphethwe yikhanda' },
  { code: 'ig', name: 'Igbo', native: 'Igbo', sample: 'M na-ahụ mgbu isi' },
  { code: 'af', name: 'Afrikaans', native: 'Afrikaans', sample: 'Ek het hoofpyn' },
  { code: 'so', name: 'Somali', native: 'Soomaali', sample: 'Madax xanuun baan qabaa' },
];

const voiceFeatures = [
  { icon: Volume2, label: 'Voice Instructions', desc: 'Spoken guidance' },
  { icon: Mic, label: 'Speech-to-Text', desc: 'Speak in any language' },
  { icon: Speaker, label: 'Audible Alerts', desc: 'Emergency notifications' },
];

const VoiceAccessibilitySection = ({ className = '' }: VoiceAccessibilitySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  
  const [selectedLang, setSelectedLang] = useState(africanLanguages[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSample = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 2000);
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

      scrollTl.fromTo(cardRef.current,
        { x: '-60vw', opacity: 0, rotateY: -18 },
        { x: 0, opacity: 1, rotateY: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(titleRef.current,
        { x: '18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(bodyRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(screenshotRef.current,
        { x: '50vw', opacity: 0, scale: 0.97 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(cardRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(screenshotRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="voice-accessibility" className={`section-pinned ${className}`}>
      <div className="absolute inset-0 w-full h-full">
        <img src="/rural_road.jpg" alt="Rural accessibility" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-vita-bg/70 via-vita-bg/50 to-vita-bg/80" />
      </div>

      <div ref={cardRef} className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[min(92vw,1200px)] h-[min(65vh,600px)] glass-card flex items-center justify-between p-6 lg:p-10">
        <div ref={bodyRef} className="flex flex-col justify-center h-full max-w-[45%]">
          <div className="mb-2 flex items-center gap-2">
            <Globe size={14} className="text-vita-accent" />
            <span className="mono-label text-vita-accent">African Languages & Voice</span>
          </div>
          
          <h2 ref={titleRef} className="font-heading text-[clamp(24px,2.8vw,44px)] font-bold text-vita-text leading-tight mb-4">
            Voice-first, icon-driven
          </h2>
          
          <p className="text-vita-text-muted text-[clamp(13px,1vw,16px)] leading-relaxed mb-4">
            Designed for everyone—including those who can't read well or are panicking. 
            Speak in your local African language.
          </p>
          
          {/* Language Selector with Demo */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe size={14} className="text-vita-accent" />
              <span className="text-vita-text text-xs font-medium">Select Language:</span>
            </div>
            
            <div className="grid grid-cols-4 gap-1 mb-3">
              {africanLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-2 py-1.5 text-[10px] rounded-lg transition-colors ${
                    selectedLang.code === lang.code
                      ? 'bg-vita-accent text-vita-bg'
                      : 'bg-white/10 text-vita-text hover:bg-white/20'
                  }`}
                >
                  <span className="block font-medium">{lang.name}</span>
                  <span className="opacity-70">{lang.native}</span>
                </button>
              ))}
            </div>
            
            {/* Voice Demo */}
            <div className="p-3 rounded-lg bg-vita-accent/10 border border-vita-accent/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-vita-text text-xs font-medium">Sample phrase:</p>
                  <p className="text-vita-accent text-sm">"{selectedLang.sample}"</p>
                  <p className="text-vita-text-muted text-[10px]">("I have a headache")</p>
                </div>
                <button 
                  onClick={playSample}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isPlaying ? 'bg-vita-accent animate-pulse' : 'bg-vita-accent/30 hover:bg-vita-accent/50'
                  }`}
                >
                  {isPlaying ? <Pause size={16} className="text-vita-bg" /> : <Play size={16} className="text-vita-accent" />}
                </button>
              </div>
            </div>
          </div>

          {/* Voice Features */}
          <div className="grid grid-cols-3 gap-2">
            {voiceFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col items-center p-2 rounded-xl bg-white/5 border border-white/10">
                <feature.icon size={16} className="text-vita-accent mb-1" />
                <span className="text-vita-text text-[10px] font-medium text-center">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={screenshotRef} className="relative h-[85%] aspect-[9/19] rounded-2xl overflow-hidden shadow-2xl animate-float">
          <img src="/ui_mock_voice.jpg" alt="VITA Voice Interface" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-vita-bg/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default VoiceAccessibilitySection;
