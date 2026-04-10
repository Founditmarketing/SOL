import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

// Set this to the actual last incident date — using Jan 1 2025 as placeholder
const LAST_INCIDENT_DATE = new Date('2025-01-01T00:00:00');

function pad(n) { return String(n).padStart(2, '0'); }

function TimeUnit({ value, label }) {
  return (
    <div style={{ textAlign: 'center', minWidth: '72px' }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(2rem, 5vw, 3.2rem)',
        fontWeight: 800,
        color: '#00e676',
        lineHeight: 1,
        textShadow: '0 0 30px rgba(0,230,118,0.2)',
      }}>
        {pad(value)}
      </div>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.45rem',
        fontWeight: 600,
        letterSpacing: '0.15em',
        color: 'rgba(0,230,118,0.7)',
        marginTop: '6px',
      }}>
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
      fontWeight: 300,
      color: 'rgba(0,230,118,0.4)',
      lineHeight: 1,
      alignSelf: 'flex-start',
      paddingTop: '0.15em',
    }}>
      :
    </div>
  );
}

export default function IncidentCounter() {
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = now - LAST_INCIDENT_DATE.getTime();
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setElapsed({ days, hours, minutes, seconds });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        background: 'rgba(0,230,118,0.03)',
        border: '1px solid rgba(0,230,118,0.12)',
        borderRadius: '20px',
        padding: 'clamp(2rem, 4vw, 3rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle pulse ring behind */}
      <motion.div
        animate={{ scale: [1, 1.5], opacity: [0.1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '200px', height: '200px',
          marginLeft: '-100px', marginTop: '-100px',
          borderRadius: '50%',
          border: '1px solid rgba(0,230,118,0.2)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem' }}>
        <Shield size={16} color="#00e676" />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.55rem', fontWeight: 700,
          letterSpacing: '0.15em', color: '#00e676',
        }}>
          ACTIVE SAFETY STREAK
        </span>
      </div>

      <div style={{
        fontFamily: 'Inter', fontSize: '0.8rem',
        color: 'rgba(240,240,250,0.6)', marginBottom: '1.5rem',
      }}>
        Since last recordable incident
      </div>

      {/* Clock display */}
      <div style={{
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'center', gap: 'clamp(0.5rem, 2vw, 1rem)',
        flexWrap: 'nowrap',
      }}>
        <TimeUnit value={elapsed.days} label="DAYS" />
        <Separator />
        <TimeUnit value={elapsed.hours} label="HOURS" />
        <Separator />
        <TimeUnit value={elapsed.minutes} label="MINUTES" />
        <Separator />
        <TimeUnit value={elapsed.seconds} label="SECONDS" />
      </div>

      {/* Sub-label */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.45rem', fontWeight: 500,
        letterSpacing: '0.1em',
        color: 'rgba(240,240,250,0.4)',
        marginTop: '1.5rem',
      }}>
        EVERY SECOND COUNTS · EVERY WORKER HOME SAFE
      </div>
    </motion.div>
  );
}
