import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelpCircle, Award, BookOpen, Play, Star, TrendingUp, AlertTriangle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TrainingSectionProps {
  className?: string;
}

const learningFeatures = [
  { icon: BookOpen, label: 'Short Lessons', desc: 'Bite-sized first aid training' },
  { icon: Play, label: 'Visual Demos', desc: 'Step-by-step video guides' },
  { icon: HelpCircle, label: 'Quizzes', desc: 'Test your knowledge' },
  { icon: Award, label: 'Badges', desc: 'Earn certifications' },
];

const firstAidTopics = [
  'CPR & Choking',
  'Bleeding Control',
  'Burn Treatment',
  'Fracture Care',
  'Snake Bites',
  'Allergic Reactions',
];

const riskAlerts = [
  { icon: AlertTriangle, text: 'This wound should be checked.' },
  { icon: TrendingUp, text: 'Delaying care could increase risk.' },
  { icon: Star, text: 'Monitor for changes every 2 hours.' },
];

const TrainingSection = ({ className = '' }: TrainingSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current?.querySelectorAll('.animate-item') || [],
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: true,
          }
        }
      );

      gsap.fromTo(contentRef.current?.querySelector('.animate-image') || null,
        { y: '10vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: true,
          }
        }
      );

      // Parallax on image
      gsap.to(contentRef.current?.querySelector('.animate-image') || null,
        {
          y: '-2vh',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
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
      id="training"
      className={`relative bg-vita-bg py-24 lg:py-32 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div>
            <div className="animate-item mb-2">
              <span className="mono-label text-vita-accent">Learning & Prevention</span>
            </div>
            
            <h2 className="animate-item font-heading text-[clamp(28px,3.2vw,48px)] font-bold text-vita-text leading-tight mb-6">
              Learn by doing
            </h2>
            
            <p className="animate-item text-vita-text-muted text-[clamp(15px,1.2vw,18px)] leading-relaxed mb-8">
              Short scenarios, quick decisions, and skills that stick—no boring lectures. 
              Be prepared before emergencies happen.
            </p>
            
            {/* Learning Features */}
            <div className="animate-item grid grid-cols-2 gap-3 mb-6">
              {learningFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="w-10 h-10 rounded-full bg-vita-accent/20 flex items-center justify-center">
                    <feature.icon size={18} className="text-vita-accent" />
                  </div>
                  <div>
                    <span className="text-vita-text text-sm font-medium block">{feature.label}</span>
                    <span className="text-vita-text-muted text-xs">{feature.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* First Aid Topics */}
            <div className="animate-item p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={14} className="text-vita-accent" />
                <span className="text-vita-text text-sm font-medium">Available Lessons</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {firstAidTopics.map((topic, index) => (
                  <span key={index} className="px-3 py-1 bg-vita-accent/10 text-vita-accent text-xs rounded-full">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Risk Awareness Alerts */}
            <div className="animate-item p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={14} className="text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">Risk Awareness Alerts</span>
              </div>
              <div className="space-y-2">
                {riskAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <alert.icon size={12} className="text-yellow-400" />
                    <span className="text-yellow-400/80 text-xs">{alert.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div>
            <div className="animate-image relative aspect-[4/3] rounded-3xl overflow-hidden shadow-glass">
              <img 
                src="/ui_mock_training.jpg" 
                alt="Gamified training"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vita-bg/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
