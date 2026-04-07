import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Zap } from 'lucide-react';
import PowerToggle from './PowerToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0a0c10]/90 backdrop-blur-md border-b border-[#00E5FF]/10 py-4' : 'bg-transparent py-6'
        }`}
        style={{
          backgroundColor: scrolled ? 'rgba(5, 7, 11, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
          padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
          position: 'fixed', width: '100%', zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1300px', margin: '0 auto' }}>
          
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
              src="https://solpowerlines.com/wp-content/uploads/2024/02/Sol_Logo-1-300x83.png" 
              alt="SolPowerlines Logo" 
              style={{ height: '40px', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              {['Home', 'About', 'Services', 'Who We Serve', 'Safety', 'Careers', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`}
                  style={{
                    fontFamily: 'Inter, sans-serif', textTransform: 'uppercase',
                    fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.12em',
                    color: location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`) ? 'var(--red)' : 'var(--white)',
                    transition: 'color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--red)'}
                  onMouseOut={(e) => e.currentTarget.style.color = location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`) ? 'var(--red)' : 'var(--white)'}
                >
                  {item}
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <a 
                href="tel:3187760557" 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.5rem', 
                  fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.8rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--white)', background: 'var(--red)', borderRadius: '2px',
                  padding: '0.6rem 1rem', transition: 'all 0.2s', minHeight: '44px'
                }}
              >
                <Zap size={14} /> 24/7 Storm Response
              </a>
              <a 
                href="tel:3187760557" 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.5rem', 
                  fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.8rem',
                  color: 'var(--white)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '2px',
                  padding: '0.6rem 1.2rem', transition: 'all 0.2s', minHeight: '44px'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.color = '#000'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--white)'; }}
              >
                <Phone size={16} /> 318.776.0557
              </a>
              <PowerToggle compact />
            </div>
          </nav>

          {/* Mobile: Power toggle + Menu burger */}
          <div className="mobile-toggle" style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }}>
            <PowerToggle compact />
            <button 
              style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', padding: '10px' }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={32} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Styling Overrides */}
      <style>{`
        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 15px rgba(230, 30, 37, 0.3); }
          50% { box-shadow: 0 0 25px rgba(230, 30, 37, 0.6); }
        }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>

      {/* Mobile Menu Bottom-Sheet (Thumb Zone) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1001, backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ ease: "circOut", duration: 0.3 }}
              style={{
                position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1002,
                background: 'var(--dark)', borderTop: '1px solid var(--red)',
                borderTopLeftRadius: '24px', borderTopRightRadius: '24px',
                padding: '2rem 2rem 4rem', display: 'flex', flexDirection: 'column', 
                boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'Barlow Condensed', color: 'var(--red)', letterSpacing: '0.15em', fontWeight: 600, textTransform: 'uppercase' }}>Navigation</span>
                <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', color: 'var(--white)', padding: '0.5rem', width: '44px', height: '44px' }}>
                  <X size={24} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {['Home', 'About', 'Services', 'Who We Serve', 'Safety', 'Careers', 'Contact'].map((item, i) => (
                  <motion.div key={item} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + (i * 0.05), duration: 0.2 }}>
                    <Link
                      to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Barlow Condensed', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: 'var(--white)', background: 'var(--dark2)', border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '8px', padding: '1rem', width: '100%'
                      }}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                <a href="tel:3187760557" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontFamily: 'Barlow Condensed', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white)', background: 'var(--red)', borderRadius: '8px', padding: '1rem' }}>
                  <Zap size={18} /> 24/7 STORM RESPONSE
                </a>
                <Link to="/careers" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontFamily: 'Barlow Condensed', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)', background: 'transparent', border: '1px solid var(--red)', borderRadius: '8px', padding: '1rem' }}>
                  Join Our Crew
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
