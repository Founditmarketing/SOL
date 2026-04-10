import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Trophy, RotateCcw, AlertTriangle, Shield } from 'lucide-react';

const SUBSTATIONS = [
  { id: 1, name: 'BATON ROUGE', x: 38, y: 35, kv: '138kV' },
  { id: 2, name: 'LAKE CHARLES', x: 18, y: 45, kv: '69kV' },
  { id: 3, name: 'MOBILE', x: 78, y: 30, kv: '230kV' },
  { id: 4, name: 'HOUSTON', x: 5, y: 60, kv: '345kV' },
  { id: 5, name: 'ALEXANDRIA', x: 32, y: 15, kv: '115kV' },
];

const CREW_TRUCKS = [
  { id: 'crew-a', label: 'ALPHA' },
  { id: 'crew-b', label: 'BRAVO' },
  { id: 'crew-c', label: 'CHARLIE' },
  { id: 'crew-d', label: 'DELTA' },
  { id: 'crew-e', label: 'ECHO' },
];

export default function CrucibleGame() {
  const [gameState, setGameState] = useState('idle');
  const [timeLeft, setTimeLeft] = useState(30);
  const [restoredIds, setRestoredIds] = useState([]);
  const [draggedCrew, setDraggedCrew] = useState(null);
  const [usedCrews, setUsedCrews] = useState([]);

  const progress = Math.round((restoredIds.length / SUBSTATIONS.length) * 100);

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timeLeft <= 0) { setGameState('lost'); return; }
    const t = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (gameState === 'playing' && restoredIds.length === SUBSTATIONS.length) {
      setGameState('won');
    }
  }, [restoredIds, gameState]);

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(30);
    setRestoredIds([]);
    setUsedCrews([]);
  };

  const handleDragStart = (crewId) => setDraggedCrew(crewId);

  const handleDrop = (substationId) => {
    if (!draggedCrew || restoredIds.includes(substationId)) return;
    setRestoredIds(prev => [...prev, substationId]);
    setUsedCrews(prev => [...prev, draggedCrew]);
    setDraggedCrew(null);
  };

  const handleTouchDrop = (substationId) => {
    const available = CREW_TRUCKS.filter(c => !usedCrews.includes(c.id));
    if (available.length === 0 || restoredIds.includes(substationId)) return;
    setRestoredIds(prev => [...prev, substationId]);
    setUsedCrews(prev => [...prev, available[0].id]);
  };

  return (
    <div style={{
      background: '#070a10',
      border: '1px solid rgba(0,168,255,0.12)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 0 40px rgba(0,168,255,0.04)',
    }}>
      {/* ═══ HEADER ═══ */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid rgba(0,168,255,0.08)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem',
        background: 'linear-gradient(180deg, rgba(0,168,255,0.04) 0%, transparent 100%)',
      }}>
        <div>
          <div style={{ 
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', fontWeight: 600, 
            letterSpacing: '0.15em', color: '#00a8ff', marginBottom: '4px',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <Shield size={11} /> THE CRUCIBLE // STORM RESPONSE SIMULATOR
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: '0.8rem', color: 'rgba(240,240,250,0.45)' }}>
            {gameState === 'idle' && 'Tap blacked-out substations to deploy crews before time runs out.'}
            {gameState === 'playing' && 'Deploy crews to restore the grid!'}
            {gameState === 'won' && 'Grid restored. All stations online.'}
            {gameState === 'lost' && 'Time expired. Grid failure.'}
          </div>
        </div>

        {gameState === 'playing' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ 
              fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4rem', fontWeight: 700, 
              color: timeLeft <= 10 ? '#ff4444' : '#f0f0fa', 
              display: 'flex', alignItems: 'center', gap: '6px',
              textShadow: timeLeft <= 10 ? '0 0 20px rgba(255,68,68,0.4)' : 'none',
            }}>
              <Clock size={16} />
              {String(timeLeft).padStart(2, '0')}s
            </div>
            <div style={{ 
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', fontWeight: 600, 
              color: progress === 100 ? '#00e676' : '#00a8ff', letterSpacing: '0.1em' 
            }}>
              {progress}%
            </div>
          </div>
        )}
      </div>

      {/* ═══ GAME FIELD ═══ */}
      <div style={{ position: 'relative', height: '320px', background: '#050810' }}>
        {/* Progress bar */}
        {gameState === 'playing' && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'rgba(0,168,255,0.08)', zIndex: 5 }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ height: '100%', background: progress === 100 ? '#00e676' : '#00a8ff', boxShadow: `0 0 12px ${progress === 100 ? '#00e676' : '#00a8ff'}` }}
            />
          </div>
        )}

        {/* Radar sweep animation */}
        {gameState === 'playing' && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', left: '50%', top: '50%',
              width: '300px', height: '300px', marginLeft: '-150px', marginTop: '-150px',
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(0,168,255,0.06) 15%, transparent 30%)',
              borderRadius: '50%', zIndex: 1, pointerEvents: 'none',
            }}
          />
        )}

        {/* Grid connection lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12, zIndex: 1 }}>
          {SUBSTATIONS.map((s, i) =>
            SUBSTATIONS.slice(i + 1).map((s2, j) => {
              const restored = restoredIds.includes(s.id) && restoredIds.includes(s2.id);
              return (
                <line key={`${i}-${j}`} 
                  x1={`${s.x + 5}%`} y1={`${s.y + 5}%`} 
                  x2={`${s2.x + 5}%`} y2={`${s2.y + 5}%`} 
                  stroke={restored ? '#00e676' : '#00a8ff'} 
                  strokeWidth={restored ? '1.5' : '1'} 
                  strokeDasharray={restored ? 'none' : '4 8'} 
                  opacity={restored ? 0.5 : 1}
                />
              );
            })
          )}
        </svg>

        {/* Substations */}
        {SUBSTATIONS.map(sub => {
          const isRestored = restoredIds.includes(sub.id);
          return (
            <motion.div
              key={sub.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(sub.id)}
              onClick={() => gameState === 'playing' && handleTouchDrop(sub.id)}
              animate={!isRestored && gameState === 'playing' ? {
                boxShadow: ['0 0 8px rgba(255,68,68,0.3)', '0 0 20px rgba(255,68,68,0.6)', '0 0 8px rgba(255,68,68,0.3)']
              } : isRestored ? {
                boxShadow: '0 0 15px rgba(0,230,118,0.2)'
              } : {}}
              transition={!isRestored && gameState === 'playing' ? { duration: 1.2, repeat: Infinity } : {}}
              style={{
                position: 'absolute',
                left: `${sub.x}%`,
                top: `${sub.y}%`,
                width: '85px',
                padding: '0.5rem',
                background: isRestored ? 'rgba(0, 230, 118, 0.08)' : 'rgba(255, 68, 68, 0.06)',
                border: `1px solid ${isRestored ? 'rgba(0,230,118,0.4)' : 'rgba(255,68,68,0.3)'}`,
                borderRadius: '10px',
                textAlign: 'center',
                cursor: gameState === 'playing' ? 'pointer' : 'default',
                transition: 'all 0.3s',
                zIndex: 3,
                backdropFilter: 'blur(4px)',
              }}
            >
              <Zap size={13} color={isRestored ? '#00e676' : '#ff4444'} style={{ marginBottom: '2px' }} />
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem', fontWeight: 700,
                letterSpacing: '0.08em', color: isRestored ? '#00e676' : '#ff4444',
                marginBottom: '1px',
              }}>
                {sub.name}
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.45rem',
                color: isRestored ? 'rgba(0,230,118,0.5)' : 'rgba(255,68,68,0.4)',
                letterSpacing: '0.1em',
              }}>
                {sub.kv} · {isRestored ? 'ONLINE' : 'OFFLINE'}
              </div>
            </motion.div>
          );
        })}

        {/* ═══ OVERLAYS ═══ */}
        <AnimatePresence>
          {gameState === 'idle' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: 'rgba(5,8,16,0.92)', backdropFilter: 'blur(8px)' }}>
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Zap size={36} color="#F5A623" style={{ marginBottom: '1rem' }} />
              </motion.div>
              <div style={{ fontFamily: 'Inter', fontSize: '1.2rem', fontWeight: 600, color: '#f0f0fa', marginBottom: '0.4rem' }}>Can You Save the Grid?</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'rgba(240,240,250,0.4)', marginBottom: '2rem', maxWidth: '350px', textAlign: 'center', lineHeight: 1.8 }}>
                Category 4 storm. 5 substations offline.<br/>Deploy crews before the timer runs out.
              </div>
              <button onClick={startGame} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '0.75rem 2rem', background: 'var(--amber)', color: '#000',
                border: 'none', borderRadius: '6px', cursor: 'pointer',
              }}>
                ▶ LAUNCH SIMULATION
              </button>
            </motion.div>
          )}

          {gameState === 'won' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: 'rgba(5,8,16,0.92)', backdropFilter: 'blur(8px)' }}>
              <Trophy size={40} color="#F5A623" style={{ marginBottom: '1rem' }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.1rem', fontWeight: 700, color: '#00e676', marginBottom: '0.5rem' }}>
                GRID RESTORED — {String(30 - timeLeft).padStart(2, '0')}s
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.8rem', color: 'rgba(240,240,250,0.5)', maxWidth: '380px', textAlign: 'center', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                Now imagine doing this in 130mph winds, in the dark, for 72 hours straight.
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: '#F5A623', fontWeight: 600, marginBottom: '1.5rem' }}>
                That's what our linemen do.
              </div>
              <button onClick={startGame} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '0.6rem 1.5rem', background: 'none', color: 'rgba(240,240,250,0.5)',
                border: '1px solid rgba(240,240,250,0.15)', borderRadius: '6px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <RotateCcw size={12} /> RETRY
              </button>
            </motion.div>
          )}

          {gameState === 'lost' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: 'rgba(5,8,16,0.92)', backdropFilter: 'blur(8px)' }}>
              <AlertTriangle size={40} color="#ff4444" style={{ marginBottom: '1rem' }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.1rem', fontWeight: 700, color: '#ff4444', marginBottom: '0.5rem' }}>
                GRID FAILURE — {progress}%
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.8rem', color: 'rgba(240,240,250,0.5)', maxWidth: '350px', textAlign: 'center', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Thousands left in the dark. Every second counts.
              </div>
              <button onClick={startGame} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '0.75rem 2rem', background: '#ff4444', color: '#fff',
                border: 'none', borderRadius: '6px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <RotateCcw size={12} /> RETRY
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══ CREW DOCK ═══ */}
      {gameState === 'playing' && (
        <div style={{
          padding: '0.75rem 1.5rem',
          borderTop: '1px solid rgba(0,168,255,0.08)',
          background: '#0a0d14',
          display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center',
        }}>
          <span style={{ 
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem', fontWeight: 600, 
            letterSpacing: '0.12em', color: 'rgba(240,240,250,0.2)', marginRight: '0.25rem' 
          }}>
            CREWS:
          </span>
          {CREW_TRUCKS.map(crew => {
            const isUsed = usedCrews.includes(crew.id);
            return (
              <motion.div
                key={crew.id}
                draggable={!isUsed}
                onDragStart={() => !isUsed && handleDragStart(crew.id)}
                whileHover={!isUsed ? { scale: 1.05, y: -2 } : {}}
                whileTap={!isUsed ? { scale: 0.95 } : {}}
                style={{
                  background: isUsed ? 'rgba(0,230,118,0.08)' : 'rgba(245,166,35,0.08)',
                  border: `1px solid ${isUsed ? 'rgba(0,230,118,0.3)' : 'rgba(245,166,35,0.25)'}`,
                  borderRadius: '6px',
                  padding: '0.3rem 0.6rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: isUsed ? '#00e676' : '#F5A623',
                  cursor: isUsed ? 'default' : 'grab',
                  opacity: isUsed ? 0.4 : 1,
                  userSelect: 'none',
                  transition: 'all 0.2s',
                }}
              >
                {isUsed ? '✓' : '⚡'} {crew.label}
              </motion.div>
            );
          })}
          <span style={{ 
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.45rem', 
            color: 'rgba(240,240,250,0.15)', letterSpacing: '0.08em', marginLeft: 'auto' 
          }}>
            TAP SUBSTATION TO DEPLOY
          </span>
        </div>
      )}
    </div>
  );
}
