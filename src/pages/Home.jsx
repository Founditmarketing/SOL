import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Wrench, ArrowRight, Cable, Lightbulb } from 'lucide-react';
import Marquee from '../components/Marquee';
import { ChevronRight } from 'lucide-react';

function SwipeHint() {
  return (
    <div className="swipe-hint" style={{ display: 'none' }}>
      <span>Swipe</span>
      <ChevronRight size={14} />
    </div>
  );
}

function AnimatedCounter({ from, to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(from);
  const spring = useSpring(count, { duration: 2500, bounce: 0 });
  const rounded = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) count.set(to);
  }, [inView, count, to]);

  return (
    <span ref={ref} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
      <motion.span>{rounded}</motion.span>
      <span style={{ color: 'var(--amber)' }}>{suffix}</span>
    </span>
  );
}

export default function Home() {
  return (
    <div>
      {/* ═══ HERO — Full viewport cinematic ═══ */}
      <section className="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#000' }}>
        <video className="desktop-video" src="/hero-desktop-v2.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
        <video className="mobile-video" src="/hero-mobile-v2.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 60%, #000000 100%)', zIndex: 1 }} />

        <div className="container" style={{ paddingTop: 'clamp(8rem, 18vh, 12rem)', zIndex: 3, position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="section-label" style={{ marginBottom: '1.5rem' }}>Exceeding Expectations</div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            style={{ fontFamily: 'Inter', fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: '#f0f0fa', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '2rem', maxWidth: '800px', fontWeight: 600 }}>
            In the World<br/>of Energy
            <span className="hero-subtitle" style={{ display: 'block', fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)', fontWeight: 400, color: 'rgba(240,240,250,0.65)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '1.5rem', fontFamily: 'Barlow Condensed' }}>
              Distribution · Underground · Storm Restoration · Fiber · Streetlight
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
            style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(240,240,250,0.7)', maxWidth: '480px', marginBottom: '3rem' }}>
            A dependable, knowledgeable, and trusted partner in power utility construction, site preparation, and emergency response across the Gulf South.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%' }}>
            <Link to="/contact" className="btn btn-blue">Request a Consultation</Link>
            <Link to="/careers" className="btn btn-outline">Join Our Crew <ArrowRight size={16} style={{ marginLeft: '8px' }} /></Link>
          </motion.div>
        </div>

        <motion.div className="desktop-only" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
            style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, rgba(245,166,35,0.6), transparent)' }} />
        </motion.div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="section stats-section" style={{ background: '#000', borderTop: '1px solid rgba(240,240,250,0.06)', borderBottom: '1px solid rgba(240,240,250,0.06)', padding: '4rem 2rem' }}>
        <div className="container">
          <div className="carousel-wrapper">
          <div className="mobile-carousel hide-scrollbar" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
            {[
              { value: 200, suffix: '+', label: 'SKILLED EMPLOYEES' },
              { value: 20, suffix: '+', label: 'YEARS EXPERIENCE' },
              { value: 24, suffix: '/7', label: 'STORM RESPONSE' }
            ].map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <div style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Inter', fontWeight: 700, color: '#f0f0fa', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
                  <AnimatedCounter from={0} to={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', color: 'rgba(240,240,250,0.5)' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <SwipeHint />
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <Marquee />

      {/* ═══ CREW VIDEO BREAK ═══ */}
      <section style={{ position: 'relative', height: 'clamp(300px, 50vw, 500px)', overflow: 'hidden' }}>
        <video 
          ref={(el) => { if (!el) return; el.muted = true; const tryPlay = () => el.play().catch(() => {}); tryPlay(); }}
          src="/crew-video.mp4" autoPlay loop muted playsInline preload="auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #000 0%, transparent 25%, transparent 75%, #000 100%)', zIndex: 1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="section-label">Our Crews in Action</div>
            <h2 style={{ fontFamily: 'Inter', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#f0f0fa', fontWeight: 600, lineHeight: 1.1, maxWidth: '400px' }}>Safety First,<br/>People Minded.</h2>
          </motion.div>
        </div>
      </section>

      {/* ═══ SERVICES GRID ═══ */}
      <section className="section services-section" style={{ background: '#000' }}>
        <div className="container">
          <div style={{ maxWidth: '500px', marginBottom: '4rem' }}>
            <div className="section-label">Services</div>
            <h2 className="section-title">Complete Utility<br/>Solutions</h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(240,240,250,0.6)' }}>We pride ourselves in our ability to complete services effectively and efficiently regardless of the scale or extent of the project.</p>
          </div>

          <div className="carousel-wrapper">
          <div className="mobile-carousel hide-scrollbar service-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(240,240,250,0.06)' }}>
            {[
              { title: 'Distribution', icon: <Zap color="var(--amber)" size={22} />, desc: 'Construction and maintenance for electrical distribution systems up to 34.5kv — new construction, system improvements, and complete rebuilds.' },
              { title: 'Underground', icon: <Cable color="var(--amber)" size={22} />, desc: 'Installation and maintenance of underground networks in some of the most complex systems in the country.' },
              { title: 'Storm Restoration', icon: <Shield color="var(--amber)" size={22} />, desc: 'Emergency crews work around the clock to restore power safely. Ready to respond to any destination at a moment\'s notice.' },
              { title: 'Telecom / Fiber', icon: <Wrench color="var(--amber)" size={22} />, desc: 'Aerial fiber construction, maintenance, two-pole clean-up, and all splicing work associated with fiber projects.' },
              { title: 'Streetlight Repair', icon: <Lightbulb color="var(--amber)" size={22} />, desc: 'Install and maintain entire street lighting networks — keeping active count at maximum while meeting customer commit dates.' }
            ].map((srv, idx) => (
              <motion.div key={srv.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}
                whileHover={{ background: 'rgba(245,166,35,0.04)' }}
                className="service-card"
                style={{ background: '#000', padding: '3rem 2.5rem', cursor: 'pointer', transition: 'background 0.3s' }}>
                <div style={{ marginBottom: '1.5rem', opacity: 0.8 }}>{srv.icon}</div>
                <h3 style={{ fontFamily: 'Inter', fontSize: '1.2rem', color: '#f0f0fa', marginBottom: '1rem', fontWeight: 600 }}>{srv.title}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(240,240,250,0.6)', marginBottom: '1.5rem' }}>{srv.desc}</p>
                <Link to="/services" style={{ fontFamily: 'Barlow Condensed', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  Learn More <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
          <SwipeHint />
          </div>
        </div>
      </section>

      {/* ═══ WHO WE SERVE ═══ */}
      <section className="section utilities-section" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(240,240,250,0.06)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Who We Serve</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Trusted by Utilities<br/>Across the Gulf South</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: 'rgba(240,240,250,0.06)' }}>
            {[
              { title: 'Electric Cooperatives', desc: 'Private, independent electric utilities owned by the members they serve — democratically governed and anchored in the communities they power.' },
              { title: 'Municipal Owned Utilities', desc: 'Utilities owned and operated by a city. We partner with municipalities to deliver reliable power infrastructure at the local level.' },
              { title: 'Investor Owned Utilities', desc: 'Business organizations providing essential power services. We support IOUs with scalable construction and maintenance solutions.' }
            ].map((item, idx) => (
              <motion.div key={idx} className="utility-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                style={{ background: '#0a0a0a', padding: '3rem 2.5rem' }}>
                <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1.25rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(240,240,250,0.65)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LEADERSHIP ═══ */}
      <section className="section leadership-section" style={{ background: '#000', borderTop: '1px solid rgba(240,240,250,0.06)' }}>
        <div className="container">
          <div style={{ maxWidth: '500px', marginBottom: '4rem' }}>
            <div className="section-label">Leadership</div>
            <h2 className="section-title">The Team Behind<br/>the Power</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { img: '/gavin-lemoine.jpg', name: 'Gavin Lemoine', role: 'Director of Operations', desc: 'Over 25 years of experience in overhead and underground electrical distribution. Leads contract compliance, change order management, and project tracking.' },
              { img: '/josh-fleming.jpg', name: 'Josh Fleming', role: 'Operations Manager', desc: 'Over 18 years overseeing design, development, and construction of power and communication infrastructure projects.' },
              { img: '/kevin-sasser.jpg', name: 'Kevin Sasser', role: 'Safety Manager', desc: 'CUSP certified. Dedicated to safety leadership, workforce development, and operational excellence since 1999.' },
            ].map((person, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                style={{ borderTop: '1px solid rgba(240,240,250,0.08)', paddingTop: '2rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '0', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid rgba(240,240,250,0.1)' }}>
                  <img src={person.img} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                </div>
                <h3 style={{ fontFamily: 'Inter', fontSize: '1.1rem', color: '#f0f0fa', fontWeight: 600, marginBottom: '0.25rem' }}>{person.name}</h3>
                <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1rem' }}>{person.role}</div>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(240,240,250,0.6)' }}>{person.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
