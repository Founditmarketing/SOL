import { Phone, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MobileActionBar() {
  return (
    <>
      <div className="mobile-action-bar" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(10, 12, 16, 0.85)', backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(0, 168, 255, 0.1)', padding: '1rem',
        display: 'none', alignItems: 'center', justifyContent: 'center', gap: '1rem'
      }}>
        <a 
          href="tel:3184435894" 
          style={{ 
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', 
            background: 'var(--dark2)', border: '1px solid rgba(255,255,255,0.1)', 
            color: 'var(--white)', padding: '0.8rem', borderRadius: '8px', 
            fontFamily: 'Barlow Condensed', fontWeight: 600, letterSpacing: '0.1em', fontSize: '1rem' 
          }}
        >
          <Phone size={18} color="var(--blue)" /> Call Us
        </a>
        <Link 
          to="/contact" 
          style={{ 
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', 
            background: 'transparent', border: '1px solid var(--blue)', color: 'var(--white)', 
            padding: '0.8rem', borderRadius: '8px', 
            fontFamily: 'Barlow Condensed', fontWeight: 700, letterSpacing: '0.1em', fontSize: '1rem',
            boxShadow: 'none'
          }}
        >
          <FileText size={18} color="var(--blue)" /> Get Quote
        </Link>
      </div>

      <style>{`
        @media(max-width: 900px) {
          .mobile-action-bar {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
