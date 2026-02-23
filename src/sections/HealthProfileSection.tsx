import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertCircle, Heart, Pill, Droplets, FileText, Lock, Eye, UserCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HealthProfileSectionProps {
  className?: string;
}

const healthData = [
  { icon: Droplets, label: 'Blood Type', desc: 'Critical for transfusions' },
  { icon: AlertCircle, label: 'Allergies', desc: 'Medication & food alerts' },
  { icon: Heart, label: 'Chronic Conditions', desc: 'Diabetes, asthma, etc.' },
  { icon: Pill, label: 'Medications', desc: 'Current prescriptions' },
];

const emergencyAccessFeatures = [
  { icon: Eye, label: 'First Responder View', desc: 'Critical info visible' },
  { icon: Lock, label: 'Read-Only Access', desc: 'Cannot modify data' },
  { icon: UserCheck, label: 'No Unlock Required', desc: 'Accessible in emergencies' },
];

const HealthProfileSection = ({ className = '' }: HealthProfileSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blockARef = useRef<HTMLDivElement>(null);
  const blockBRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Block A animation
      gsap.fromTo(blockARef.current?.querySelectorAll('.animate-item') || [],
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: blockARef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: true,
          }
        }
      );

      gsap.fromTo(blockARef.current?.querySelector('.animate-image') || null,
        { y: '10vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: blockARef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: true,
          }
        }
      );

      // Block B animation
      gsap.fromTo(blockBRef.current?.querySelectorAll('.animate-item') || [],
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: blockBRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: true,
          }
        }
      );

      gsap.fromTo(blockBRef.current?.querySelector('.animate-image') || null,
        { y: '10vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: blockBRef.current,
            start: 'top 75%',
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
      id="health-profile"
      className={`relative bg-vita-bg py-24 lg:py-32 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Block A - Health Profile */}
        <div ref={blockARef} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="animate-item mb-2">
              <span className="mono-label text-vita-accent">Health Profile</span>
            </div>
            
            <h2 className="animate-item font-heading text-[clamp(28px,3.2vw,48px)] font-bold text-vita-text leading-tight mb-6">
              Your health profile
            </h2>
            
            <p className="animate-item text-vita-text-muted text-[clamp(15px,1.2vw,18px)] leading-relaxed mb-8">
              Allergies, conditions, medications—stored securely to improve AI accuracy 
              and warn about dangerous interactions.
            </p>
            
            {/* Health Data */}
            <div className="animate-item grid grid-cols-2 gap-3 mb-6">
              {healthData.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="w-10 h-10 rounded-full bg-vita-accent/20 flex items-center justify-center">
                    <item.icon size={18} className="text-vita-accent" />
                  </div>
                  <div>
                    <span className="text-vita-text text-sm font-medium block">{item.label}</span>
                    <span className="text-vita-text-muted text-xs">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Used For */}
            <div className="animate-item p-4 rounded-xl bg-vita-accent/10 border border-vita-accent/30">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={14} className="text-vita-accent" />
                <span className="text-vita-text text-sm font-medium">Used to:</span>
              </div>
              <ul className="space-y-1 text-vita-text-muted text-xs">
                <li>• Improve AI accuracy for personalized guidance</li>
                <li>• Warn about dangerous medication interactions</li>
                <li>• Alert responders to critical conditions</li>
              </ul>
            </div>
          </div>
          
          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="animate-image relative aspect-[4/3] rounded-3xl overflow-hidden shadow-glass">
              <img 
                src="/ui_mock_profile.jpg" 
                alt="Health profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vita-bg/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Block B - Emergency Access Mode */}
        <div ref={blockBRef} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div>
            <div className="animate-image relative aspect-[4/3] rounded-3xl overflow-hidden shadow-glass">
              <img 
                src="/hands_phone_close.jpg" 
                alt="Emergency access"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vita-bg/50 to-transparent" />
              
              {/* Emergency Access Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-red-500/90 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Eye size={20} className="text-white" />
                  </div>
                  <div>
                    <span className="text-white font-semibold text-sm block">Emergency Access Mode</span>
                    <span className="text-white/80 text-xs">First responders can view critical info</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Text Content */}
          <div>
            <div className="animate-item mb-2">
              <span className="mono-label text-vita-accent">Emergency Access</span>
            </div>
            
            <h2 className="animate-item font-heading text-[clamp(28px,3.2vw,48px)] font-bold text-vita-text leading-tight mb-6">
              First responder access
            </h2>
            
            <p className="animate-item text-vita-text-muted text-[clamp(15px,1.2vw,18px)] leading-relaxed mb-8">
              In emergencies, first responders can view your critical health information 
              without unlocking your phone—saving precious time.
            </p>
            
            {/* Emergency Access Features */}
            <div className="animate-item space-y-3">
              {emergencyAccessFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthProfileSection;
