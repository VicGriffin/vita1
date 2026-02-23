import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scan, Info, Eye, Flame, Bug, Bandage } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ImageAnalysisSectionProps {
  className?: string;
}

const analyzableConditions = [
  { icon: Bandage, label: 'Wounds', desc: 'Infection risk, bleeding severity' },
  { icon: Flame, label: 'Burns', desc: 'Depth assessment, area affected' },
  { icon: Scan, label: 'Rashes', desc: 'Pattern analysis, severity' },
  { icon: Bug, label: 'Bites', desc: 'Venomous indicators' },
];

const riskIndicators = [
  { label: 'Low', color: 'bg-green-500', width: '30%' },
  { label: 'Medium', color: 'bg-yellow-500', width: '60%' },
  { label: 'High', color: 'bg-red-500', width: '90%' },
];

const ImageAnalysisSection = ({ className = '' }: ImageAnalysisSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  const [selectedCondition, setSelectedCondition] = useState(0);

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

      // Phase 1 (0-30%): Entrance
      scrollTl.fromTo(cardRef.current,
        { x: '60vw', opacity: 0, rotateY: 18 },
        { x: 0, opacity: 1, rotateY: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(titleRef.current,
        { x: '-18vw', opacity: 0 },
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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="image-analysis"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/hands_phone_close.jpg" 
          alt="Image analysis"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-vita-bg/70 via-vita-bg/50 to-vita-bg/80" />
      </div>

      {/* Glass Card */}
      <div 
        ref={cardRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[min(92vw,1200px)] h-[min(65vh,600px)] glass-card flex items-center justify-between p-6 lg:p-10"
      >
        {/* Left Content */}
        <div ref={bodyRef} className="flex flex-col justify-center h-full max-w-[45%]">
          <div className="mb-2">
            <span className="mono-label text-vita-accent">Visual AI Detection</span>
          </div>
          
          <h2 
            ref={titleRef}
            className="font-heading text-[clamp(24px,2.8vw,44px)] font-bold text-vita-text leading-tight mb-4"
          >
            Image scanning & threat detection
          </h2>
          
          <p className="text-vita-text-muted text-[clamp(13px,1vw,16px)] leading-relaxed mb-5">
            Take photos of injuries or conditions. VITA's AI analyzes visual risks 
            and provides clear explanations—no medical jargon.
          </p>
          
          {/* Analyzable Conditions */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {analyzableConditions.map((condition, index) => (
              <button
                key={index}
                onClick={() => setSelectedCondition(index)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                  selectedCondition === index 
                    ? 'bg-vita-accent/20 border-vita-accent/50' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <condition.icon size={18} className="text-vita-accent" />
                <div>
                  <span className="text-vita-text text-xs font-medium block">{condition.label}</span>
                  <span className="text-vita-text-muted text-[10px]">{condition.desc}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Risk Confidence */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Eye size={14} className="text-vita-accent" />
              <span className="text-vita-text text-xs font-medium">Visual Risk Assessment</span>
            </div>
            <div className="space-y-2">
              {riskIndicators.map((risk, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-vita-text-muted text-xs w-14">{risk.label}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${risk.color} rounded-full`} style={{ width: risk.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <Info size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-yellow-400/80 text-xs">
              This is not a medical diagnosis. Always consult a healthcare professional for serious conditions.
            </span>
          </div>
        </div>

        {/* Right Screenshot */}
        <div 
          ref={screenshotRef}
          className="relative h-[85%] aspect-[9/19] rounded-2xl overflow-hidden shadow-2xl animate-float"
        >
          <img 
            src="/ui_mock_camera.jpg" 
            alt="VITA Image Analysis"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vita-bg/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default ImageAnalysisSection;
