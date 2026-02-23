import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Bell, HeartHandshake, Shield, UserCheck, Navigation, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CommunitySectionProps {
  className?: string;
}

const emergencyContacts = [
  { icon: Users, label: 'Family Members', desc: 'Immediate notification' },
  { icon: HeartHandshake, label: 'Friends', desc: 'Location & status updates' },
  { icon: UserCheck, label: 'Caregivers', desc: 'Medical history access' },
];

const responderTypes = [
  { icon: Shield, label: 'Trained Volunteers', desc: 'Local first aid certified' },
  { icon: Navigation, label: 'Community Responders', desc: 'Nearby helpers notified' },
  { icon: MapPin, label: 'Emergency Services', desc: 'Direct facility alerts' },
];

const CommunitySection = ({ className = '' }: CommunitySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
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
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(screenshotRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="community"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/outdoor_user_phone.jpg" 
          alt="Community support"
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
          <div className="mb-2 flex items-center gap-2">
            <Users size={14} className="text-vita-accent" />
            <span className="mono-label text-vita-accent">Community Network</span>
          </div>
          
          <h2 
            ref={titleRef}
            className="font-heading text-[clamp(24px,2.8vw,44px)] font-bold text-vita-text leading-tight mb-4"
          >
            You're not alone
          </h2>
          
          <p className="text-vita-text-muted text-[clamp(13px,1vw,16px)] leading-relaxed mb-5">
            Emergency contacts get automatic notifications with your location and status. 
            Community responders nearby can opt-in to help—especially vital in rural areas.
          </p>
          
          {/* Emergency Contacts */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Bell size={14} className="text-vita-accent" />
              <span className="text-vita-text text-xs font-medium">Emergency Contacts Receive:</span>
            </div>
            <div className="space-y-2">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-vita-accent/20 flex items-center justify-center">
                    <contact.icon size={14} className="text-vita-accent" />
                  </div>
                  <div>
                    <span className="text-vita-text text-xs font-medium">{contact.label}</span>
                    <span className="text-vita-text-muted text-[10px] block">{contact.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Responder Mode */}
          <div className="p-4 rounded-xl bg-vita-accent/10 border border-vita-accent/30">
            <div className="flex items-center gap-2 mb-3">
              <HeartHandshake size={14} className="text-vita-accent" />
              <span className="text-vita-text text-xs font-medium">Community Responder Mode</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {responderTypes.map((responder, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <responder.icon size={16} className="text-vita-accent mb-1" />
                  <span className="text-vita-text text-[10px] font-medium">{responder.label}</span>
                </div>
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
            src="/ui_mock_community.jpg" 
            alt="VITA Community Network"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vita-bg/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
