import { motion } from 'framer-motion';

const PARTNERS = [
  { name: 'Entergy', logo: '/logos/entergy.png' },
  { name: 'Cleco', logo: '/logos/cleco.png' },
  { name: 'SLECA', logo: null },
  { name: 'DEMCO', logo: '/logos/demco.png' },
  { name: 'SLEMCO', logo: '/logos/slemco.png' },
  { name: 'Dixie Electric', logo: null },
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
          color: 'rgba(240,240,250,0.5)', textAlign: 'center', marginBottom: '1.25rem',
        }}>
          TRUSTED BY UTILITIES ACROSS THE GULF SOUTH
        </div>
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: 'clamp(1.5rem, 4vw, 3.5rem)', flexWrap: 'wrap',
        }}>
          {PARTNERS.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                opacity: 0.4, transition: 'opacity 0.3s', cursor: 'default',
                filter: 'grayscale(100%) brightness(2)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.filter = 'grayscale(0%) brightness(1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.4'; e.currentTarget.style.filter = 'grayscale(100%) brightness(2)'; }}
            >
              {partner.logo && (
                <img src={partner.logo} alt={partner.name} style={{ height: '24px', width: '24px', objectFit: 'contain' }} />
              )}
              <span style={{
                fontFamily: 'Barlow Condensed', fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
                fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(240,240,250,0.6)',
              }}>
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
