import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PPE_ZONES = [
  {
    id: 'head',
    label: 'Hard Hat',
    top: '2%', left: '42%', width: '16%', height: '12%',
    standard: 'ANSI Z89.1 Type I, Class E',
    rating: 'Electrical rating: 20,000V',
    details: 'Full-brim dielectric hard hat with integrated face shield mounting. Rated for electrical exposure, impact, and UV. Replaced every 5 years or after any impact event.',
    color: '#00a8ff',
  },
  {
    id: 'eyes',
    label: 'Safety Glasses',
    top: '12%', left: '40%', width: '20%', height: '6%',
    standard: 'ANSI Z87.1+',
    rating: 'Impact rated, UV400',
    details: 'High-impact wraparound lenses with anti-fog coating. Required at all times on active job sites. Prescription inserts available.',
    color: '#00a8ff',
  },
  {
    id: 'torso',
    label: 'Arc-Rated FR Clothing',
    top: '22%', left: '32%', width: '36%', height: '28%',
    standard: 'NFPA 70E / ASTM F1506',
    rating: 'Min 8 cal/cm² ARC rating',
    details: 'Daily-wear flame-resistant shirts and pants rated to withstand arc flash energy. Higher-cal switchgear suits available for 40+ cal/cm² exposures. All garments tracked for wash cycles and UV degradation.',
    color: '#F5A623',
  },
  {
    id: 'hands',
    label: 'Rubber Insulating Gloves',
    top: '42%', left: '18%', width: '18%', height: '14%',
    standard: 'ASTM D120 / OSHA 1910.137',
    rating: 'Class 2 — rated to 17,000V',
    details: 'Type I natural rubber insulating gloves with leather protectors. Electrically tested every 6 months. Each pair is serialized and tracked in our safety database. Crew cannot touch energized equipment without verified, in-date gloves.',
    color: '#ff9100',
  },
  {
    id: 'harness',
    label: 'Fall Protection Harness',
    top: '30%', left: '62%', width: '16%', height: '20%',
    standard: 'ANSI Z359.11 / OSHA 1926.502',
    rating: 'Rated to 310 lbs',
    details: 'Full-body fall arrest harness with dorsal D-ring, energy-absorbing lanyard, and self-retracting lifeline. Required at all heights above 4 feet. Inspected before every climb per Sol\'s pre-task checklist.',
    color: '#ff9100',
  },
  {
    id: 'feet',
    label: 'Dielectric Work Boots',
    top: '82%', left: '34%', width: '32%', height: '16%',
    standard: 'ASTM F2413-18',
    rating: 'EH rated / 18kV',
    details: 'Composite-toe, electrical hazard-rated boots with puncture-resistant soles. Waterproof construction for Louisiana conditions. Lineman-specific climbing boots feature reinforced shanks for gaff support.',
    color: '#00a8ff',
  },
];

export default function PPEDiagram() {
  const [activeZone, setActiveZone] = useState(null);
  const active = PPE_ZONES.find(z => z.id === activeZone);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        background: '#070a10',
        border: '1px solid rgba(0,168,255,0.1)',
        borderRadius: '20px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid rgba(0,168,255,0.06)',
        background: 'linear-gradient(180deg, rgba(0,168,255,0.03) 0%, transparent 100%)',
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem',
          fontWeight: 600, letterSpacing: '0.15em', color: '#00a8ff',
          marginBottom: '2px',
        }}>
          PPE REQUIREMENTS · INTERACTIVE DIAGRAM
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'rgba(240,240,250,0.35)' }}>
          {activeZone ? `Inspecting: ${active?.label}` : 'Tap any zone to view PPE specifications'}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', minHeight: '500px' }} className="ppe-layout">
        {/* Lineman image with hotspots */}
        <div style={{ 
          position: 'relative', flex: '0 0 45%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem',
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
            <img
              src="/images/lineman-ppe.png"
              alt="Lineman with full PPE"
              style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.85 }}
            />

            {/* Hotspot overlays */}
            {PPE_ZONES.map(zone => (
              <motion.div
                key={zone.id}
                onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
                whileHover={{ borderColor: zone.color }}
                animate={activeZone === zone.id ? {
                  borderColor: zone.color,
                  background: `${zone.color}15`,
                } : {}}
                style={{
                  position: 'absolute',
                  top: zone.top, left: zone.left,
                  width: zone.width, height: zone.height,
                  border: `1.5px dashed ${activeZone === zone.id ? zone.color : 'rgba(240,240,250,0.15)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {/* Floating label */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: activeZone === zone.id ? 1 : 0.5,
                    scale: activeZone === zone.id ? 1.05 : 1,
                  }}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.4rem', fontWeight: 700,
                    letterSpacing: '0.08em', color: zone.color,
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
                    padding: '2px 6px', borderRadius: '3px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {zone.label.toUpperCase()}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div style={{
          flex: 1, padding: '1.5rem',
          borderLeft: '1px solid rgba(0,168,255,0.06)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          minHeight: '300px',
        }}>
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: '0.45rem',
                      fontWeight: 600, letterSpacing: '0.12em', color: active.color,
                      marginBottom: '4px',
                    }}>
                      EQUIPMENT SPEC
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '1.2rem', fontWeight: 700, color: '#f0f0fa' }}>
                      {active.label}
                    </div>
                  </div>
                  <button onClick={() => setActiveZone(null)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(240,240,250,0.3)', padding: '4px',
                  }}>
                    <X size={16} />
                  </button>
                </div>

                {/* Standard & Rating pills */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem',
                    fontWeight: 600, letterSpacing: '0.05em',
                    color: active.color, background: `${active.color}12`,
                    border: `1px solid ${active.color}30`,
                    padding: '0.3rem 0.6rem', borderRadius: '6px',
                  }}>
                    {active.standard}
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem',
                    fontWeight: 600, letterSpacing: '0.05em',
                    color: 'rgba(240,240,250,0.5)',
                    background: 'rgba(240,240,250,0.03)',
                    border: '1px solid rgba(240,240,250,0.08)',
                    padding: '0.3rem 0.6rem', borderRadius: '6px',
                  }}>
                    {active.rating}
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: 'Inter', fontSize: '0.85rem', lineHeight: 1.7,
                  color: 'rgba(240,240,250,0.55)',
                }}>
                  {active.details}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem',
                  color: 'rgba(240,240,250,0.15)', letterSpacing: '0.1em',
                  lineHeight: 2,
                }}>
                  ← TAP A ZONE ON THE<br/>LINEMAN TO INSPECT PPE
                </div>

                {/* Quick list */}
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {PPE_ZONES.map(zone => (
                    <button
                      key={zone.id}
                      onClick={() => setActiveZone(zone.id)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem',
                        fontWeight: 600, letterSpacing: '0.08em',
                        color: 'rgba(240,240,250,0.3)', textAlign: 'left',
                        padding: '0.3rem 0.5rem', borderRadius: '4px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = zone.color; e.currentTarget.style.background = `${zone.color}08`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(240,240,250,0.3)'; e.currentTarget.style.background = 'none'; }}
                    >
                      ▸ {zone.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media(max-width: 700px) {
          .ppe-layout { flex-direction: column !important; }
          .ppe-layout > div:last-child { border-left: none !important; border-top: 1px solid rgba(0,168,255,0.06); }
        }
      `}</style>
    </motion.div>
  );
}
