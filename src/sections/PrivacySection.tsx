import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lock, Database, UserCheck, Shield, Eye, Server, AlertTriangle, Info } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PrivacySectionProps {
  className?: string;
}

const privacyPillars = [
  { icon: Lock, title: 'Encrypted', description: 'End-to-end encryption for all data' },
  { icon: Database, title: 'Minimal Data', description: 'Only collect what\'s necessary' },
  { icon: UserCheck, title: 'You Control It', description: 'Transparent data controls' },
];

const dataProtection = [
  { icon: Shield, label: 'Local Encryption', desc: 'Data encrypted on your device' },
  { icon: Server, label: 'Minimal Cloud', desc: 'Limited server storage' },
  { icon: Eye, label: 'User Controlled', desc: 'You choose what to share' },
];

const aiLimitations = [
  'VITA provides guidance, not medical diagnosis',
  'Always consult healthcare professionals for serious conditions',
  'AI confidence levels are clearly displayed',
  'Emergency services should be called for critical situations',
];

const PrivacySection = ({ className = '' }: PrivacySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current?.querySelector('.animate-title') || null,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            end: 'top 55%',
            scrub: true,
          }
        }
      );

      gsap.fromTo(contentRef.current?.querySelectorAll('.animate-pillar') || [],
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            end: 'top 50%',
            scrub: true,
          }
        }
      );

      gsap.fromTo(contentRef.current?.querySelectorAll('.animate-limitation') || [],
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 65%',
            end: 'top 45%',
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
      id="privacy"
      className={`relative bg-vita-bg py-24 lg:py-32 ${className}`}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div ref={contentRef} className="text-center">
          {/* Title */}
          <h2 className="animate-title font-heading text-[clamp(28px,3.2vw,48px)] font-bold text-vita-text leading-tight mb-6">
            Your data stays yours
          </h2>
          <p className="animate-title text-vita-text-muted text-[clamp(15px,1.2vw,18px)] leading-relaxed mb-12 max-w-2xl mx-auto">
            Encryption, minimal collection, and transparent controls—built in from day one.
          </p>
          
          {/* Privacy Pillars */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {privacyPillars.map((pillar, index) => (
              <div 
                key={index}
                className="animate-pillar p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-vita-accent/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-vita-accent/20 flex items-center justify-center mx-auto mb-4">
                  <pillar.icon size={28} className="text-vita-accent" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-vita-text mb-2">
                  {pillar.title}
                </h3>
                <p className="text-vita-text-muted text-sm">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Data Protection */}
          <div className="animate-pillar p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Shield size={20} className="text-vita-accent" />
              <span className="text-vita-text font-semibold">Data Protection</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {dataProtection.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <item.icon size={24} className="text-vita-accent mb-2" />
                  <span className="text-vita-text text-sm font-medium">{item.label}</span>
                  <span className="text-vita-text-muted text-xs">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Limitations */}
          <div className="animate-limitation p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/30">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Info size={20} className="text-yellow-400" />
              <span className="text-yellow-400 font-semibold">AI Limitations & Transparency</span>
            </div>
            <div className="grid md:grid-cols-2 gap-3 text-left">
              {aiLimitations.map((limitation, index) => (
                <div key={index} className="flex items-start gap-2">
                  <AlertTriangle size={14} className="text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-yellow-400/80 text-sm">{limitation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySection;
