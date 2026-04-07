import { useState, useCallback } from 'react';
import { Power } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PowerToggle({ compact = false }) {
  const [electrified, setElectrified] = useState(false);

  const toggle = useCallback(() => {
    const next = !electrified;
    setElectrified(next);

    if (next) {
      // Flash effect
      const flash = document.createElement('div');
      flash.className = 'electric-flash';
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 600);

      document.documentElement.setAttribute('data-mode', 'electrified');
    } else {
      // Reverse flash
      const flash = document.createElement('div');
      flash.className = 'electric-flash electric-flash-out';
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 600);

      document.documentElement.removeAttribute('data-mode');
    }
  }, [electrified]);

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={electrified ? 'Deactivate electric mode' : 'Activate electric mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: compact ? '0' : '0.5rem',
        background: electrified
          ? '#DA291C'
          : 'transparent',
        border: electrified
          ? '1px solid #DA291C'
          : '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '2px',
        color: electrified ? '#ffffff' : 'rgba(255,255,255,0.6)',
        padding: compact ? '0.5rem' : '0.6rem 1rem',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: '0.8rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        minHeight: '44px',
        minWidth: compact ? '44px' : 'auto',
        transition: 'all 0.3s ease',
        boxShadow: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Electric crackle overlay when active */}
      {electrified && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
          animation: 'electric-shimmer 2s infinite',
          pointerEvents: 'none',
        }} />
      )}
      <Power size={compact ? 18 : 16} strokeWidth={electrified ? 3 : 2} />
      {!compact && <span>{electrified ? 'LIVE' : 'POWER'}</span>}
    </motion.button>
  );
}
