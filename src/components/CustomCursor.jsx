import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if ('ontouchstart' in window) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if ('ontouchstart' in window) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'var(--red)' : 'var(--blue)'
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
        style={{
          position: 'fixed', top: 0, left: 0, width: '8px', height: '8px',
          borderRadius: '50%', pointerEvents: 'none', zIndex: 9999,
          mixBlendMode: 'screen', boxShadow: '0 0 10px var(--blue)'
        }}
      />
      <motion.div
        className="cursor-ring"
        animate={{
          x: mousePosition.x - (isHovering ? 30 : 20),
          y: mousePosition.y - (isHovering ? 30 : 20),
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          borderColor: isHovering ? 'var(--red)' : 'var(--blue)',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
        style={{
          position: 'fixed', top: 0, left: 0, border: '1.5px solid var(--blue)',
          borderRadius: '50%', pointerEvents: 'none', zIndex: 9998,
          opacity: 0.5, boxShadow: isHovering ? '0 0 20px rgba(230, 30, 37, 0.5)' : 'inset 0 0 10px rgba(0, 168, 255, 0.2)'
        }}
      />
      <style>{`
        body { cursor: none; }
        a, button, select, input, textarea { cursor: none; }
      `}</style>
    </>
  );
}
