import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import PowerToggle from './PowerToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  const navItems = ['Home', 'About', 'Services', 'Who We Serve', 'Safety', 'Careers', 'Contact'];

  // Homepage has full-viewport dark hero — transparent nav OK
  // Inner pages have paddingTop gap — always use scrolled/solid style
  const isHome = location.pathname === '/';
  const useScrolled = scrolled || !isHome;
  const headerClass = useScrolled ? 'site-header site-header--scrolled' : 'site-header site-header--transparent';

  return (
    <>
      <header className={headerClass} style={{
        backgroundColor: useScrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
        backdropFilter: useScrolled ? 'blur(12px)' : 'none',
        borderBottom: useScrolled ? '1px solid rgba(240,240,250,0.06)' : 'none',
        padding: useScrolled ? '0.7rem 2rem' : '1.2rem 2rem',
        position: 'fixed', width: '100%', zIndex: 1000, transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1300px', margin: '0 auto' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/sol-logo.svg" alt="SolPowerlines" style={{ height: '36px', objectFit: 'contain' }} />
          </Link>

          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              {navItems.map((item) => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`;
                const isActive = location.pathname === path;
                return (
                  <Link key={item} to={path} className="nav-link"
                    style={{ fontFamily: 'Barlow Condensed', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: isActive ? '#F5A623' : 'rgba(240,240,250,0.6)', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#F5A623'}
                    onMouseOut={(e) => e.currentTarget.style.color = isActive ? '#F5A623' : 'rgba(240,240,250,0.6)'}>
                    {item}
                  </Link>
                );
              })}
            </div>
            <div style={{ width: '1px', height: '20px', background: 'rgba(240,240,250,0.1)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <PowerToggle />
              <a href="tel:3187760557" className="btn" style={{
                padding: '0.5rem 1.2rem', fontSize: '0.7rem', borderRadius: '100px',
                background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)',
                color: 'var(--amber)', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
              }}>
                <Phone size={12} style={{ marginRight: '6px' }} /> 318.776.0557
              </a>
            </div>
          </nav>

          <div className="mobile-toggle" style={{ display: 'none', alignItems: 'center' }}>
            <button onClick={() => setMobileMenuOpen(true)} className="mobile-menu-btn" style={{ background: 'none', border: 'none', color: '#f0f0fa', cursor: 'pointer', padding: '10px' }}>
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      <style>{`@media (max-width: 900px) { .desktop-nav { display: none !important; } .mobile-toggle { display: flex !important; } }`}</style>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1001 }} onClick={() => setMobileMenuOpen(false)} />
            <motion.div className="mobile-menu-panel" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ ease: 'circOut', duration: 0.3 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '85vw', maxWidth: '320px', zIndex: 1002, background: '#0a0a0a', borderLeft: '1px solid rgba(240,240,250,0.06)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <span style={{ fontFamily: 'Barlow Condensed', color: 'var(--amber)', letterSpacing: '0.2em', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase' }}>Menu</span>
                <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: '1px solid rgba(240,240,250,0.1)', color: '#f0f0fa', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                {navItems.map((item) => (
                  <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`} className="mobile-nav-link"
                    style={{ fontFamily: 'Inter', fontSize: '1.1rem', fontWeight: 500, color: '#f0f0fa', padding: '1rem 0', borderBottom: '1px solid rgba(240,240,250,0.06)' }}>
                    {item}
                  </Link>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <PowerToggle />
                <a href="tel:3187760557" className="btn btn-red" style={{ flex: 1, justifyContent: 'center' }}>
                  <Phone size={16} style={{ marginRight: '8px' }} /> 318.776.0557
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
