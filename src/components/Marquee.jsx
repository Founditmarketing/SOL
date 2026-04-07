import { motion } from 'framer-motion';

export default function Marquee() {
  const items = [
    'DISTRIBUTION', 'UNDERGROUND', 'STORM RESTORATION', 'FIBER / TELECOM', 
    'STREETLIGHT REPAIR', 'SAFETY FIRST', 'PEOPLE MATTER MORE',
    'DISTRIBUTION', 'UNDERGROUND', 'STORM RESTORATION', 'FIBER / TELECOM', 
    'STREETLIGHT REPAIR', 'SAFETY FIRST', 'PEOPLE MATTER MORE'
  ];

  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid #D2D2D2', borderBottom: '1px solid #D2D2D2', padding: '1rem 0', background: '#ffffff', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '80px', background: 'linear-gradient(90deg, #ffffff, transparent)', zIndex: 10 }}></div>
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '80px', background: 'linear-gradient(-90deg, #ffffff, transparent)', zIndex: 10 }}></div>
      
      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        style={{ display: 'flex', width: 'max-content' }}
      >
        {items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0 2.5rem', whiteSpace: 'nowrap' }}>
            <div style={{ width: '4px', height: '4px', background: '#DA291C', borderRadius: '50%' }}></div>
            <span style={{ fontFamily: 'Barlow Condensed', fontSize: '0.85rem', letterSpacing: '0.25em', fontWeight: 600, color: '#666666' }}>
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
