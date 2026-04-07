import { motion } from 'framer-motion';

export default function Marquee() {
  const items = [
    'DISTRIBUTION', 'UNDERGROUND', 'STORM RESTORATION', 'FIBER / TELECOM',
    'STREETLIGHT', 'SAFETY FIRST', 'PEOPLE MATTER MORE',
    'DISTRIBUTION', 'UNDERGROUND', 'STORM RESTORATION', 'FIBER / TELECOM',
    'STREETLIGHT', 'SAFETY FIRST', 'PEOPLE MATTER MORE'
  ];

  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(240,240,250,0.06)', borderBottom: '1px solid rgba(240,240,250,0.06)', padding: '0.75rem 0', background: '#000' }}>
      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{ ease: 'linear', duration: 35, repeat: Infinity }}
        style={{ display: 'flex', width: 'max-content' }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0 2rem', whiteSpace: 'nowrap' }}>
            <div style={{ width: '3px', height: '3px', background: 'var(--amber)', opacity: 0.8 }}></div>
            <span style={{ fontFamily: 'Barlow Condensed', fontSize: '0.7rem', letterSpacing: '0.2em', fontWeight: 600, color: 'rgba(240,240,250,0.5)' }}>{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
