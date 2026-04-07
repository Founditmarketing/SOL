import { motion } from 'framer-motion';
import { Zap, Shield, Wrench, ArrowRight, Cable, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    { id: 'distribution', title: 'Distribution', icon: <Zap size={28} color="#DA291C" />, desc: 'Construction and maintenance services for electrical distribution systems up to 34.5kv. New construction, maintenance services, system improvements, and complete rebuilds.' },
    { id: 'underground', title: 'Underground', icon: <Cable size={28} color="#DA291C" />, desc: 'Installation and maintenance of underground networks in some of the most complex systems in the country.' },
    { id: 'storm', title: 'Storm Restoration', icon: <Shield size={28} color="#DA291C" />, desc: 'Emergency storm restoration crews work around the clock to restore power safely after hurricanes, ice storms, tornadoes, and floods. Ready to respond to any destination.' },
    { id: 'telecom', title: 'Telecommunications / Fiber', icon: <Wrench size={28} color="#DA291C" />, desc: 'Aerial fiber construction, maintenance, aerial and underground fiber, two-pole clean-up, and all splicing work associated with fiber projects.' },
    { id: 'streetlight', title: 'Streetlight Repair', icon: <Lightbulb size={28} color="#DA291C" />, desc: 'Equipped to install and maintain customers\' entire street lighting networks — keeping active lighting count at maximum while meeting customer commit dates.' }
  ];

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <section className="section" style={{ padding: '2rem 2rem 5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>What We Do</div>
              <h1 style={{ fontFamily: 'Inter', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', lineHeight: 1.15, marginBottom: '1.5rem', letterSpacing: '-0.02em', fontWeight: 600 }}>Complete Utility <span style={{ color: 'var(--red)' }}>Services</span></h1>
              <p style={{ fontSize: '1.1rem', color: '#8F8F8F', lineHeight: 1.8 }}>
                SolPowerlines is a service provider to all electrical utility companies regardless of the scale or extent of the project. We pride ourselves in our ability to complete services effectively and efficiently.
              </p>
            </motion.div>
          </div>

          <div className="mobile-carousel hide-scrollbar" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {services.map((srv, idx) => (
              <motion.div 
                key={srv.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
                style={{ background: '#0a0a0a', borderBottom: '2px solid var(--red)', borderRadius: '2px', padding: '3rem 2.5rem', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  {srv.icon}
                </div>
                <h3 style={{ fontFamily: 'Inter', fontSize: '1.4rem', color: 'var(--white)', marginBottom: '1rem', fontWeight: 600, letterSpacing: '-0.01em' }}>{srv.title}</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#8F8F8F', marginBottom: '2rem' }}>{srv.desc}</p>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Barlow Condensed', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)' }}>
                  Request Quote <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
