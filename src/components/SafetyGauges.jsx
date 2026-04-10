import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ═══ ANIMATED GAUGE ═══
function Gauge({ value, max, industryAvg, label, unit, color, description }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  // Animate the value
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 2500, bounce: 0 });
  const display = useTransform(spring, (v) => v.toFixed(2));

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, motionVal, value]);

  // SVG arc calculation
  const radius = 80;
  const strokeWidth = 10;
  const circumference = Math.PI * radius; // semicircle
  const percentage = value / max;
  const avgPercentage = industryAvg / max;

  const arcLength = circumference * percentage;
  const avgArcLength = circumference * avgPercentage;

  const isGood = value <= industryAvg;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        background: 'rgba(240,240,250,0.02)',
        border: `1px solid ${isGood ? 'rgba(0,230,118,0.1)' : 'rgba(255,68,68,0.1)'}`,
        borderRadius: '16px',
        padding: '2rem 1.5rem',
        textAlign: 'center',
      }}
    >
      {/* Label */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem',
        fontWeight: 700, letterSpacing: '0.12em',
        color: isGood ? '#00e676' : '#ff4444',
        marginBottom: '1rem',
      }}>
        {label}
      </div>

      {/* SVG Gauge */}
      <div style={{ position: 'relative', width: '180px', height: '100px', margin: '0 auto' }}>
        <svg viewBox="0 0 180 100" style={{ width: '100%', height: '100%' }}>
          {/* Background arc */}
          <path
            d="M 10 90 A 80 80 0 0 1 170 90"
            fill="none"
            stroke="rgba(240,240,250,0.06)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Industry average marker */}
          <path
            d="M 10 90 A 80 80 0 0 1 170 90"
            fill="none"
            stroke="rgba(255,145,0,0.3)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray={`${avgArcLength} ${circumference}`}
            style={{ transition: 'stroke-dasharray 2s ease' }}
          />

          {/* Value arc */}
          <motion.path
            d="M 10 90 A 80 80 0 0 1 170 90"
            fill="none"
            stroke={isGood ? '#00e676' : '#ff4444'}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={inView ? { strokeDasharray: `${arcLength} ${circumference}` } : {}}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{
              filter: `drop-shadow(0 0 8px ${isGood ? 'rgba(0,230,118,0.3)' : 'rgba(255,68,68,0.3)'})`,
            }}
          />
        </svg>

        {/* Center value */}
        <div style={{
          position: 'absolute', bottom: '0', left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '1.8rem', fontWeight: 800,
            color: isGood ? '#00e676' : '#ff4444',
            lineHeight: 1,
          }}>
            <motion.span>{display}</motion.span>
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', fontWeight: 700, color: isGood ? '#00e676' : '#ff4444' }}>
            {value} {unit}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.4rem', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(240,240,250,0.5)' }}>
            SOL POWERLINES
          </div>
        </div>
        <div style={{ width: '1px', background: 'rgba(240,240,250,0.06)' }} />
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', fontWeight: 700, color: '#ff9100' }}>
            {industryAvg} {unit}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.4rem', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(240,240,250,0.5)' }}>
            INDUSTRY AVG
          </div>
        </div>
      </div>

      {/* Status badge */}
      <div style={{
        marginTop: '1rem',
        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.45rem',
        fontWeight: 700, letterSpacing: '0.1em',
        color: isGood ? '#00e676' : '#ff4444',
        background: isGood ? 'rgba(0,230,118,0.06)' : 'rgba(255,68,68,0.06)',
        border: `1px solid ${isGood ? 'rgba(0,230,118,0.15)' : 'rgba(255,68,68,0.15)'}`,
        padding: '0.3rem 0.8rem', borderRadius: '100px',
        display: 'inline-block',
      }}>
        {isGood ? '✓ BELOW INDUSTRY AVERAGE' : '⚠ ABOVE INDUSTRY AVERAGE'}
      </div>

      {/* Description */}
      <div style={{
        fontFamily: 'Inter', fontSize: '0.7rem', lineHeight: 1.6,
        color: 'rgba(240,240,250,0.6)', marginTop: '0.75rem',
        maxWidth: '280px', margin: '0.75rem auto 0',
      }}>
        {description}
      </div>
    </motion.div>
  );
}

export default function SafetyGauges() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <Gauge
          value={0.82}
          max={5}
          industryAvg={2.8}
          label="TOTAL RECORDABLE INCIDENT RATE"
          unit="TRIR"
          color="#00e676"
          description="TRIR measures the number of recordable incidents per 200,000 work hours. Lower is safer."
        />
        <Gauge
          value={0.74}
          max={2}
          industryAvg={1.0}
          label="EXPERIENCE MODIFICATION RATE"
          unit="EMR"
          color="#00e676"
          description="EMR compares our workers' comp claims to industry norms. Below 1.0 means we're safer than average."
        />
        <Gauge
          value={0.00}
          max={5}
          industryAvg={0.9}
          label="DAYS AWAY / RESTRICTED / TRANSFER"
          unit="DART"
          color="#00e676"
          description="DART tracks incidents serious enough to cause missed work, restricted duty, or job transfer."
        />
      </div>
    </motion.div>
  );
}
