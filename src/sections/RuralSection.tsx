import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Mic, LayoutGrid } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface RuralSectionProps {
  className?: string;
}

const features = [
  { icon: Globe, text: 'Multilingual' },
  { icon: Mic, text: 'Speech-to-text' },
  { icon: LayoutGrid, text: 'Icon navigation' },
];

const RuralSection = ({ className = '' }: RuralSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);

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

      // Phase 1 (0-30%): Entrance with wipe
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

      // Phase 3 (70-100%): Exit
      scrollTl.fromTo(cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-28vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(screenshotRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(wipeRef.current,
        { y: 0 },
        { y: '-12vh', ease: 'power2.in' },
        0.8
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="rural-section"
      className={`section-pinned ${className}`}
    >
      {/* Wipe Panel */}
      <div 
        ref={wipeRef}
        className="absolute inset-0 bg-vita-bg-secondary"
        style={{ transform: 'translateY(100vh)' }}
      />

      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/rural_road.jpg" 
          alt="Rural landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-vita-bg/70 via-vita-bg/50 to-vita-bg/80" />
      </div>

      {/* Glass Card */}
      <div 
        ref={cardRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[min(88vw,1140px)] h-[min(58vh,540px)] glass-card flex items-center justify-between p-8 lg:p-12"
      >
        {/* Left Content */}
        <div ref={bodyRef} className="flex flex-col justify-center h-full max-w-[40%]">
          <h2 
            ref={titleRef}
            className="font-heading text-[clamp(26px,3vw,48px)] font-bold text-vita-text leading-tight mb-6"
          >
            Built for every community
          </h2>
          
          <p className="text-vita-text-muted text-[clamp(14px,1.1vw,18px)] leading-relaxed mb-8">
            Voice-first, icon-driven, and multilingual—so anyone can act fast.
          </p>
          
          {/* Feature Chips */}
          <div className="flex flex-wrap gap-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="feature-chip flex items-center gap-2"
              >
                <feature.icon size={16} />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Screenshot */}
        <div 
          ref={screenshotRef}
          className="relative h-[90%] aspect-[9/19] rounded-2xl overflow-hidden shadow-2xl animate-float"
        >
          <img 
            src="/ui_mock_home.jpg" 
            alt="VITA Multilingual Interface"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vita-bg/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default RuralSection;
