import { useState, useCallback, useEffect } from 'react';
import { Power } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PowerToggle({ compact = false }) {
  const [powered, setPowered] = useState(() => {
    return document.documentElement.getAttribute('data-mode') === 'light';
  });

  const toggle = useCallback(() => {
    const next = !powered;
    setPowered(next);

    // Flash transition effect
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed; inset: 0; z-index: 99999; pointer-events: none;
      background: ${next ? '#fff' : '#000'};
      animation: power-flash 0.5s ease-out forwards;
    `;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);

    if (next) {
      document.documentElement.setAttribute('data-mode', 'light');
      localStorage.setItem('sol-mode', 'light');
    } else {
      document.documentElement.removeAttribute('data-mode');
      localStorage.removeItem('sol-mode');
    }
  }, [powered]);

  // Restore preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('sol-mode');
    if (saved === 'light') {
      document.documentElement.setAttribute('data-mode', 'light');
      setPowered(true);
    }
  }, []);

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={powered ? 'Switch to dark mode' : 'Switch to light mode'}
      className="power-toggle-btn"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: compact ? '0' : '0.5rem',
        background: powered
          ? 'var(--amber)'
          : 'transparent',
        border: powered
          ? '1px solid var(--amber)'
          : '1px solid rgba(240,240,250,0.25)',
        borderRadius: '0',
        color: powered ? '#000' : 'rgba(240,240,250,0.6)',
        padding: compact ? '0.5rem' : '0.55rem 1rem',
        cursor: 'pointer',
        fontFamily: 'Barlow Condensed, sans-serif',
        fontWeight: 700,
        fontSize: '0.65rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        minHeight: '44px',
        minWidth: compact ? '44px' : 'auto',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Power size={compact ? 16 : 14} strokeWidth={powered ? 2.5 : 2} />
      {!compact && <span>{powered ? 'ON' : 'OFF'}</span>}
    </motion.button>
  );
}
