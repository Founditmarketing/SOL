import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Wrench, ArrowRight, Activity, Cable, Lightbulb } from 'lucide-react';
import Marquee from '../components/Marquee';
import OpsMap from '../components/OpsMap';
import { ChevronRight } from 'lucide-react';

function SwipeHint() {
  return (
    <div className="swipe-hint" style={{ display: 'none' }}>
      <span>Swipe</span>
      <ChevronRight size={14} />
    </div>
  );
}

function AnimatedCounter({ from, to, suffix = "", suffixClassName }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(from);
  const spring = useSpring(count, { duration: 2500, bounce: 0 });
  const rounded = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      count.set(to);
    }
  }, [inView, count, to]);

  return (
    <span ref={ref} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
      <motion.span>{rounded}</motion.span>
      <span className={suffixClassName}>{suffix}</span>
    </span>
  );
}


export default function Home() {
  const heroRef = useRef(null);

  return (
    <div style={{ paddingBottom: '0' }}>
      {/* HERO SECTION */}
      <section ref={heroRef} className="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        
        {/* Background Video */}
        <video 
          className="desktop-video"
          src="/hero-desktop-v2.mp4" autoPlay loop muted playsInline 
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} 
        />
        <video 
          className="mobile-video"
          src="/hero-mobile-v2.mp4" autoPlay loop muted playsInline 
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} 
        />

        {/* Bottom gradient fade */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 80%, #000000 100%)', zIndex: 1 }} />

        <div className="container" style={{ paddingTop: 'clamp(7rem, 15vh, 10rem)', zIndex: 3, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.2)' }}
          >
            <div 
              style={{ width: '6px', height: '6px', background: 'var(--red)', borderRadius: '50%' }}
            />
            <span style={{ fontFamily: 'Barlow Condensed', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>People Matter More</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ fontFamily: 'Inter', fontSize: 'clamp(3rem, 7vw, 6rem)', color: 'var(--white)', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '1.5rem', maxWidth: '900px', fontWeight: 600 }}
          >
            Exceeding <span
              style={{ color: 'var(--red)', display: 'inline' }}>Expectations</span>
            <span className="hero-subtitle" style={{ display: 'block', fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontFamily: 'Barlow Condensed', fontWeight: '400', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '1.2rem' }}>
              Distribution &bull; Underground &bull; Storm Restoration &bull; Fiber
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', maxWidth: '550px', marginBottom: '3rem', fontWeight: 300 }}
          >
            A dependable, knowledgeable, and trusted partner in power restoration, site preparation, and emergency response.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}
          >
            <Link to="/contact" className="btn btn-blue" style={{ fontSize: '0.9rem', padding: '1rem 2.5rem', letterSpacing: '0.1em' }}>Request a Consultation</Link>
            <Link to="/careers" className="btn btn-outline" style={{ fontSize: '0.9rem', padding: '1rem 2.5rem', letterSpacing: '0.1em' }}>Join Our Crew</Link>
          </motion.div>
        </div>

        {/* Scroll Indicator — desktop only */}
        <motion.div 
          className="desktop-only"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.4 }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <span style={{ fontFamily: 'Barlow Condensed', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
            style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }} 
          />
        </motion.div>
      </section>

      {/* INFINITE MARQUEE */}
      <Marquee />

      {/* COUNTING STATS */}
      <section className="section" style={{ background: '#ffffff', position: 'relative', overflow: 'hidden', padding: '7rem 2rem' }}>
        <div className="container">
          <div className="carousel-wrapper">
          <div className="mobile-carousel hide-scrollbar" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            
            <motion.div 
              whileHover={{ y: -4 }}
              style={{ background: '#ffffff', borderBottom: '2px solid var(--red)', padding: '4rem 2rem', textAlign: 'center', transition: 'all 0.4s', position: 'relative' }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
                style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontFamily: 'Inter', fontWeight: 600, color: '#181818', lineHeight: 1, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}
              >
                <AnimatedCounter from={0} to={200} suffix="+" suffixClassName="amber-plus" />
              </motion.div>
              <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666666' }}>Skilled Employees</div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              style={{ background: '#ffffff', borderBottom: '2px solid var(--red)', padding: '4rem 2rem', textAlign: 'center', transition: 'all 0.4s', position: 'relative' }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
                style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontFamily: 'Inter', fontWeight: 600, color: '#181818', lineHeight: 1, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}
              >
                <AnimatedCounter from={0} to={20} suffix="+" suffixClassName="amber-plus" />
              </motion.div>
              <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666666' }}>Years of Industry Experience</div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              style={{ background: '#ffffff', borderBottom: '2px solid var(--red)', padding: '4rem 2rem', textAlign: 'center', transition: 'all 0.4s', position: 'relative' }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
                style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontFamily: 'Inter', fontWeight: 600, color: '#181818', lineHeight: 1, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}
              >
                24<span className="amber-plus">/7</span>
              </motion.div>
              <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666666' }}>Storm Response Ready</div>
            </motion.div>

          </div>
          <SwipeHint />
          </div>
        </div>
      </section>

      {/* FULL-BLEED CREW VIDEO BREAK */}
      <section style={{ position: 'relative', height: 'clamp(300px, 50vw, 600px)', overflow: 'hidden' }}>
        <video 
          ref={(el) => {
            if (!el) return;
            el.muted = true;
            const tryPlay = () => el.play().catch(() => {});
            tryPlay();
            document.addEventListener('visibilitychange', () => {
              if (!document.hidden) tryPlay();
            }, { once: true });
            const obs = new IntersectionObserver(([e]) => {
              if (e.isIntersecting) { tryPlay(); obs.disconnect(); }
            }, { threshold: 0.1 });
            obs.observe(el);
          }}
          src="/crew-video.mp4" 
          autoPlay loop muted playsInline
          preload="auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, var(--dark) 0%, transparent 15%, transparent 85%, var(--dark) 100%)', zIndex: 1, pointerEvents: 'none' }} />
      </section>

      {/* WHERE WE OPERATE */}
      <section className="section" style={{ background: '#000000', borderTop: '1px solid #303030', padding: '5rem 2rem' }}>
        <div className="container">
          <div className="ops-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)', gap: '4rem', alignItems: 'center' }}>
            
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={16} /> Where We Work</div>
              <h2 className="section-title">Gulf South <span style={{ color: 'var(--red)' }}>Coverage.</span></h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#8F8F8F', marginBottom: '2rem' }}>
                We keep crews and equipment staged across the Gulf South so we can mobilize fast — whether it's a scheduled build or a Category 4 making landfall.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { status: 'HQ', loc: 'Alexandria, LA', desc: 'Corporate Headquarters & Fleet Staging' },
                  { status: 'Storm Ready', loc: 'Gulf Coast', desc: 'Emergency Response Pre-Staging' },
                  { status: 'Active', loc: 'Multiple Sites', desc: 'Distribution & Underground Projects' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#0a0a0a', padding: '1rem 1.5rem', borderRadius: '2px', borderLeft: '2px solid var(--red)' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '1rem', color: 'var(--white)' }}>{item.loc}</div>
                      <div style={{ fontSize: '0.8rem', color: '#8F8F8F' }}>{item.desc}</div>
                    </div>
                    <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8F8F8F' }}>{item.status}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <OpsMap />
            </motion.div>

          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="section" style={{ background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'left', maxWidth: '700px', margin: '0 0 4rem' }}>
            <div className="section-label" style={{ color: 'var(--red)' }}>Our Services</div>
            <h2 style={{ fontFamily: 'Inter', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#181818', lineHeight: 1.15, marginBottom: '1.5rem', letterSpacing: '-0.02em', fontWeight: 500 }}>Complete Utility <span style={{ color: 'var(--red)' }}>Solutions</span></h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#666666' }}>We pride ourselves in our ability to complete services effectively and efficiently to ensure a safe and reliable workforce for all of our customers.</p>
          </div>

          <div className="carousel-wrapper">
          <div className="mobile-carousel hide-scrollbar" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', pointerEvents: 'auto' }}>
            {[
              { title: 'Distribution', icon: <Zap color="#DA291C" size={28} />, desc: 'Construction and maintenance services for electrical distribution systems up to 34.5kv — new construction, system improvements, and complete rebuilds.' },
              { title: 'Underground', icon: <Cable color="#DA291C" size={28} />, desc: 'Installation and maintenance of underground networks in some of the most complex systems in the country.' },
              { title: 'Storm Restoration', icon: <Shield color="#DA291C" size={28} />, desc: 'Emergency storm restoration crews work around the clock to restore power safely. Ready, willing, and able response to any destination.' },
              { title: 'Telecom / Fiber', icon: <Wrench color="#DA291C" size={28} />, desc: 'Aerial fiber construction, maintenance, two-pole clean-up, and all splicing work associated with fiber projects.' },
              { title: 'Streetlight Repair', icon: <Lightbulb color="#DA291C" size={28} />, desc: 'Equipped to install and maintain entire street lighting networks — keeping active lighting count at maximum while meeting customer commit dates.' }
            ].map((srv, idx) => (
              <motion.div 
                key={srv.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                style={{ background: '#f8f8f8', borderBottom: '2px solid var(--red)', borderRadius: '2px', padding: '3rem 2.5rem', position: 'relative', cursor: 'pointer', transition: 'all 0.4s' }}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  {srv.icon}
                </div>
                <h3 style={{ fontFamily: 'Inter', fontSize: '1.4rem', color: '#181818', marginBottom: '1rem', fontWeight: 600, letterSpacing: '-0.01em' }}>{srv.title}</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#666666', marginBottom: '2rem' }}>{srv.desc}</p>
                <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Barlow Condensed', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)' }}>
                  Learn More <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
          <SwipeHint />
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section className="section" style={{ background: '#000000', padding: '7rem 2rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Leadership</div>
            <h2 className="section-title">The Team Behind <span style={{ color: 'var(--red)' }}>the Power</span></h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#8F8F8F' }}>Experienced leaders dedicated to safety, integrity, and excellence in every project.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { img: '/team-supervisor.png', name: 'Gavin Lemoine', role: 'Director of Operations', desc: 'Over 25 years of experience in overhead and underground electrical distribution. Leads contract compliance, crew tracking, and project management.' },
              { img: '/team-dispatcher.png', name: 'Josh Fleming', role: 'Operations Manager', desc: 'Over 18 years of experience overseeing design, development, and construction of power and communication infrastructure projects.' },
              { img: '/team-pm.png', name: 'Kevin Sasser', role: 'Safety Manager', desc: 'CUSP certified with decades of utility experience. Dedicated to safety leadership, workforce development, and operational excellence.' },
            ].map((person, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ width: '160px', height: '160px', borderRadius: '2px', overflow: 'hidden', margin: '0 auto 1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={person.img} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                </div>
                <h3 style={{ fontFamily: 'Inter', fontSize: '1.2rem', color: 'var(--white)', marginBottom: '0.3rem', fontWeight: 600 }}>{person.name}</h3>
                <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '1rem' }}>{person.role}</div>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#8F8F8F' }}>{person.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .amber-plus { font-size: 0.6em; color: var(--red); }
        @media(max-width: 900px) {
          .ops-layout { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
}
