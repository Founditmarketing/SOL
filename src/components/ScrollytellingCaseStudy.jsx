import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STORY_BEATS = [
  {
    phase: '00',
    label: 'LANDFALL',
    stat: null,
    headline: 'Hurricane Laura',
    subhead: 'Category 4 · August 27, 2020',
    body: '150mph winds made landfall near Lake Charles. Over 600,000 customers lost power across the Gulf South.',
  },
  {
    phase: '01',
    label: 'MOBILIZATION',
    stat: { value: '4hrs', unit: 'RESPONSE TIME' },
    headline: 'Crews Activated',
    subhead: null,
    body: 'Before the storm made landfall, SolPowerlines had pre-staged crews and heavy equipment across strategic staging areas.',
  },
  {
    phase: '02',
    label: 'DEPLOYMENT',
    stat: { value: '200+', unit: 'CREW MEMBERS' },
    headline: 'Into the Damage Zone',
    subhead: null,
    body: 'Bucket trucks and material trailers rolled into devastated communities while winds were still gusting at 80mph.',
  },
  {
    phase: '03',
    label: 'RESTORATION',
    stat: { value: '340mi', unit: 'OF LINE REBUILT' },
    headline: '72 Hours. No Sleep.',
    subhead: null,
    body: '16-hour shifts in 100°F heat. 1,200 broken poles replaced, 340 miles of conductor re-strung, substations rebuilt from the ground up.',
  },
  {
    phase: '04',
    label: 'MISSION COMPLETE',
    stat: { value: '0', unit: 'SAFETY INCIDENTS' },
    headline: 'Everyone Home Safe.',
    subhead: null,
    body: 'Power restored. Zero lost-time injuries. Zero OSHA recordables. This is the standard. This is SolPowerlines.',
  },
];

export default function ScrollytellingCaseStudy() {
  return (
    <section style={{ background: '#050508', borderTop: '1px solid rgba(240,240,250,0.06)', borderBottom: '1px solid rgba(240,240,250,0.06)' }}>
      <div className="container" style={{ maxWidth: '1100px', padding: '5rem 2rem' }}>
        
        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: '4rem' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', color: '#00a8ff', marginBottom: '1rem', opacity: 0.7 }}>
            CASE STUDY // HURRICANE LAURA RESPONSE
          </div>
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>When the Grid<br/>Goes Dark</h2>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(240,240,250,0.5)', maxWidth: '500px' }}>
            Category 4. 150mph winds. 600,000 without power. This is what we do.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '24px', top: 0, bottom: 0, width: '2px',
            background: 'linear-gradient(to bottom, #00a8ff, var(--amber), #00e676)',
            opacity: 0.3,
          }} />

          {STORY_BEATS.map((beat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.05, duration: 0.5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '48px 1fr auto',
                gap: '1.5rem',
                alignItems: 'start',
                marginBottom: idx < STORY_BEATS.length - 1 ? '1px' : 0,
                padding: '2rem 0',
                borderBottom: idx < STORY_BEATS.length - 1 ? '1px solid rgba(240,240,250,0.04)' : 'none',
              }}
            >
              {/* Phase dot */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.25rem' }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: idx === STORY_BEATS.length - 1 ? '#00e676' : '#00a8ff',
                  boxShadow: `0 0 10px ${idx === STORY_BEATS.length - 1 ? '#00e676' : '#00a8ff'}40`,
                  zIndex: 2,
                }} />
              </div>

              {/* Content */}
              <div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', fontWeight: 600,
                  letterSpacing: '0.15em', color: '#00a8ff', marginBottom: '0.5rem', opacity: 0.7,
                }}>
                  [{beat.phase}] {beat.label}
                </div>
                <h3 style={{
                  fontFamily: 'Inter', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 600,
                  color: '#f0f0fa', lineHeight: 1.15, marginBottom: '0.4rem',
                }}>
                  {beat.headline}
                </h3>
                {beat.subhead && (
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
                    color: 'var(--amber)', marginBottom: '0.5rem',
                  }}>
                    {beat.subhead}
                  </div>
                )}
                <p style={{
                  fontFamily: 'Inter', fontSize: '0.85rem', lineHeight: 1.6,
                  color: 'rgba(240,240,250,0.5)', maxWidth: '500px', margin: 0,
                }}>
                  {beat.body}
                </p>
              </div>

              {/* Stat */}
              <div style={{ textAlign: 'right', minWidth: '120px' }}>
                {beat.stat && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                      fontWeight: 700, color: '#f0f0fa', lineHeight: 1,
                    }}>
                      {beat.stat.value}
                    </div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.5rem', fontWeight: 500,
                      letterSpacing: '0.12em', color: 'rgba(240,240,250,0.3)',
                      marginTop: '0.3rem',
                    }}>
                      {beat.stat.unit}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
