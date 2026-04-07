import { motion } from 'framer-motion';
import { Zap, Shield, Wrench, ArrowRight, Cable, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    { title: 'Distribution', icon: <Zap size={22} color="#F5A623" />, desc: 'Construction and maintenance services for electrical distribution systems up to 34.5kv. New construction, maintenance services, system improvements, and complete rebuilds. Our experienced workforce are equipped and competent to glove energized voltages up to 34.5kv.' },
    { title: 'Underground', icon: <Cable size={22} color="#F5A623" />, desc: 'Our team has the capacity to install and maintain underground networks in some of the most complex systems in the country.' },
    { title: 'Storm Restoration', icon: <Shield size={22} color="#F5A623" />, desc: 'Emergency storm restoration crews work around the clock to restore power safely after hurricanes, ice storms, tornadoes, and floods. Ready, willing, and able crew response to any destination.' },
    { title: 'Telecom / Fiber', icon: <Wrench size={22} color="#F5A623" />, desc: 'Our Fiber Division specializes in aerial fiber construction, maintenance, aerial and underground fiber, two-pole clean-up, and oversees all splicing work associated with fiber projects.' },
    { title: 'Streetlight Repair', icon: <Lightbulb size={22} color="#F5A623" />, desc: 'We are equipped to install and maintain customers\' entire street lighting networks keeping active lighting count to maximum while meeting customer commit dates.' }
  ];

  return (
    <div style={{ paddingTop: '8rem' }}>
      <section className="page-hero" style={{ position: 'relative', minHeight: '40vh', display: 'flex', alignItems: 'center', background: '#000' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, #000 100%)', zIndex: 1 }} />
        <div className="container" style={{ zIndex: 2, padding: '4rem 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label">What We Do</div>
            <h1 className="section-title" style={{ maxWidth: '500px' }}>Full-Spectrum<br/>Utility Services</h1>
            <p className="hero-body-text" style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(240,240,250,0.6)', maxWidth: '500px' }}>SolPowerlines is a service provider to all electrical utility companies regardless of the scale or extent of the project.</p>
          </motion.div>
        </div>
      </section>

      <section className="section page-section" style={{ background: '#000', paddingTop: '0' }}>
        <div className="container">
          <div className="page-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1px', background: 'rgba(240,240,250,0.06)' }}>
            {services.map((srv, idx) => (
              <motion.div key={srv.title}
                className="page-card"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
                whileHover={{ background: 'rgba(245,166,35,0.04)' }}
                style={{ background: '#000', padding: '3rem 2.5rem', transition: 'background 0.3s' }}>
                <div style={{ marginBottom: '1.5rem', opacity: 0.8 }}>{srv.icon}</div>
                <h3 className="card-title" style={{ fontFamily: 'Inter', fontSize: '1.2rem', color: '#f0f0fa', marginBottom: '1rem', fontWeight: 600 }}>{srv.title}</h3>
                <p className="card-body" style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(240,240,250,0.6)', marginBottom: '2rem' }}>{srv.desc}</p>
                <Link to="/contact" className="card-link" style={{ fontFamily: 'Barlow Condensed', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  Request Quote <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
