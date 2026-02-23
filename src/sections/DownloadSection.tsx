import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Apple, Play, Share2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DownloadSectionProps {
  className?: string;
}

const DownloadSection = ({ className = '' }: DownloadSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: true,
          }
        }
      );

      gsap.fromTo(cardRef.current?.querySelectorAll('.animate-btn') || [],
        { scale: 0.98, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 75%',
            end: 'top 55%',
            scrub: true,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="download"
      className={`relative bg-vita-bg py-24 lg:py-32 ${className}`}
    >
      {/* Subtle gradient vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-vita-accent/5 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative">
        <div 
          ref={cardRef}
          className="glass-card-strong p-8 lg:p-12 text-center"
        >
          <h2 className="font-heading text-[clamp(28px,3.2vw,48px)] font-bold text-vita-text leading-tight mb-6">
            Ready when you need it
          </h2>
          <p className="text-vita-text-muted text-[clamp(15px,1.2vw,18px)] leading-relaxed mb-10 max-w-xl mx-auto">
            Download VITA. Set up your profile. Get peace of mind—free.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="animate-btn w-full sm:w-auto px-8 py-4 bg-vita-accent text-vita-bg font-semibold rounded-full hover:bg-vita-accent/90 transition-all hover:scale-105 flex items-center justify-center gap-3">
              <Apple size={24} />
              <div className="text-left">
                <div className="text-xs opacity-80">Download on the</div>
                <div className="text-lg leading-none">App Store</div>
              </div>
            </button>
            <button className="animate-btn w-full sm:w-auto px-8 py-4 bg-vita-accent text-vita-bg font-semibold rounded-full hover:bg-vita-accent/90 transition-all hover:scale-105 flex items-center justify-center gap-3">
              <Play size={24} />
              <div className="text-left">
                <div className="text-xs opacity-80">Get it on</div>
                <div className="text-lg leading-none">Google Play</div>
              </div>
            </button>
          </div>
          
          {/* Secondary CTA */}
          <button className="animate-btn mt-6 px-6 py-3 border border-white/20 text-vita-text rounded-full hover:border-vita-accent/50 hover:text-vita-accent transition-colors flex items-center justify-center gap-2 mx-auto">
            <Share2 size={18} />
            Share VITA with family
          </button>
        </div>
        
        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="font-heading text-xl font-bold text-vita-text">VITA</span>
          </div>
          <p className="text-vita-text-muted text-sm mb-4">
            AI-powered emergency response & first-aid guidance
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-vita-text-muted">
            <button className="hover:text-vita-accent transition-colors">Privacy</button>
            <button className="hover:text-vita-accent transition-colors">Terms</button>
            <button className="hover:text-vita-accent transition-colors">Contact</button>
          </div>
          <p className="text-vita-text-muted/60 text-xs mt-6">
            © 2026 VITA. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default DownloadSection;
