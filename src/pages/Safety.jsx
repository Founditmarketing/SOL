import { motion } from 'framer-motion';
import { ShieldAlert, Eye, AlertTriangle, UserCheck } from 'lucide-react';

export default function Safety() {
  const principles = [
    { num: '01', title: 'Stop-Work Authority', desc: "Every employee is empowered — and obligated — to stop work. No exceptions.", icon: <ShieldAlert size={24} color="var(--red)" /> },
    { num: '02', title: 'Immediate Investigation', desc: 'We communicate, investigate, and share lessons learned instantly.', icon: <Eye size={24} color="var(--red)" /> },
    { num: '03', title: 'Zero Delay Reporting', desc: 'All workplace incidents are reported immediately, period.', icon: <AlertTriangle size={24} color="var(--red)" /> },
    { num: '04', title: 'Personal Accountability', desc: 'Every member owns their safety and the safety of their crew.', icon: <UserCheck size={24} color="var(--red)" /> },
  ];

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <section className="section" style={{ padding: '2rem 2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'center' }}>
            
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <div className="section-label">Absolute Priorities</div>
              <h1 className="section-title">ZERO COMPROMISE<br />ON <span style={{ color: 'var(--red)', textShadow: '0 0 20px rgba(230, 30, 37,0.5)' }}>SAFETY.</span></h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--text)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Because the work we do is dangerous, we hold ourselves to the highest standards. Partnered with Knowledge Vine, we engineer safety into every protocol. Every crew, every day.
              </p>
              
              <div style={{ padding: '1.5rem', background: 'var(--dark2)', borderLeft: '4px solid var(--red)', borderRadius: '8px' }}>
                <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', color: 'var(--white)', marginBottom: '0.2rem', lineHeight: 1 }}>41,200+</h4>
                <p style={{ fontFamily: 'Barlow Condensed', fontSize: '1rem', color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>Hours Without Incident</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {principles.map((p, idx) => (
                <motion.div 
                  key={p.num}
                  whileHover={{ x: 5, borderColor: 'rgba(0, 168, 255, 0.4)' }}
                  style={{ background: 'var(--dark)', border: '1px solid var(--glass-border)', padding: '1.5rem', borderRadius: '12px', display: 'flex', gap: '1.2rem', transition: 'all 0.2s' }}
                >
                  <div style={{ width: '44px', height: '44px', flexShrink: 0, background: 'rgba(230, 30, 37,0.1)', border: '1px solid rgba(230, 30, 37,0.3)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {p.icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'Barlow Condensed', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--white)' }}>{p.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text)', marginTop: '0.2rem' }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width: 900px) {
          .container > div {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </div>
  );
}
