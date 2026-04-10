import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, Cable, Shield, Wrench, Lightbulb, ChevronRight } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ScopeBuilder from '../components/ScopeBuilder';

// ═══ ANIMATED COUNTER ═══
function StatCounter({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const spring = useSpring(count, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => { if (inView) count.set(value); }, [inView, count, value]);

  return (
    <span ref={ref} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
      <motion.span>{display}</motion.span>
      <span style={{ color: 'var(--amber)' }}>{suffix}</span>
    </span>
  );
}

// ═══ SERVICE DATA ═══
const SERVICES = [
  {
    id: 'distribution',
    title: 'Distribution',
    icon: <Zap size={24} color="#F5A623" />,
    stat: { value: 2400, suffix: '+', label: 'MILES OF LINE BUILT' },
    desc: 'Construction and maintenance services for electrical distribution systems up to 34.5kV. New construction, maintenance services, system improvements, and complete rebuilds. Our experienced workforce are equipped and competent to glove energized voltages up to 34.5kV.',
    capabilities: ['New pole installation', 'System upgrades & reconductoring', 'Hot-stick & rubber glove work', 'Transformer installation'],
  },
  {
    id: 'underground',
    title: 'Underground',
    icon: <Cable size={24} color="#F5A623" />,
    stat: { value: 340, suffix: '+', label: 'MILES OF CONDUIT INSTALLED' },
    desc: 'Our team has the capacity to install and maintain underground networks in some of the most complex systems in the country. From directional boring to open trench, we handle URD installations with precision.',
    capabilities: ['Directional boring', 'Open trench construction', 'URD cable installation', 'Splice & termination work'],
  },
  {
    id: 'storm',
    title: 'Storm Restoration',
    icon: <Shield size={24} color="#F5A623" />,
    stat: { value: 72, suffix: 'hr', label: 'AVG FULL RESTORATION TIME' },
    desc: 'Emergency storm restoration crews work around the clock to restore power safely after hurricanes, ice storms, tornadoes, and floods. Ready, willing, and able crew response to any destination.',
    capabilities: ['24/7 rapid deployment', 'Mutual aid coordination', 'Damage assessment', 'Temporary & permanent restoration'],
    hasBeforeAfter: true,
  },
  {
    id: 'fiber',
    title: 'Telecom / Fiber',
    icon: <Wrench size={24} color="#F5A623" />,
    stat: { value: 180, suffix: '+', label: 'FIBER MILES DEPLOYED' },
    desc: 'Our Fiber Division specializes in aerial fiber construction, maintenance, aerial and underground fiber, two-pole clean-up, and oversees all splicing work associated with fiber projects.',
    capabilities: ['Aerial fiber construction', 'Underground fiber installation', 'Splicing & testing', 'Two-pole transfer & cleanup'],
  },
  {
    id: 'streetlight',
    title: 'Streetlight Repair',
    icon: <Lightbulb size={24} color="#F5A623" />,
    stat: { value: 15000, suffix: '+', label: 'FIXTURES MAINTAINED' },
    desc: "We are equipped to install and maintain customers' entire street lighting networks, keeping active lighting count to maximum while meeting customer commit dates.",
    capabilities: ['LED conversion programs', 'Fixture installation', 'Photocell replacement', 'Pole & base maintenance'],
  },
];

export default function Services() {
  const [scopeOpen, setScopeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('distribution');
  const sectionRefs = useRef({});

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ paddingTop: '8rem' }}>
      {/* ═══ HERO ═══ */}
      <section className="page-hero" style={{ position: 'relative', minHeight: '45vh', display: 'flex', alignItems: 'center', background: '#000' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, #000 100%)', zIndex: 1 }} />
        <div className="container" style={{ zIndex: 2, padding: '4rem 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label">What We Do</div>
            <h1 className="section-title" style={{ maxWidth: '600px' }}>Full-Spectrum<br/>Utility Services</h1>
            <p className="hero-body-text" style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(240,240,250,0.6)', maxWidth: '500px', marginBottom: '2rem' }}>
              From overhead distribution to underground conduit to emergency storm response — we build, maintain, and restore the critical infrastructure that powers the Gulf South.
            </p>
            <button
              onClick={() => setScopeOpen(true)}
              style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                background: 'var(--amber)', color: '#000', border: 'none',
                padding: '0.85rem 2rem', borderRadius: '8px', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
              }}
            >
              SCOPE YOUR PROJECT <ChevronRight size={14} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══ CROSS-SECTION DIAGRAM ═══ */}
      <section style={{ background: '#000', padding: '0 0 4rem' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(240,240,250,0.25)' }}>
                INFRASTRUCTURE OVERVIEW
              </div>
            </div>
            <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(240,240,250,0.06)' }}>
              <img
                src="/images/cross-section.png"
                alt="Utility Infrastructure Cross-Section"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STICKY SIDEBAR NAV + SERVICE SECTIONS ═══ */}
      <section style={{ background: '#000', position: 'relative' }}>
        <div style={{ display: 'flex', maxWidth: '1300px', margin: '0 auto', padding: '0 2rem' }}>

          {/* Sticky sidebar navigation */}
          <nav className="service-sidebar" style={{
            position: 'sticky', top: '6rem', alignSelf: 'flex-start',
            width: '60px', flexShrink: 0, display: 'flex', flexDirection: 'column',
            gap: '0.5rem', paddingTop: '2rem', marginRight: '2rem',
          }}>
            {SERVICES.map(srv => {
              const isActive = activeSection === srv.id;
              return (
                <button
                  key={srv.id}
                  onClick={() => scrollToSection(srv.id)}
                  title={srv.title}
                  style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isActive ? 'rgba(245,166,35,0.1)' : 'rgba(240,240,250,0.02)',
                    border: `1px solid ${isActive ? 'rgba(245,166,35,0.3)' : 'rgba(240,240,250,0.06)'}`,
                    cursor: 'pointer', transition: 'all 0.3s',
                  }}
                >
                  <div style={{ opacity: isActive ? 1 : 0.3, transition: 'opacity 0.3s' }}>{srv.icon}</div>
                </button>
              );
            })}
          </nav>

          {/* Service sections */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {SERVICES.map((srv, idx) => (
              <div
                key={srv.id}
                id={srv.id}
                ref={(el) => sectionRefs.current[srv.id] = el}
                style={{
                  padding: '5rem 0',
                  borderTop: idx > 0 ? '1px solid rgba(240,240,250,0.06)' : 'none',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {/* Service header with stat */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{
                      background: 'rgba(245,166,35,0.08)', padding: '0.75rem',
                      borderRadius: '14px', lineHeight: 0, flexShrink: 0,
                    }}>
                      {srv.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(240,240,250,0.25)', marginBottom: '4px' }}>
                        {String(idx + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
                      </div>
                      <h2 style={{ fontFamily: 'Inter', fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: '#f0f0fa', lineHeight: 1.1 }}>
                        {srv.title}
                      </h2>
                    </div>
                  </div>

                  {/* Big stat proof block */}
                  <div style={{
                    background: 'rgba(240,240,250,0.02)', border: '1px solid rgba(240,240,250,0.06)',
                    borderRadius: '14px', padding: '2rem', marginBottom: '2rem',
                    display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap',
                  }}>
                    <div style={{ fontFamily: 'Inter', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 800, color: '#f0f0fa', lineHeight: 1 }}>
                      <StatCounter value={srv.stat.value} suffix={srv.stat.suffix} />
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(240,240,250,0.3)' }}>
                      {srv.stat.label}
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(240,240,250,0.6)', maxWidth: '700px', marginBottom: '2rem' }}>
                    {srv.desc}
                  </p>

                  {/* Capabilities list */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', marginBottom: '2rem' }}>
                    {srv.capabilities.map((cap, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.5rem',
                          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem',
                          fontWeight: 500, letterSpacing: '0.05em',
                          color: 'rgba(240,240,250,0.45)', padding: '0.5rem 0',
                        }}
                      >
                        <span style={{ color: 'var(--amber)', fontSize: '0.5rem' }}>▸</span>
                        {cap}
                      </motion.div>
                    ))}
                  </div>

                  {/* Before/After for Storm Restoration */}
                  {srv.hasBeforeAfter && (
                    <div style={{ marginTop: '1rem' }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(240,240,250,0.25)', marginBottom: '0.75rem' }}>
                        DRAG TO COMPARE — STORM DAMAGE VS. RESTORED
                      </div>
                      <BeforeAfterSlider
                        beforeSrc="/images/storm-before.png"
                        afterSrc="/images/storm-after.png"
                        beforeLabel="HURRICANE DAMAGE"
                        afterLabel="SOL RESTORED"
                      />
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section style={{ background: '#050508', borderTop: '1px solid rgba(240,240,250,0.06)', padding: '5rem 2rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(240,240,250,0.25)', marginBottom: '1rem' }}>
            READY TO BUILD?
          </div>
          <h2 style={{ fontFamily: 'Inter', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 700, color: '#f0f0fa', marginBottom: '1rem' }}>
            Let's Scope Your Next Project
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(240,240,250,0.5)', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Select your services, estimate your scope, and our team will have a proposal in your inbox within 24 hours.
          </p>
          <button
            onClick={() => setScopeOpen(true)}
            style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              background: 'var(--amber)', color: '#000', border: 'none',
              padding: '1rem 2.5rem', borderRadius: '8px', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}
          >
            SCOPE YOUR PROJECT <ChevronRight size={15} />
          </button>
        </motion.div>
      </section>

      {/* Scope Builder Modal */}
      <ScopeBuilder isOpen={scopeOpen} onClose={() => setScopeOpen(false)} />

      <style>{`
        @media(max-width: 900px) {
          .service-sidebar { display: none !important; }
        }
      `}</style>
    </div>
  );
}
