import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, MapPin, Phone, Users, AlertCircle, Activity, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  
  // Working SOS demo state
  const [sosActive, setSosActive] = useState(false);
  const [sosProgress, setSosProgress] = useState(0);
  const [emergencyStep, setEmergencyStep] = useState(0);

  const emergencySteps = [
    { icon: MapPin, text: 'Capturing GPS location...', status: 'locating' },
    { icon: Phone, text: 'Alerting nearest clinic...', status: 'alerting' },
    { icon: Users, text: 'Notifying emergency contacts...', status: 'notifying' },
    { icon: Activity, text: 'Activating guidance mode...', status: 'active' },
  ];

  // SOS Demo functionality
  const activateSOS = () => {
    setSosActive(true);
    setSosProgress(0);
    setEmergencyStep(0);
    
    // Simulate SOS activation progress
    const interval = setInterval(() => {
      setSosProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 25) setEmergencyStep(1);
        if (newProgress >= 50) setEmergencyStep(2);
        if (newProgress >= 75) setEmergencyStep(3);
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };

  const resetSOS = () => {
    setSosActive(false);
    setSosProgress(0);
    setEmergencyStep(0);
  };

  // Auto-play entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(bgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 },
        0
      );

      tl.fromTo(cardRef.current,
        { y: 18, opacity: 0, rotateX: 10 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9 },
        0.2
      );

      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word');
        tl.fromTo(words,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.04 },
          0.4
        );
      }

      tl.fromTo([subtitleRef.current, ctaRef.current],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        0.7
      );

      tl.fromTo(screenshotRef.current,
        { x: 60, opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, duration: 1 },
        0.5
      );

      tl.fromTo(featuresRef.current?.querySelectorAll('.feature-item') || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        0.9
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([cardRef.current, titleRef.current, subtitleRef.current, ctaRef.current, screenshotRef.current], {
              opacity: 1, x: 0, y: 0, rotateZ: 0, rotateX: 0
            });
          }
        }
      });

      scrollTl.fromTo(bgRef.current,
        { y: 0 },
        { y: '-2vh', ease: 'none' },
        0
      );

      scrollTl.fromTo(cardRef.current,
        { x: 0, opacity: 1, rotateZ: 0 },
        { x: '-28vw', opacity: 0, rotateZ: -2, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo([titleRef.current, subtitleRef.current, ctaRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(screenshotRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="hero" className={`section-pinned ${className}`}>
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0 }}>
        <img src="/hero_hands_phone.jpg" alt="Emergency response" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-vita-bg/60 via-vita-bg/40 to-vita-bg/80" />
        {/* Modern overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-vita-accent/10 to-transparent" />
      </div>

      <div ref={cardRef} className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[min(90vw,1200px)] h-[min(80vh,600px)] lg:h-[min(65vh,600px)] glass-card flex flex-col lg:flex-row items-center justify-between p-4 sm:p-6 lg:p-10 backdrop-blur-2xl border border-white/10" style={{ opacity: 0 }}>
        <div className="flex flex-col justify-center h-full w-full lg:w-auto lg:max-w-[48%] lg:max-w-[44%] text-center lg:text-left">
          <div className="mb-2">
            <span className="mono-label text-vita-accent bg-vita-accent/10 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">One-Tap Emergency - Built for Africa</span>
          </div>
          
          <h1 ref={titleRef} className="font-heading text-[clamp(20px,4vw,32px)] sm:text-[clamp(24px,3.2vw,48px)] font-bold text-vita-text leading-tight mb-4">
            <span className="word inline-block">AI</span>{' '}
            <span className="word inline-block">that</span>{' '}
            <span className="word inline-block">answers</span>{' '}
            <span className="word inline-block">when</span>{' '}
            <span className="word inline-block">seconds</span>{' '}
            <span className="word inline-block">matter.</span>
          </h1>
          
          <p ref={subtitleRef} className="text-vita-text-muted text-[clamp(12px,2.5vw,15px)] sm:text-[clamp(13px,1vw,16px)] leading-relaxed mb-4" style={{ opacity: 0 }}>
            VITA guides you through emergencies—step by step—until help arrives. 
            Designed for African communities with offline support and local languages.
          </p>
          
          <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
            {emergencySteps.map((action, index) => (
              <div key={index} className="feature-item flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10" style={{ opacity: 0 }}>
                <action.icon size={14} className={index <= emergencyStep && sosActive ? 'text-vita-accent' : 'text-vita-text-muted'} />
                <span className="text-vita-text text-xs">{action.text}</span>
              </div>
            ))}
          </div>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4" style={{ opacity: 0 }}>
            {!sosActive ? (
              <button onClick={activateSOS} className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-all hover:scale-105 flex items-center justify-center gap-2 animate-pulse-glow shadow-lg hover:shadow-red-500/25">
                <AlertCircle size={18} />
                Try SOS Demo
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 transition-all duration-100" style={{ width: `${sosProgress}%` }} />
                  </div>
                  <span className="text-red-400 text-sm font-medium">{sosProgress}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-vita-accent animate-pulse" />
                  <span className="text-vita-text text-sm">{emergencySteps[emergencyStep]?.text}</span>
                </div>
                {sosProgress >= 100 && (
                  <button onClick={resetSOS} className="px-4 py-2 bg-vita-accent text-vita-bg text-sm font-semibold rounded-full hover:bg-vita-accent/90 transition-colors">
                    Reset Demo
                  </button>
                )}
              </div>
            )}
            <button onClick={scrollToHowItWorks} className="text-vita-text-muted hover:text-vita-accent transition-colors text-sm flex items-center gap-1 mt-2 sm:mt-0">
              See how it works
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <div ref={screenshotRef} className="relative h-[40vh] sm:h-[50vh] lg:h-[85%] w-full lg:w-auto aspect-[9/19] lg:aspect-auto rounded-3xl overflow-hidden shadow-2xl animate-float mt-6 lg:mt-0 border border-white/20" style={{ opacity: 0 }}>
          <img src="/ui_mock_sos.jpg" alt="VITA SOS Emergency Interface" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-vita-bg/30 to-transparent" />
          {/* Modern phone frame effect */}
          <div className="absolute inset-0 border-2 border-white/20 rounded-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
