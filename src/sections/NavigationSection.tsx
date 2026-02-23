import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation, Building2, Car, Bike, Footprints, Share2, Route, MapPin, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NavigationSectionProps {
  className?: string;
}

const africanFacilities = [
  { icon: Building2, label: 'District Hospital', distance: '12 km', time: '45 min' },
  { icon: Building2, label: 'Health Center', distance: '5 km', time: '15 min' },
  { icon: Building2, label: 'Community Clinic', distance: '2 km', time: '5 min' },
  { icon: Car, label: 'Ambulance Station', distance: '8 km', time: '20 min' },
];

const transportModes = [
  { icon: Footprints, label: 'Walking', desc: 'Safe paths' },
  { icon: Bike, label: 'Boda Boda', desc: 'Motorbike taxi' },
  { icon: Car, label: 'Vehicle', desc: 'Road conditions' },
];

const NavigationSectionComponent = ({ className = '' }: NavigationSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  
  const [selectedFacility, setSelectedFacility] = useState(africanFacilities[2]);
  const [selectedTransport, setSelectedTransport] = useState(transportModes[1]);
  const [sharing, setSharing] = useState(false);

  const shareLocation = () => {
    setSharing(true);
    setTimeout(() => setSharing(false), 2000);
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
    <section ref={sectionRef} id="navigation" className={`section-pinned ${className}`}>
      <div className="absolute inset-0 w-full h-full">
        <img src="/hands_phone_close.jpg" alt="Navigation to facilities" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-vita-bg/70 via-vita-bg/50 to-vita-bg/80" />
      </div>

      <div ref={cardRef} className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[min(92vw,1200px)] h-[min(65vh,600px)] glass-card flex items-center justify-between p-6 lg:p-10">
        <div ref={bodyRef} className="flex flex-col justify-center h-full max-w-[45%]">
          <div className="mb-2 flex items-center gap-2">
            <Navigation size={14} className="text-vita-accent" />
            <span className="mono-label text-vita-accent">Find Care in Africa</span>
          </div>
          
          <h2 ref={titleRef} className="font-heading text-[clamp(24px,2.8vw,44px)] font-bold text-vita-text leading-tight mb-4">
            Find the right care, fast
          </h2>
          
          <p className="text-vita-text-muted text-[clamp(13px,1vw,16px)] leading-relaxed mb-4">
            Nearest clinics, hospitals, and responders—mapped with travel time 
            and transport options for African communities.
          </p>
          
          {/* Facility Selector */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-vita-accent" />
              <span className="text-vita-text text-xs font-medium">Nearest Facilities:</span>
            </div>
            
            <div className="space-y-2 mb-3">
              {africanFacilities.map((facility, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFacility(facility)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                    selectedFacility.label === facility.label
                      ? 'bg-vita-accent/20 border border-vita-accent/50'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <facility.icon size={16} className="text-vita-accent" />
                    <span className="text-vita-text text-xs">{facility.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-vita-text-muted text-[10px]">{facility.distance}</span>
                    <span className="text-vita-accent text-[10px]">{facility.time}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Transport Mode */}
            <div className="flex items-center gap-2">
              <Route size={12} className="text-vita-accent" />
              <span className="text-vita-text-muted text-[10px]">Transport:</span>
              <div className="flex gap-1">
                {transportModes.map((mode, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTransport(mode)}
                    className={`px-2 py-0.5 text-[9px] rounded transition-colors ${
                      selectedTransport.label === mode.label
                        ? 'bg-vita-accent text-vita-bg'
                        : 'bg-white/10 text-vita-text-muted hover:bg-white/20'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Share Location */}
          <button 
            onClick={shareLocation}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl transition-colors ${
              sharing 
                ? 'bg-green-500/20 border border-green-500/50' 
                : 'bg-vita-accent/10 border border-vita-accent/30 hover:bg-vita-accent/20'
            }`}
          >
            {sharing ? (
              <>
                <Check size={16} className="text-green-400" />
                <span className="text-green-400 text-sm">Location Shared!</span>
              </>
            ) : (
              <>
                <Share2 size={16} className="text-vita-accent" />
                <span className="text-vita-text text-sm">Share Live Location</span>
              </>
            )}
          </button>
        </div>

        <div ref={screenshotRef} className="relative h-[85%] aspect-[9/19] rounded-2xl overflow-hidden shadow-2xl animate-float">
          <img src="/ui_mock_nav.jpg" alt="VITA Navigation" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-vita-bg/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default NavigationSectionComponent;
