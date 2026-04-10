import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function BeforeAfterSlider({ beforeSrc, afterSrc, beforeLabel = 'BEFORE', afterLabel = 'AFTER' }) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = (e) => { setIsDragging(true); updatePosition(e.clientX); };
  const handleMouseMove = (e) => { if (isDragging) updatePosition(e.clientX); };
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = (e) => { setIsDragging(true); updatePosition(e.touches[0].clientX); };
  const handleTouchMove = (e) => { if (isDragging) { e.preventDefault(); updatePosition(e.touches[0].clientX); } };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'ew-resize',
        userSelect: 'none',
        border: '1px solid rgba(240,240,250,0.08)',
      }}
    >
      {/* After (full background) */}
      <img src={afterSrc} alt={afterLabel} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />

      {/* Before (clipped) */}
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={beforeSrc} alt={beforeLabel} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Divider line */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: `${position}%`,
        width: '2px', background: '#fff', transform: 'translateX(-1px)',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)', zIndex: 5,
      }} />

      {/* Handle */}
      <div style={{
        position: 'absolute', top: '50%', left: `${position}%`,
        width: '36px', height: '36px',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
        border: '2px solid #fff', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 6,
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}>
        <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>⇄</span>
      </div>

      {/* Labels */}
      <div style={{
        position: 'absolute', top: '1rem', left: '1rem', zIndex: 4,
        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', fontWeight: 700,
        letterSpacing: '0.12em', color: '#ff4444',
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
        padding: '0.3rem 0.6rem', borderRadius: '4px',
        border: '1px solid rgba(255,68,68,0.3)',
      }}>
        {beforeLabel}
      </div>
      <div style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 4,
        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', fontWeight: 700,
        letterSpacing: '0.12em', color: '#00e676',
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
        padding: '0.3rem 0.6rem', borderRadius: '4px',
        border: '1px solid rgba(0,230,118,0.3)',
      }}>
        {afterLabel}
      </div>
    </motion.div>
  );
}
