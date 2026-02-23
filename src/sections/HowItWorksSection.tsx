import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Radio, AlertTriangle, Brain, ChevronRight, Mic } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HowItWorksSectionProps {
  className?: string;
}

const HowItWorksSection = ({ className = '' }: HowItWorksSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { 
      icon: Smartphone, 
      title: 'One-Tap Trigger',
      desc: 'Large emergency button usable by any age group. Works instantly even when phone is locked (optional).'
    },
    { 
      icon: Brain, 
      title: 'Smart Analysis',
      desc: 'AI asks follow-up questions: "How long has this been happening?" "Are you bleeding?" "Can you breathe normally?"'
    },
    { 
      icon: Radio, 
      title: 'Auto Escalation',
      desc: 'If unresponsive or critical severity detected, VITA auto-sends distress signals and shares location.',
      alert: true
    },
  ];

  const followUpQuestions = [
    "How long has this been happening?",
    "Are you bleeding?",
    "Can you breathe normally?",
    "Where is the pain located?",
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
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
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(screenshotRef.current,
        { x: '50vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.05
      );

      // Phase 3 (70-100%): Exit
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
    <section 
      ref={sectionRef}
      id="how-it-works"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/outdoor_user_phone.jpg" 
          alt="Using VITA outdoors"
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
            <span className="mono-label text-vita-accent">Emergency Detection</span>
          </div>
          
          <h2 
            ref={titleRef}
            className="font-heading text-[clamp(24px,2.8vw,44px)] font-bold text-vita-text leading-tight mb-4"
          >
            How VITA works
          </h2>
          
          <p className="text-vita-text-muted text-[clamp(13px,1vw,16px)] leading-relaxed mb-5">
            Open the app. Follow the steps. Get clear guidance while help is on the way. 
            VITA adapts to you—even if you don't know medical terms.
          </p>
          
          {/* Tabs */}
          <div className="space-y-3 mb-5">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                  activeTab === index 
                    ? 'bg-vita-accent/20 border-vita-accent/50' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tab.alert ? 'bg-red-500/20' : 'bg-vita-accent/20'
                }`}>
                  <tab.icon size={20} className={tab.alert ? 'text-red-400' : 'text-vita-accent'} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-vita-text font-medium text-sm">{tab.title}</span>
                    {tab.alert && <AlertTriangle size={14} className="text-red-400" />}
                  </div>
                  <span className="text-vita-text-muted text-xs">{tab.desc}</span>
                </div>
                <ChevronRight size={16} className="text-vita-text-muted" />
              </button>
            ))}
          </div>

          {/* Smart Questions Preview */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Mic size={14} className="text-vita-accent" />
              <span className="text-vita-text text-xs font-medium">Smart Follow-up Questions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {followUpQuestions.map((q, i) => (
                <span key={i} className="px-2 py-1 bg-vita-accent/10 text-vita-accent text-xs rounded-full">
                  "{q}"
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Screenshot */}
        <div 
          ref={screenshotRef}
          className="relative h-[85%] aspect-[9/19] rounded-2xl overflow-hidden shadow-2xl animate-float"
        >
          <img 
            src="/ui_mock_severity.jpg" 
            alt="VITA Severity Score Interface"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vita-bg/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
