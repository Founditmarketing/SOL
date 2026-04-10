import { useGrid } from '../context/GridContext';
import { useEffect, useState } from 'react';

export default function GridGlitch() {
  const { stressLevel } = useGrid();
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (stressLevel < 5) return;

    // The higher the stress, the more frequent the glitches
    const baseInterval = stressLevel >= 8 ? 2000 : stressLevel >= 6 ? 5000 : 10000;

    const interval = setInterval(() => {
      setGlitchActive(true);
      // Glitch duration scales with severity
      const duration = stressLevel >= 8 ? 300 : 150;
      setTimeout(() => setGlitchActive(false), duration);
    }, baseInterval + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [stressLevel]);

  if (stressLevel < 5) return null;

  return (
    <>
      {/* Scanline overlay — always present when elevated */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99998,
        pointerEvents: 'none',
        background: stressLevel >= 7 
          ? 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.015) 2px, rgba(255,0,0,0.015) 4px)'
          : 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,168,255,0.01) 2px, rgba(0,168,255,0.01) 4px)',
        opacity: stressLevel >= 8 ? 0.8 : 0.4,
        mixBlendMode: 'screen',
      }} />

      {/* Active glitch burst */}
      {glitchActive && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          pointerEvents: 'none',
          background: stressLevel >= 8 
            ? 'rgba(255, 0, 0, 0.03)'
            : 'rgba(0, 168, 255, 0.02)',
          clipPath: `inset(${Math.random() * 40}% 0 ${Math.random() * 40}% 0)`,
          animation: 'glitch-flash 0.15s steps(2) forwards',
        }} />
      )}

      <style>{`
        @keyframes glitch-flash {
          0% { transform: translateX(-3px); }
          25% { transform: translateX(3px) skewX(-0.5deg); }
          50% { transform: translateX(-1px); }
          75% { transform: translateX(2px) skewX(0.3deg); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
