import { motion } from 'framer-motion';
import { Target, Users, Zap, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <section className="section" style={{ padding: '2rem 2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'center' }}>
            
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}>
                <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80" alt="Transmission Lines" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, border: '1px solid var(--glass-border)', borderRadius: '16px', pointerEvents: 'none', zIndex: 2 }}></div>
                
                <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', background: 'var(--red)', padding: '1.2rem 1.5rem', borderRadius: '10px', zIndex: 3, boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', color: 'var(--dark)', lineHeight: 1 }}>VOSB</div>
                  <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--dark)', fontWeight: 700, marginTop: '0.2rem' }}>Veteran-Owned</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <div className="section-label">Proven Heritage</div>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.5rem' }}>FAMILY OWNED.<br/><span style={{ color: 'var(--blue)', textShadow: '0 0 20px rgba(0, 168, 255,0.4)' }}>VALUES DRIVEN.</span></h2>
              
              {/* Crushed Walls of Text into punchy bullets/blurbs */}
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                <li style={{ fontSize: '1.1rem', color: 'var(--text)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--blue)', borderRadius: '50%', marginTop: '0.5rem', flexShrink: 0, boxShadow: '0 0 10px var(--blue)' }} />
                  <span><strong>Fastest-Growing:</strong> A premier overhead and underground utility contractor in the Gulf South.</span>
                </li>
                <li style={{ fontSize: '1.1rem', color: 'var(--text)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--blue)', borderRadius: '50%', marginTop: '0.5rem', flexShrink: 0, boxShadow: '0 0 10px var(--blue)' }} />
                  <span><strong>Veteran-Owned:</strong> Disciplined, mission-ready teams delivering world-class maintenance and response.</span>
                </li>
                <li style={{ fontSize: '1.1rem', color: 'var(--text)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--blue)', borderRadius: '50%', marginTop: '0.5rem', flexShrink: 0, boxShadow: '0 0 10px var(--blue)' }} />
                  <span><strong>Relentless Execution:</strong> From city centers to the deep swamp, we complete projects safely and on time.</span>
                </li>
              </ul>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                {[
                  { title: 'Safety First', icon: <ShieldCheck size={20} color="var(--blue)" />, desc: '0 Compromises' },
                  { title: 'People Focused', icon: <Users size={20} color="var(--blue)" />, desc: 'Elite Crews' },
                  { title: 'Mission Ready', icon: <Zap size={20} color="var(--blue)" />, desc: 'Storm Response' },
                  { title: 'Proven Results', icon: <Target size={20} color="var(--blue)" />, desc: '1,000+ Projects' }
                ].map((val) => (
                  <div key={val.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', background: 'var(--dark2)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(0, 168, 255,0.08)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {val.icon}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'Barlow Condensed', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white)' }}>{val.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--blue)', marginTop: '0.2rem' }}>{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Style for mobile breakpoint */}
      <style>{`
        @media(max-width: 900px) {
          .container > div {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
