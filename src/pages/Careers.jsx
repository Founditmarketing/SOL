import { motion } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Heart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Careers() {
  return (
    <div style={{ paddingTop: '8rem' }}>
      <section className="page-hero" style={{ position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#000' }}>
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80" alt="Power line crew at work" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.4), #000 100%)', zIndex: 1 }} />
        <div className="container" style={{ zIndex: 2, padding: '4rem 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label">Join the Crew</div>
            <h1 className="section-title" style={{ maxWidth: '500px' }}>Build Your Future<br/>With Us</h1>
          </motion.div>
        </div>
      </section>

      <section className="section page-section" style={{ background: '#000' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <p className="page-body" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(240,240,250,0.5)', marginBottom: '3rem' }}>
            SolPowerlines maintains procedures to ensure that all employees are qualified to perform their job duties through a vetting program and we are partnered with community colleges.
          </p>

          <div className="page-card-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(240,240,250,0.06)', marginBottom: '3rem' }}>
            {[
              { icon: <TrendingUp size={20} color="#F5A623" />, title: 'Competitive Pay & Advancement', desc: 'Industry-leading compensation with clear paths for career growth.' },
              { icon: <Shield size={20} color="#F5A623" />, title: 'Safety-First Culture', desc: 'CUSP-certified safety leadership and comprehensive training programs.' },
              { icon: <Heart size={20} color="#F5A623" />, title: 'People Matter More', desc: 'A diverse, supportive workforce that values every team member.' }
            ].map((item, idx) => (
              <motion.div key={idx} className="page-card" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                style={{ background: '#000', padding: '2rem', display: 'flex', gap: '1.25rem' }}>
                <div style={{ flexShrink: 0, marginTop: '0.2rem' }}>{item.icon}</div>
                <div>
                  <h3 className="card-title" style={{ fontFamily: 'Inter', fontSize: '1rem', fontWeight: 600, color: '#f0f0fa', marginBottom: '0.3rem' }}>{item.title}</h3>
                  <p className="card-body" style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'rgba(240,240,250,0.6)' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(240,240,250,0.06)', paddingTop: '2rem' }}>
            <h3 className="page-accent-title" style={{ fontFamily: 'Barlow Condensed', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1rem' }}>Applicant Requirements</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '3rem' }}>
              {['Valid CDL license Class A', 'Mandatory drug testing', 'Proof of Qualification — includes "Test-Outs" and "Hands-on Evaluations" specific to job task requirements'].map((req, idx) => (
                <li key={idx} className="page-body" style={{ fontSize: '0.9rem', color: 'rgba(240,240,250,0.6)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--amber)', marginTop: '0.2rem' }}>—</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="https://powergrid.rec.pro.ukg.net/POW1011GRID/JobBoard/b61b95ff-758c-43a5-88a2-4fbcfd6c3e40/?q=&o=postedDateDesc" target="_blank" rel="noopener noreferrer" className="btn btn-red" style={{ flex: 1, justifyContent: 'center' }}>
              See All Job Openings <ExternalLink size={14} style={{ marginLeft: '8px' }} />
            </a>
            <Link to="/contact" className="btn btn-blue" style={{ flex: 1, justifyContent: 'center' }}>
              Contact Us <ArrowRight size={14} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
