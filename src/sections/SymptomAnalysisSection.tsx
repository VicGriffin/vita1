import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Icons used in this component

gsap.registerPlugin(ScrollTrigger);

interface SymptomAnalysisSectionProps {
  className?: string;
}

const severityLevels = [
  { range: '0-30', label: 'Mild', color: 'bg-green-500', textColor: 'text-green-400', desc: 'Self-care may be sufficient' },
  { range: '31-60', label: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-400', desc: 'Monitor closely, seek care if worsens' },
  { range: '61-80', label: 'Serious', color: 'bg-orange-500', textColor: 'text-orange-400', desc: 'Medical attention advised' },
  { range: '81-100', label: 'Critical', color: 'bg-red-500', textColor: 'text-red-400', desc: 'Immediate medical attention required' },
];

const symptoms = [
  'Fever', 'Headache', 'Cough', 'Stomach Pain', 'Chest Pain', 
  'Difficulty Breathing', 'Bleeding', 'Rash', 'Vomiting', 'Diarrhea'
];

const SymptomAnalysisSection = ({ className = '' }: SymptomAnalysisSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  
  // Working severity calculator state
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('');
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
    setCalculatedScore(null);
  };

  const calculateSeverity = () => {
    let score = 0;
    
    // Base score from symptoms
    score += selectedSymptoms.length * 8;
    
    // Duration factor
    if (duration === 'hours') score += 10;
    if (duration === 'days') score += 20;
    if (duration === 'weeks') score += 30;
    
    // Self-reported severity
    if (severity === 'mild') score += 5;
    if (severity === 'moderate') score += 25;
    if (severity === 'severe') score += 45;
    
    // Cap at 100
    score = Math.min(score, 100);
    setCalculatedScore(score);
  };

  const getSeverityInfo = (score: number) => {
    if (score <= 30) return severityLevels[0];
    if (score <= 60) return severityLevels[1];
    if (score <= 80) return severityLevels[2];
    return severityLevels[3];
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
        { x: '-60vw', opacity: 0, rotateY: -18 },
        { x: 0, opacity: 1, rotateY: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(titleRef.current,
        { x: '18vw', opacity: 0 },
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
    <section ref={sectionRef} id="symptom-analysis" className={`section-pinned ${className}`}>
      <div className="absolute inset-0 w-full h-full">
        <img src="/hands_phone_close.jpg" alt="Checking symptoms" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-vita-bg/70 via-vita-bg/50 to-vita-bg/80" />
      </div>

      <div ref={cardRef} className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[min(92vw,1200px)] h-[min(65vh,600px)] glass-card flex items-center justify-between p-6 lg:p-10">
        <div ref={bodyRef} className="flex flex-col justify-center h-full max-w-[45%]">
          <div className="mb-2">
            <span className="mono-label text-vita-accent">AI Symptom Analysis</span>
          </div>
          
          <h2 ref={titleRef} className="font-heading text-[clamp(24px,2.8vw,44px)] font-bold text-vita-text leading-tight mb-4">
            Check symptoms in seconds
          </h2>
          
          <p className="text-vita-text-muted text-[clamp(13px,1vw,16px)] leading-relaxed mb-4">
            Select symptoms and answer a few questions. VITA calculates a severity score (0-100) 
            and suggests next steps.
          </p>
          
          {/* Working Symptom Calculator */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
            <p className="text-vita-text text-xs font-medium mb-2">Select Symptoms:</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {symptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    selectedSymptoms.includes(symptom)
                      ? 'bg-vita-accent text-vita-bg'
                      : 'bg-white/10 text-vita-text hover:bg-white/20'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <select 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)}
                className="px-2 py-1 bg-white/10 text-vita-text text-xs rounded-lg border border-white/20"
              >
                <option value="">How long?</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
              </select>
              
              <select 
                value={severity} 
                onChange={(e) => setSeverity(e.target.value)}
                className="px-2 py-1 bg-white/10 text-vita-text text-xs rounded-lg border border-white/20"
              >
                <option value="">How severe?</option>
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
            </div>
            
            <button 
              onClick={calculateSeverity}
              disabled={selectedSymptoms.length === 0}
              className="w-full py-2 bg-vita-accent text-vita-bg text-sm font-semibold rounded-lg hover:bg-vita-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate Severity Score
            </button>
            
            {calculatedScore !== null && (
              <div className="mt-3 p-3 rounded-lg bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-vita-text-muted text-xs">Severity Score:</span>
                  <span className={`text-2xl font-bold ${getSeverityInfo(calculatedScore).textColor}`}>
                    {calculatedScore}
                  </span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`h-full ${getSeverityInfo(calculatedScore).color} transition-all duration-500`}
                    style={{ width: `${calculatedScore}%` }}
                  />
                </div>
                <p className={`text-xs ${getSeverityInfo(calculatedScore).textColor}`}>
                  {getSeverityInfo(calculatedScore).label}: {getSeverityInfo(calculatedScore).desc}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {severityLevels.map((level, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${level.color}`} />
                <span className="text-vita-text-muted text-[10px]">{level.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={screenshotRef} className="relative h-[85%] aspect-[9/19] rounded-2xl overflow-hidden shadow-2xl animate-float">
          <img src="/ui_mock_severity.jpg" alt="VITA Symptom Analysis" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-vita-bg/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default SymptomAnalysisSection;
