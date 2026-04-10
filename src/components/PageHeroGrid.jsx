import { motion } from 'framer-motion';

/**
 * Power grid animation for sub-page hero sections.
 * Shorter, snappier version of the homepage power-on.
 * Grid powers on and stays on — no pulsing.
 */
export default function PageHeroGrid() {
  return (
    <>
      {/* Grid lines — quick flicker on */}
      <motion.div className="page-hero-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.5, 0, 0.35, 0, 0.5, 0.12] }}
        transition={{ duration: 2, times: [0, 0.15, 0.2, 0.3, 0.45, 0.55, 0.7, 1] }}
        style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(0,168,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,168,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial power glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0, 0.5, 0, 0.6, 0.2, 0], scale: [0.5, 0.5, 1, 0.5, 1.5, 2, 3] }}
        transition={{ duration: 2, times: [0, 0.15, 0.2, 0.3, 0.7, 0.85, 1] }}
        style={{
          position: 'absolute', top: '50%', left: '30%', width: '300px', height: '300px',
          marginTop: '-150px', marginLeft: '-150px',
          borderRadius: '50%', zIndex: 2, pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(0,168,255,0.25) 0%, transparent 70%)',
        }}
      />

      {/* Breaker flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 0, 0, 0.6, 0.3, 0] }}
        transition={{ duration: 2, times: [0, 0.3, 0.4, 0.5, 0.65, 0.68, 0.72, 0.8] }}
        style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'rgba(200,220,255,0.1)',
        }}
      />

      {/* Horizontal power streaks */}
      {[25, 55, 80].map((top, i) => (
        <motion.div key={`ps-${i}`}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1, 1], opacity: [0, 0.6, 0] }}
          transition={{ duration: 0.6, delay: 1.2 + i * 0.1, ease: 'easeOut' }}
          style={{
            position: 'absolute', top: `${top}%`, left: 0, right: 0, height: '1px', zIndex: 3,
            background: `linear-gradient(90deg, transparent 5%, rgba(0,168,255,0.7) 30%, rgba(245,166,35,0.5) 70%, transparent 95%)`,
            transformOrigin: 'left center', pointerEvents: 'none',
          }}
        />
      ))}

      {/* Amber sweep */}
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: '200%', opacity: [0, 0.4, 0.6, 0.4, 0] }}
        transition={{ duration: 1, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'absolute', top: 0, left: 0, width: '35%', height: '100%', zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.12), rgba(245,166,35,0.25), rgba(245,166,35,0.12), transparent)',
          filter: 'blur(50px)',
        }}
      />

      {/* Persistent grid — stays on steady */}
      <motion.div className="page-persistent-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1, delay: 1.8 }}
        style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(0,168,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0,168,255,0.35) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Color shimmer */}
      <div className="page-color-shimmer" style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 30% 50%, rgba(0,168,255,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(245,166,35,0.04) 0%, transparent 45%)',
      }} />

      {/* Grid stays on steady — no pulse */}
    </>
  );
}
