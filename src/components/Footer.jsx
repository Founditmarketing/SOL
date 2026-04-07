import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#000', borderTop: '1px solid rgba(240,240,250,0.06)', padding: '5rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem' }}>
        
        <div>
          <Link to="/" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
            <img src="/sol-logo.svg" alt="SolPowerlines" style={{ height: '32px' }} />
          </Link>
          <p style={{ color: 'rgba(240,240,250,0.5)', lineHeight: 1.6, maxWidth: '280px', fontSize: '0.85rem' }}>
            A dependable, knowledgeable, and trusted partner in power utility construction and emergency response.
          </p>
        </div>

        <div>
          <h4 style={{ fontFamily: 'Barlow Condensed', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,240,250,0.5)', marginBottom: '1.5rem' }}>Company</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['About', 'Safety', 'Careers', 'Contact'].map(link => (
              <li key={link}><Link to={`/${link.toLowerCase()}`} style={{ color: 'rgba(240,240,250,0.5)', fontSize: '0.85rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='#F5A623'} onMouseOut={e => e.currentTarget.style.color='rgba(240,240,250,0.5)'}>{link}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ fontFamily: 'Barlow Condensed', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,240,250,0.5)', marginBottom: '1.5rem' }}>Services</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['Distribution', 'Underground', 'Storm Restoration', 'Telecom / Fiber', 'Streetlight'].map(link => (
              <li key={link}><Link to="/services" style={{ color: 'rgba(240,240,250,0.5)', fontSize: '0.85rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='#F5A623'} onMouseOut={e => e.currentTarget.style.color='rgba(240,240,250,0.5)'}>{link}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ fontFamily: 'Barlow Condensed', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,240,250,0.5)', marginBottom: '1.5rem' }}>Contact</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><a href="tel:318-776-0557" style={{ color: 'rgba(240,240,250,0.5)', fontSize: '0.85rem' }}>318.776.0557</a></li>
            <li><a href="mailto:info@solpowerlines.com" style={{ color: 'rgba(240,240,250,0.5)', fontSize: '0.85rem' }}>info@solpowerlines.com</a></li>
            <li><span style={{ color: 'rgba(240,240,250,0.5)', fontSize: '0.85rem', lineHeight: 1.5 }}>1613 J.B. Hunt Drive #1708<br/>Alexandria, LA 71303</span></li>
          </ul>
        </div>
      </div>
      
      <div style={{ maxWidth: '1300px', margin: '4rem auto 0', paddingTop: '2rem', borderTop: '1px solid rgba(240,240,250,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontSize: '0.75rem', color: 'rgba(240,240,250,0.2)', letterSpacing: '0.05em' }}>&copy; 2026 SolPowerlines, LLC. All rights reserved.</p>
        <span style={{ fontFamily: 'Barlow Condensed', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', opacity: 0.6 }}>People Matter More</span>
      </div>

      <style>{`@media(max-width: 900px) { footer > div:first-child { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </footer>
  );
}
