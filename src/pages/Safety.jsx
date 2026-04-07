import { motion } from 'framer-motion';
import { ShieldAlert, Eye, AlertTriangle, UserCheck, Award } from 'lucide-react';

export default function Safety() {
  return (
    <div style={{ paddingTop: '8rem' }}>
      <section style={{ position: 'relative', minHeight: '40vh', display: 'flex', alignItems: 'center', background: '#000' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.5), #000)', zIndex: 1 }} />
        <div className="container" style={{ zIndex: 2, padding: '4rem 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label">Safety Program</div>
            <h1 className="section-title" style={{ maxWidth: '600px' }}>Safety First,<br/>People Minded</h1>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ background: '#000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }} className="safety-grid">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(240,240,250,0.5)', marginBottom: '2rem' }}>
                At Sol Powerlines, safety isn't a slogan or a shifting priority. It's part of professional execution. We emphasize thorough planning, clear communication, and continuous training so our crews can perform high-quality work while managing risk responsibly.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'rgba(240,240,250,0.4)', marginBottom: '3rem' }}>
                Our safety and health program focuses on hazard recognition, accountability at every level, and compliance with OSHA and industry standards. Every employee is expected to take ownership of safety, support their crew, and stop work when conditions aren't right.
              </p>

              {/* Certifications */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: 'rgba(240,240,250,0.06)' }}>
                {['ISNetworld', 'Avetta', 'Veriforce'].map((cert) => (
                  <div key={cert} style={{ background: '#000', padding: '1.5rem', textAlign: 'center' }}>
                    <Award size={20} color="#F5A623" style={{ marginBottom: '0.5rem' }} />
                    <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)' }}>Grade A</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(240,240,250,0.4)', marginTop: '0.2rem' }}>{cert}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(240,240,250,0.06)' }}>
              {[
                { icon: <ShieldAlert size={20} color="#F5A623" />, title: 'Human Performance Program', desc: 'Physiological training to identify potential, predictable, and preventable unsafe events. Training and education on human performance tools company-wide.' },
                { icon: <Eye size={20} color="#F5A623" />, title: 'Behavior-Based Safety', desc: 'Developed to improve employee safety performance by increasing the frequency of critical safe behaviors with direct employee involvement.' },
                { icon: <AlertTriangle size={20} color="#F5A623" />, title: 'Stop-Work Authority', desc: 'Every employee is empowered — and obligated — to stop work if conditions are unsafe. No exceptions, no retribution.' },
                { icon: <UserCheck size={20} color="#F5A623" />, title: 'CUSP Certified Leadership', desc: 'Our Safety Manager Kevin Sasser holds the Certified Utility Safety Professional credential — dedicated to safety excellence.' }
              ].map((p, idx) => (
                <div key={idx} style={{ background: '#000', padding: '2rem', display: 'flex', gap: '1rem' }}>
                  <div style={{ flexShrink: 0, marginTop: '0.2rem' }}>{p.icon}</div>
                  <div>
                    <h4 style={{ fontFamily: 'Inter', fontSize: '0.95rem', fontWeight: 600, color: '#f0f0fa', marginBottom: '0.4rem' }}>{p.title}</h4>
                    <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(240,240,250,0.4)' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`@media(max-width: 900px) { .safety-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }`}</style>
    </div>
  );
}
