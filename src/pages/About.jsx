import { motion } from 'framer-motion';
import { Users, Zap, ShieldCheck, Heart } from 'lucide-react';

export default function About() {
  return (
    <div style={{ paddingTop: '8rem' }}>
      {/* Hero */}
      <section className="page-hero" style={{ position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#000' }}>
        <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=80" alt="Power Lines" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, #000 100%)', zIndex: 1 }} />
        <div className="container" style={{ zIndex: 2, padding: '4rem 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label">Who We Are</div>
            <h1 className="section-title" style={{ maxWidth: '600px' }}>Dedicated to Excellence<br/>and Integrity</h1>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section page-section" style={{ background: '#000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }} className="about-grid">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <p className="page-body" style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'rgba(240,240,250,0.5)', marginBottom: '1.5rem' }}>
                SolPowerlines has the highest dedication to our employees and customers, bringing forth excellence and integrity to every task and challenge for tomorrow's possibilities.
              </p>
              <p className="page-body" style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(240,240,250,0.6)' }}>
                We have provided utility construction services to Investment Owned Utilities, Electric Cooperatives, and Municipalities for years — making Sol a proven and trusted partner in the power utility space. You can count on our dependability to complete the job as we tackle today's challenges and tomorrow's possibilities.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h3 className="page-accent-title" style={{ fontFamily: 'Barlow Condensed', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1.5rem' }}>People Matter More</h3>
              <p className="page-body" style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(240,240,250,0.6)', marginBottom: '1.5rem' }}>
                At the forefront of our company and our partner companies, is the value that people matter more. We stand behind this principle because prioritizing people also prioritizes their safety, experience, and overall well-being.
              </p>
              <p className="page-body" style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(240,240,250,0.6)' }}>
                This same principle spans to our customers, partners, and community as well. We strive to create a diverse workforce that values this same philosophy. You can count on us to keep safety first while staying people minded.
              </p>
            </motion.div>
          </div>

          <div className="page-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(240,240,250,0.06)', marginTop: '5rem' }}>
            {[
              { icon: <ShieldCheck size={20} color="#F5A623" />, title: 'Safety First', desc: 'Zero compromises' },
              { icon: <Heart size={20} color="#F5A623" />, title: 'People Minded', desc: 'Our core value' },
              { icon: <Zap size={20} color="#F5A623" />, title: '24/7 Response', desc: 'Storm ready' },
              { icon: <Users size={20} color="#F5A623" />, title: 'Trusted Partner', desc: 'Proven & dependable' }
            ].map((val, idx) => (
              <motion.div key={idx} className="page-card" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                style={{ background: '#000', padding: '2.5rem 2rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '1rem', opacity: 0.8 }}>{val.icon}</div>
                <h4 className="card-title" style={{ fontFamily: 'Inter', fontSize: '0.95rem', color: '#f0f0fa', fontWeight: 600, marginBottom: '0.3rem' }}>{val.title}</h4>
                <p className="card-body" style={{ fontSize: '0.8rem', color: 'rgba(240,240,250,0.35)' }}>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section page-section leadership-section" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(240,240,250,0.06)' }}>
        <div className="container">
          <div className="section-label">Leadership</div>
          <h2 className="section-title" style={{ marginBottom: '3rem' }}>Our Team</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
            {[
              { name: 'Gavin Lemoine', role: 'Director of Operations', bio: 'With over 25 years of experience in overhead and underground electrical distribution, Gavin brings extensive expertise to the team. Key responsibilities include contract compliance and negotiation, change order management, crew and project tracking, and overseeing submittals and approvals.' },
              { name: 'Josh Fleming', role: 'Operations Manager', bio: 'With over 18 years of experience in overhead and underground electrical distribution, Josh oversees the design, development, and construction of power and communication infrastructure projects. He collaborates with executives and project managers to plan projects, set timelines, and allocate resources.' },
              { name: 'Kevin Sasser', role: 'Safety Manager', bio: 'Kevin began his utility career in 1999 building a foundation in line work and distribution. He earned his Certified Utility Safety Professional (CUSP) credential in November 2025 and is dedicated to safety leadership, workforce development, and operational excellence.' }
            ].map((person, idx) => (
              <motion.div key={idx} className="page-card" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                style={{ borderLeft: '2px solid var(--amber)', paddingLeft: '2rem' }}>
                <h3 className="card-title" style={{ fontFamily: 'Inter', fontSize: '1.1rem', color: '#f0f0fa', fontWeight: 600, marginBottom: '0.2rem' }}>{person.name}</h3>
                <div className="page-accent-title" style={{ fontFamily: 'Barlow Condensed', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1rem' }}>{person.role}</div>
                <p className="card-body" style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(240,240,250,0.6)' }}>{person.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`@media(max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } .container > div[style*="repeat(4"] { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </div>
  );
}
