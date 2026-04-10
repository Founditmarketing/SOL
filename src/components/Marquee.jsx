import { motion } from 'framer-motion';

const PARTNERS = [
  'Entergy',
  'Cleco',
  'SLECA',
  'DEMCO', 
  'SLEMCO',
  'Dixie Electric',
];

export default function Marquee() {
  return (
    <div style={{
      borderTop: '1px solid rgba(240,240,250,0.06)',
      borderBottom: '1px solid rgba(240,240,250,0.06)',
      padding: '2rem 0',
      background: '#050508',
    }}>
      <div className="container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', fontWeight: 500,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'rgba(240,240,250,0.25)', textAlign: 'center', marginBottom: '1.25rem',
        }}>
          TRUSTED BY UTILITIES ACROSS THE GULF SOUTH
        </div>
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: 'clamp(1.5rem, 4vw, 3.5rem)', flexWrap: 'wrap',
        }}>
          {PARTNERS.map((name, idx) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              style={{
                fontFamily: 'Barlow Condensed', fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
                fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(240,240,250,0.25)',
                transition: 'color 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(240,240,250,0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(240,240,250,0.25)'}
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
