import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

// Generate safety data for the year — mostly green with rare incidents
function generateSafetyData(year) {
  const data = [];
  const today = new Date();
  const start = new Date(year, 0, 1);
  const dayOfWeek = start.getDay(); // 0=Sun

  // Simulate: 2 minor incidents in the year (first-aid level, not recordable)
  const incidentDays = new Set([42, 187]); // day-of-year indices

  let current = new Date(start);
  while (current <= today && current.getFullYear() === year) {
    const dayOfYear = Math.floor((current - start) / 86400000);
    let level = 3; // safe day (bright green)
    
    if (incidentDays.has(dayOfYear)) {
      level = 0; // incident (red)
    } else if (Math.random() < 0.04) {
      level = 2; // near-miss reported (amber — good culture)
    } else if (Math.random() < 0.08) {
      level = 1; // safety observation filed (light green)
    }

    // Future days get no level
    if (current > today) level = -1;

    data.push({
      date: new Date(current),
      level,
      dayOfYear,
    });
    current.setDate(current.getDate() + 1);
  }
  return { data, startDayOfWeek: dayOfWeek };
}

const COLORS = {
  '-1': 'rgba(240,240,250,0.02)', // future
  0: '#ff4444',                    // incident
  1: 'rgba(0,230,118,0.15)',       // observation
  2: 'rgba(245,166,35,0.3)',       // near-miss
  3: 'rgba(0,230,118,0.4)',        // safe
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['', 'M', '', 'W', '', 'F', ''];

export default function SafetyHeatmap() {
  const year = new Date().getFullYear();
  const { data, startDayOfWeek } = useMemo(() => generateSafetyData(year), [year]);

  // Build grid: 7 rows (days) x ~53 cols (weeks)
  const weeks = [];
  let currentWeek = new Array(startDayOfWeek).fill(null); // pad first week

  data.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  // Stats
  const safeDays = data.filter(d => d.level === 3).length;
  const observations = data.filter(d => d.level === 1).length;
  const nearMisses = data.filter(d => d.level === 2).length;
  const incidents = data.filter(d => d.level === 0).length;
  const safeRate = ((safeDays / data.length) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        background: 'rgba(0,230,118,0.02)',
        border: '1px solid rgba(0,230,118,0.08)',
        borderRadius: '20px',
        padding: 'clamp(1.25rem, 3vw, 2rem)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem',
            fontWeight: 600, letterSpacing: '0.12em', color: '#00e676',
            display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px',
          }}>
            <Calendar size={12} /> {year} SAFETY RECORD
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'rgba(240,240,250,0.35)' }}>
            {data.length} days tracked · {safeRate}% incident-free
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {[
            { color: COLORS[3], label: 'Safe' },
            { color: COLORS[1], label: 'Observation' },
            { color: COLORS[2], label: 'Near-miss' },
            { color: COLORS[0], label: 'Incident' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: item.color }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.4rem', color: 'rgba(240,240,250,0.3)', letterSpacing: '0.05em' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Month labels */}
      <div style={{ display: 'flex', marginLeft: '18px', marginBottom: '4px' }}>
        {MONTHS.map((m, i) => (
          <div key={m} style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.4rem',
            color: 'rgba(240,240,250,0.2)', letterSpacing: '0.05em',
            width: `${100 / 12}%`, textAlign: 'left',
          }}>
            {m}
          </div>
        ))}
      </div>

      {/* Heatmap grid */}
      <div style={{ display: 'flex', gap: '2px' }}>
        {/* Day labels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginRight: '4px', justifyContent: 'flex-start' }}>
          {DAYS.map((d, i) => (
            <div key={i} style={{
              width: '12px', height: '11px',
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.35rem',
              color: 'rgba(240,240,250,0.15)', display: 'flex',
              alignItems: 'center', justifyContent: 'flex-end',
            }}>
              {d}
            </div>
          ))}
        </div>

        {/* Weeks */}
        <div style={{ display: 'flex', gap: '2px', flex: 1, overflowX: 'auto' }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {week.map((day, di) => (
                <div
                  key={di}
                  title={day ? `${day.date.toLocaleDateString()} — ${day.level === 3 ? 'Safe day' : day.level === 2 ? 'Near-miss reported' : day.level === 1 ? 'Safety observation' : day.level === 0 ? 'Incident' : ''}` : ''}
                  style={{
                    width: '11px', height: '11px',
                    borderRadius: '2px',
                    background: day ? COLORS[day.level] : 'transparent',
                    transition: 'transform 0.1s',
                    cursor: day ? 'default' : 'default',
                  }}
                  onMouseEnter={(e) => { if (day) e.currentTarget.style.transform = 'scale(1.4)'; }}
                  onMouseLeave={(e) => { if (day) e.currentTarget.style.transform = 'scale(1)'; }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats footer */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        {[
          { value: safeDays, label: 'SAFE DAYS', color: '#00e676' },
          { value: observations, label: 'OBSERVATIONS', color: 'rgba(0,230,118,0.6)' },
          { value: nearMisses, label: 'NEAR-MISSES', color: '#ff9100' },
          { value: incidents, label: 'INCIDENTS', color: '#ff4444' },
        ].map(stat => (
          <div key={stat.label}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.1rem', fontWeight: 800, color: stat.color }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.4rem', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(240,240,250,0.2)' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
