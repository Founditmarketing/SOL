import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Trophy, RotateCcw, AlertTriangle } from 'lucide-react';

// Substation data — positioned on a simplified Gulf South grid
const SUBSTATIONS = [
  { id: 1, name: 'BATON ROUGE', x: 38, y: 35 },
  { id: 2, name: 'LAKE CHARLES', x: 18, y: 45 },
  { id: 3, name: 'MOBILE', x: 78, y: 30 },
  { id: 4, name: 'HOUSTON', x: 5, y: 60 },
  { id: 5, name: 'ALEXANDRIA', x: 32, y: 15 },
];

const CREW_TRUCKS = [
  { id: 'crew-a', label: 'CREW A' },
  { id: 'crew-b', label: 'CREW B' },
  { id: 'crew-c', label: 'CREW C' },
  { id: 'crew-d', label: 'CREW D' },
  { id: 'crew-e', label: 'CREW E' },
];

export default function CrucibleGame() {
  const [gameState, setGameState] = useState('idle'); // idle | playing | won | lost
  const [timeLeft, setTimeLeft] = useState(30);
  const [restoredIds, setRestoredIds] = useState([]);
  const [draggedCrew, setDraggedCrew] = useState(null);
  const [usedCrews, setUsedCrews] = useState([]);

  const progress = Math.round((restoredIds.length / SUBSTATIONS.length) * 100);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timeLeft <= 0) {
      setGameState('lost');
      return;
    }
    const t = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [gameState, timeLeft]);

  // Win check
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

  const handleDragStart = (crewId) => {
    setDraggedCrew(crewId);
  };

  const handleDrop = (substationId) => {
    if (!draggedCrew || restoredIds.includes(substationId)) return;
    setRestoredIds(prev => [...prev, substationId]);
    setUsedCrews(prev => [...prev, draggedCrew]);
    setDraggedCrew(null);
  };

  // Touch support
  const handleTouchDrop = (substationId) => {
    // For touch: use the first available crew
    const available = CREW_TRUCKS.filter(c => !usedCrews.includes(c.id));
    if (available.length === 0 || restoredIds.includes(substationId)) return;
    setRestoredIds(prev => [...prev, substationId]);
    setUsedCrews(prev => [...prev, available[0].id]);
  };

  return (
    <div style={{
      background: '#0a0c10',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '1.5rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: '#F5A623', textTransform: 'uppercase', marginBottom: '4px' }}>
            <AlertTriangle size={12} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            The Crucible — Storm Response Simulator
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'rgba(240,240,250,0.5)' }}>
            {gameState === 'idle' && 'Drag crew trucks to blacked-out substations before time runs out.'}
            {gameState === 'playing' && 'Deploy crews to restore the grid!'}
            {gameState === 'won' && '🏆 Grid restored!'}
            {gameState === 'lost' && 'Time expired. The grid went dark.'}
          </div>
        </div>

        {gameState === 'playing' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ fontFamily: 'Inter', fontSize: '1.5rem', fontWeight: 700, color: timeLeft <= 10 ? '#e61e25' : '#f0f0fa', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={18} />
              {timeLeft}s
            </div>
            <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.8rem', fontWeight: 600, color: '#00a8ff', letterSpacing: '0.1em' }}>
              {progress}% RESTORED
            </div>
          </div>
        )}
      </div>

      {/* Game Area */}
      <div style={{ position: 'relative', height: '350px', background: '#060810' }}>
        {/* Progress bar at top */}
        {gameState === 'playing' && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.05)', zIndex: 5 }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: progress === 100 ? '#00e676' : '#00a8ff', boxShadow: `0 0 10px ${progress === 100 ? '#00e676' : '#00a8ff'}` }}
            />
          </div>
        )}

        {/* Grid lines (decorative) */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}>
          {SUBSTATIONS.map((s, i) =>
            SUBSTATIONS.slice(i + 1).map((s2, j) => (
              <line key={`${i}-${j}`} x1={`${s.x + 5}%`} y1={`${s.y + 5}%`} x2={`${s2.x + 5}%`} y2={`${s2.y + 5}%`} stroke="#00a8ff" strokeWidth="1" strokeDasharray="4 6" />
            ))
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
                boxShadow: ['0 0 10px rgba(230,30,37,0.5)', '0 0 25px rgba(230,30,37,0.8)', '0 0 10px rgba(230,30,37,0.5)']
              } : {}}
              transition={!isRestored ? { duration: 1, repeat: Infinity } : {}}
              style={{
                position: 'absolute',
                left: `${sub.x}%`,
                top: `${sub.y}%`,
                width: '80px',
                padding: '0.6rem 0.5rem',
                background: isRestored ? 'rgba(0, 230, 118, 0.1)' : 'rgba(230, 30, 37, 0.1)',
                border: `1px solid ${isRestored ? '#00e676' : '#e61e25'}`,
                borderRadius: '8px',
                textAlign: 'center',
                cursor: gameState === 'playing' ? 'pointer' : 'default',
                transition: 'all 0.3s',
                zIndex: 3,
              }}
            >
              <Zap size={14} color={isRestored ? '#00e676' : '#e61e25'} style={{ marginBottom: '2px' }} />
              <div style={{
                fontFamily: 'Barlow Condensed',
                fontSize: '0.55rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: isRestored ? '#00e676' : '#e61e25',
              }}>
                {sub.name}
              </div>
              <div style={{
                fontFamily: 'Barlow Condensed',
                fontSize: '0.5rem',
                color: isRestored ? 'rgba(0,230,118,0.6)' : 'rgba(230,30,37,0.6)',
                letterSpacing: '0.1em',
              }}>
                {isRestored ? '● ONLINE' : '◌ OFFLINE'}
              </div>
            </motion.div>
          );
        })}

        {/* Center prompt for idle/result states */}
        <AnimatePresence>
          {gameState === 'idle' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: 'rgba(6,8,16,0.85)' }}>
              <Zap size={40} color="#F5A623" style={{ marginBottom: '1rem' }} />
              <div style={{ fontFamily: 'Inter', fontSize: '1.3rem', fontWeight: 600, color: '#f0f0fa', marginBottom: '0.5rem' }}>Can You Save the Grid?</div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'rgba(240,240,250,0.5)', marginBottom: '2rem', maxWidth: '400px', textAlign: 'center' }}>
                A Category 4 storm just knocked out 5 substations. Deploy your crews before the timer runs out.
              </div>
              <button onClick={startGame} className="btn btn-red" style={{ fontSize: '0.85rem' }}>
                Launch Simulation
              </button>
            </motion.div>
          )}

          {gameState === 'won' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: 'rgba(6,8,16,0.9)' }}>
              <Trophy size={48} color="#F5A623" style={{ marginBottom: '1rem' }} />
              <div style={{ fontFamily: 'Inter', fontSize: '1.3rem', fontWeight: 600, color: '#00e676', marginBottom: '0.75rem' }}>Grid Restored — {30 - timeLeft}s</div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: 'rgba(240,240,250,0.6)', marginBottom: '0.5rem', maxWidth: '450px', textAlign: 'center', lineHeight: 1.6 }}>
                Now imagine doing this in 130mph winds, in the dark, for 72 hours straight.
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.95rem', color: '#F5A623', fontWeight: 600, marginBottom: '2rem' }}>
                That's what our linemen do. Respect the craft.
              </div>
              <button onClick={startGame} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RotateCcw size={14} /> Try Again
              </button>
            </motion.div>
          )}

          {gameState === 'lost' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: 'rgba(6,8,16,0.9)' }}>
              <AlertTriangle size={48} color="#e61e25" style={{ marginBottom: '1rem' }} />
              <div style={{ fontFamily: 'Inter', fontSize: '1.3rem', fontWeight: 600, color: '#e61e25', marginBottom: '0.75rem' }}>Grid Failure — {progress}% Restored</div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: 'rgba(240,240,250,0.6)', maxWidth: '400px', textAlign: 'center', lineHeight: 1.6, marginBottom: '2rem' }}>
                Thousands left in the dark. This is why our crews train relentlessly — every second counts.
              </div>
              <button onClick={startGame} className="btn btn-red" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RotateCcw size={14} /> Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Crew Dock — only visible during gameplay */}
      {gameState === 'playing' && (
        <div style={{
          padding: '1rem 2rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: '#0d0f14',
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <span style={{ fontFamily: 'Barlow Condensed', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(240,240,250,0.3)', textTransform: 'uppercase', marginRight: '0.5rem' }}>
            AVAILABLE CREWS:
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
                  background: isUsed ? 'rgba(0,230,118,0.1)' : 'rgba(245,166,35,0.1)',
                  border: `1px solid ${isUsed ? '#00e676' : '#F5A623'}`,
                  borderRadius: '6px',
                  padding: '0.4rem 0.8rem',
                  fontFamily: 'Barlow Condensed',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: isUsed ? '#00e676' : '#F5A623',
                  cursor: isUsed ? 'default' : 'grab',
                  opacity: isUsed ? 0.5 : 1,
                  userSelect: 'none',
                }}
              >
                {isUsed ? '✓ ' : '⚡ '}{crew.label}
              </motion.div>
            );
          })}
          <span style={{ fontFamily: 'Barlow Condensed', fontSize: '0.6rem', color: 'rgba(240,240,250,0.25)', letterSpacing: '0.1em', marginLeft: 'auto' }}>
            DRAG TO SUBSTATION · OR TAP TO DEPLOY
          </span>
        </div>
      )}
    </div>
  );
}
