import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled 
            ? 'bg-vita-bg/80 backdrop-blur-xl border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-heading text-xl sm:text-2xl font-bold text-vita-text hover:text-vita-accent transition-colors"
            >
              VITA
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('rural-section')}
                className="text-sm text-vita-text-muted hover:text-vita-text transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-sm text-vita-text-muted hover:text-vita-text transition-colors"
              >
                How it works
              </button>
              <button 
                onClick={() => scrollToSection('download')}
                className="px-5 py-2.5 bg-vita-accent text-vita-bg text-sm font-semibold rounded-full hover:bg-vita-accent/90 transition-colors"
              >
                Download
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-vita-text hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-[999] bg-vita-bg/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 p-6">
          <button 
            onClick={() => scrollToSection('rural-section')}
            className="text-xl sm:text-2xl font-heading text-vita-text hover:text-vita-accent transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="text-xl sm:text-2xl font-heading text-vita-text hover:text-vita-accent transition-colors"
          >
            How it works
          </button>
          <button 
            onClick={() => scrollToSection('download')}
            className="w-full max-w-xs px-6 py-3 bg-vita-accent text-vita-bg text-base sm:text-lg font-semibold rounded-full hover:bg-vita-accent/90 transition-colors"
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
