import { motion } from 'framer-motion';
import { ShieldAlert, Eye, AlertTriangle, UserCheck, Award } from 'lucide-react';
import IncidentCounter from '../components/IncidentCounter';
import StopWorkSimulator from '../components/StopWorkSimulator';
import SafetyHeatmap from '../components/SafetyHeatmap';
import PPEDiagram from '../components/PPEDiagram';
import SafetyGauges from '../components/SafetyGauges';

export default function Safety() {
  return (
    <div style={{ paddingTop: '8rem' }}>

      {/* ═══ HERO ═══ */}
      <section className="page-hero" style={{ position: 'relative', minHeight: '45vh', display: 'flex', alignItems: 'center', background: '#000' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.5), #000)', zIndex: 1 }} />
        <div className="container" style={{ zIndex: 2, padding: '4rem 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label">Safety Program</div>
            <h1 className="section-title" style={{ maxWidth: '600px' }}>Safety First,<br/>People Minded</h1>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(240,240,250,0.6)', maxWidth: '550px' }}>
              Safety isn't a slogan or a shifting priority. It's the foundation of professional execution. 
              Every SolPowerlines employee is empowered — and obligated — to stop work when conditions aren't right.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ 1. LIVE INCIDENT COUNTER ═══ */}
      <section style={{ background: '#000', padding: '4rem 2rem 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <IncidentCounter />
        </div>
      </section>

      {/* ═══ 2. SAFETY GAUGES DASHBOARD ═══ */}
      <section style={{ background: '#000', padding: '4rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '2rem' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(240,240,250,0.25)', marginBottom: '0.5rem' }}>
              SAFETY METRICS DASHBOARD
            </div>
            <h2 style={{ fontFamily: 'Inter', fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', fontWeight: 700, color: '#f0f0fa', maxWidth: '500px' }}>
              Our Numbers Speak for Themselves
            </h2>
          </motion.div>
          <SafetyGauges />
        </div>
      </section>

      {/* ═══ 3. SAFETY HEATMAP ═══ */}
      <section style={{ background: '#000', padding: '0 2rem 4rem' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(240,240,250,0.25)', marginBottom: '0.5rem' }}>
              DAILY SAFETY TRACKING
            </div>
            <h2 style={{ fontFamily: 'Inter', fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', fontWeight: 700, color: '#f0f0fa' }}>
              Every Day Is Tracked
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(240,240,250,0.4)', maxWidth: '500px', lineHeight: 1.6, marginTop: '0.5rem' }}>
              A wall of green. Every square is a day our crews went home safe.
            </p>
          </motion.div>
          <SafetyHeatmap />
        </div>
      </section>

      {/* ═══ 4. SAFETY PROGRAMS ═══ */}
      <section style={{ background: '#050508', borderTop: '1px solid rgba(240,240,250,0.06)', padding: '4rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '2rem' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(240,240,250,0.25)', marginBottom: '0.5rem' }}>
              CORE PROGRAMS
            </div>
            <h2 style={{ fontFamily: 'Inter', fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', fontWeight: 700, color: '#f0f0fa' }}>
              How We Keep Everyone Safe
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {[
              {
                icon: <ShieldAlert size={22} color="#F5A623" />,
                title: 'Human Performance Program',
                desc: 'Physiological training to identify potential, predictable, and preventable unsafe events. Training and education on human performance tools company-wide.',
              },
              {
                icon: <Eye size={22} color="#F5A623" />,
                title: 'Behavior-Based Safety',
                desc: 'Developed to improve employee safety performance by increasing the frequency of critical safe behaviors with direct employee involvement.',
              },
              {
                icon: <AlertTriangle size={22} color="#F5A623" />,
                title: 'Stop-Work Authority',
                desc: 'Every employee is empowered — and obligated — to stop work if conditions are unsafe. No exceptions, no retribution.',
              },
              {
                icon: <UserCheck size={22} color="#F5A623" />,
                title: 'CUSP Certified Leadership',
                desc: 'Safety Manager Kevin Sasser holds the Certified Utility Safety Professional credential — dedicated to safety excellence.',
              },
            ].map((prog, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                style={{
                  background: 'rgba(240,240,250,0.02)',
                  border: '1px solid rgba(240,240,250,0.06)',
                  borderRadius: '14px', padding: '1.5rem',
                  display: 'flex', gap: '1rem',
                }}
              >
                <div style={{ flexShrink: 0, background: 'rgba(245,166,35,0.06)', padding: '0.6rem', borderRadius: '10px', lineHeight: 0, alignSelf: 'flex-start' }}>
                  {prog.icon}
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Inter', fontSize: '0.95rem', fontWeight: 600, color: '#f0f0fa', marginBottom: '0.4rem' }}>
                    {prog.title}
                  </h4>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.8rem', lineHeight: 1.6, color: 'rgba(240,240,250,0.5)' }}>
                    {prog.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {['ISNetworld', 'Avetta', 'Veriforce'].map((cert) => (
              <div key={cert} style={{ textAlign: 'center' }}>
                <Award size={24} color="#F5A623" style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.1em', color: '#F5A623' }}>GRADE A</div>
                <div style={{ fontFamily: 'Inter', fontSize: '0.8rem', color: 'rgba(240,240,250,0.5)', marginTop: '2px' }}>{cert}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. PPE INTERACTIVE DIAGRAM ═══ */}
      <section style={{ background: '#000', borderTop: '1px solid rgba(240,240,250,0.06)', padding: '4rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '2rem' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(240,240,250,0.25)', marginBottom: '0.5rem' }}>
              EQUIPMENT STANDARDS
            </div>
            <h2 style={{ fontFamily: 'Inter', fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', fontWeight: 700, color: '#f0f0fa' }}>
              Every Piece of Gear, Specified
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(240,240,250,0.4)', maxWidth: '500px', lineHeight: 1.6, marginTop: '0.5rem' }}>
              Tap any zone to see the exact ANSI/OSHA standards we require for every piece of personal protective equipment.
            </p>
          </motion.div>
          <PPEDiagram />
        </div>
      </section>

      {/* ═══ 6. STOP-WORK SIMULATOR ═══ */}
      <section style={{ background: '#050508', borderTop: '1px solid rgba(240,240,250,0.06)', padding: '4rem 2rem' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '2rem' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(240,240,250,0.25)', marginBottom: '0.5rem' }}>
              INTERACTIVE TRAINING
            </div>
            <h2 style={{ fontFamily: 'Inter', fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', fontWeight: 700, color: '#f0f0fa' }}>
              Would You Make the Right Call?
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(240,240,250,0.4)', maxWidth: '500px', lineHeight: 1.6, marginTop: '0.5rem' }}>
              Every SolPowerlines employee has Stop-Work Authority. Test your instincts against real job-site scenarios.
            </p>
          </motion.div>
          <StopWorkSimulator />
        </div>
      </section>

      {/* ═══ CLOSING STATEMENT ═══ */}
      <section style={{ background: '#000', borderTop: '1px solid rgba(240,240,250,0.06)', padding: '5rem 2rem', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container"
          style={{ maxWidth: '600px' }}
        >
          <div style={{
            fontFamily: 'Inter', fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700, color: '#f0f0fa', lineHeight: 1.3,
            marginBottom: '1rem',
          }}>
            "Everyone goes home the same way they came to work."
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem',
            fontWeight: 600, letterSpacing: '0.15em',
            color: 'var(--amber)',
          }}>
            — SOL POWERLINES SAFETY COMMITMENT
          </div>
        </motion.div>
      </section>
    </div>
  );
}
