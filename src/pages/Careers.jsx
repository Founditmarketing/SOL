import { motion } from 'framer-motion';
import { ArrowRight, Drill, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Careers() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '0' }}>
      <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '2rem 2rem 4rem' }}>
        <div className="container">
          <div style={{ background: 'var(--dark2)', border: '1px solid var(--glass-border)', borderRadius: '16px', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', minHeight: '500px' }} className="career-grid">
            
            <div style={{ padding: '4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ position: 'relative', zIndex: 1 }}>
                <div className="section-label">Join The Crew</div>
                <h1 className="section-title">BUILD YOUR FUTURE<br/><span style={{ color: 'var(--blue)', textShadow: '0 0 20px rgba(0, 168, 255,0.4)' }}>WITH US</span></h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  We invest in our people with industry-leading training, rapid advancement, and a culture that prioritizes your safety above all else.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '3rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(0, 168, 255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><TrendingUp size={18} color="var(--blue)" /></div>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--white)' }}>Competitive Pay & Advancement</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(0, 168, 255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Shield size={18} color="var(--blue)" /></div>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--white)' }}>Industry-Leading Safety Training</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(0, 168, 255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Drill size={18} color="var(--blue)" /></div>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--white)' }}>Veteran-Friendly Culture</span>
                  </div>
                </div>

                <Link to="/contact" className="btn btn-blue" style={{ width: '100%' }}>View Open Positions <ArrowRight size={18} style={{ marginLeft: '10px' }} /></Link>
              </motion.div>
            </div>

            <div style={{ position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?w=800&q=80" alt="Construction Worker" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, var(--dark2) 0%, transparent 40%)' }}></div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @media(max-width: 900px) {
          .career-grid { grid-template-columns: 1fr !important; }
          .career-grid > div:nth-child(2) { min-height: 300px; }
          .career-grid > div:nth-child(1) { padding: 3rem 2rem !important; }
        }
      `}</style>
    </div>
  );
}
