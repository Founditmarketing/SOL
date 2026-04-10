import { useGrid } from '../context/GridContext';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function DispatchTicker() {
  const { dispatchMessages, stressLevel } = useGrid();

  if (!dispatchMessages.length) return null;

  // Double up messages for seamless infinite scroll
  const tickerItems = [...dispatchMessages, ...dispatchMessages, ...dispatchMessages];

  const accentColor = stressLevel >= 7 ? '#e61e25' : stressLevel >= 4 ? '#F5A623' : '#00a8ff';

  return (
    <div style={{
      width: '100%',
      background: '#050508',
      borderBottom: `1px solid ${accentColor}22`,
      overflow: 'hidden',
      position: 'relative',
      zIndex: 100,
      height: '36px',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* Left badge */}
      <div style={{
        background: accentColor,
        color: '#000',
        fontFamily: 'Barlow Condensed',
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        padding: '0 0.75rem',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        whiteSpace: 'nowrap',
        zIndex: 2,
        flexShrink: 0,
      }}>
        <Zap size={11} />
        LIVE
      </div>

      {/* Scrolling ticker tape */}
      <div style={{ overflow: 'hidden', flex: 1, position: 'relative' }}>
        <motion.div
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: tickerItems.length * 4,
              ease: 'linear',
            }
          }}
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            gap: '0',
          }}
        >
          {tickerItems.map((msg, idx) => (
            <span key={idx} style={{
              fontFamily: 'Barlow Condensed',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: msg.type === 'alert' 
                ? (msg.severity === 'Extreme' ? '#e61e25' : '#F5A623')
                : 'rgba(240,240,250,0.5)',
              padding: '0 2rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: msg.type === 'alert' ? '#e61e25' : accentColor,
                flexShrink: 0,
                boxShadow: msg.type === 'alert' ? '0 0 6px #e61e25' : 'none',
              }} />
              {msg.text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Right edge fade */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '60px',
        background: 'linear-gradient(90deg, transparent, #050508)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />
    </div>
  );
}
