import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Skull, RotateCcw, ChevronRight } from 'lucide-react';

const SCENARIOS = [
  {
    id: 1,
    title: 'Scenario: Unmarked Underground Line',
    situation: 'Your crew is trenching for a new underground conduit. The locator marks are 48 hours old and a water main was recently installed nearby. Your foreman says "we\'re behind schedule, just dig carefully."',
    stopResult: {
      headline: 'Correct — Stop Work Issued',
      detail: 'You called for a re-locate. The new scan revealed an unmarked gas line 18 inches from the dig path. Your decision prevented a potential explosion and saved lives. At SolPowerlines, this is expected — not optional.',
    },
    continueResult: {
      headline: 'Critical Safety Failure',
      detail: 'The bucket hit an unmarked gas line at 3 feet. The rupture triggered an evacuation of 200 homes and a $2.1M fine. One crew member was hospitalized with burns. This is exactly why Stop-Work Authority exists.',
    },
  },
  {
    id: 2,
    title: 'Scenario: Storm Restoration Fatigue',
    situation: 'It\'s hour 16 of a hurricane restoration shift. Your lineman is swaying on the pole and nearly dropped a hot clamp. He says he\'s "fine, just one more span." The supervisor wants the feeder energized by midnight.',
    stopResult: {
      headline: 'Correct — Crew Stood Down',
      detail: 'You rotated the fatigued lineman off the pole immediately. Fresh crew finished the span safely. Human Performance research shows that 16+ hour shifts produce error rates equivalent to 0.08 BAC. People Matter More than deadlines.',
    },
    continueResult: {
      headline: 'Fatigue-Related Fall',
      detail: 'On the next span, the lineman lost grip on a 25kV conductor during a mid-span tie. The arc flash caused second-degree burns and a 30-foot fall. He survived but will never climb again. Fatigue kills — stopping work saves lives.',
    },
  },
  {
    id: 3,
    title: 'Scenario: Improper Grounding',
    situation: 'A crew is de-energizing a 12.47kV feeder for maintenance. The grounds are set, but you notice the downstream recloser wasn\'t tagged and could back-feed the line. The crew lead says "dispatch confirmed it\'s clear."',
    stopResult: {
      headline: 'Correct — Verified Before Proceeding',
      detail: 'You insisted on visual verification. The recloser was still in AUTO mode — one fault on an adjacent feeder would have energized your crew\'s workspace with lethal voltage. Trust but verify. Always.',
    },
    continueResult: {
      headline: 'Back-Feed Electrocution Risk',
      detail: 'An adjacent feeder faulted, and the untagged recloser back-fed 12.47kV into the "de-energized" section. The crew had seconds to react. In real scenarios like this, linemen have been killed. Proper lockout/tagout is non-negotiable.',
    },
  },
];

export default function StopWorkSimulator() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [decision, setDecision] = useState(null); // null | 'stop' | 'continue'
  const [started, setStarted] = useState(false);

  const scenario = SCENARIOS[scenarioIndex];

  const reset = () => {
    setDecision(null);
    setStarted(false);
    setScenarioIndex(0);
  };

  const nextScenario = () => {
    setDecision(null);
    setScenarioIndex(prev => (prev + 1) % SCENARIOS.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        background: '#070a10',
        border: '1px solid rgba(255,145,0,0.12)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 0 40px rgba(255,145,0,0.03)',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid rgba(255,145,0,0.08)',
        background: 'linear-gradient(180deg, rgba(255,145,0,0.04) 0%, transparent 100%)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem',
            fontWeight: 600, letterSpacing: '0.15em', color: '#ff9100',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <AlertTriangle size={12} /> STOP-WORK AUTHORITY SIMULATOR
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'rgba(240,240,250,0.35)', marginTop: '2px' }}>
            What would you do? Every SolPowerlines employee has the power — and obligation — to stop work.
          </div>
        </div>
        {(started || decision) && (
          <button onClick={reset} style={{
            background: 'none', border: '1px solid rgba(240,240,250,0.1)',
            borderRadius: '6px', padding: '0.35rem 0.7rem',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem',
            fontWeight: 600, letterSpacing: '0.08em',
            color: 'rgba(240,240,250,0.4)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <RotateCcw size={10} /> RESET
          </button>
        )}
      </div>

      {/* Content area */}
      <div style={{ padding: '2rem', minHeight: '300px', position: 'relative' }}>
        <AnimatePresence mode="wait">
          {!started && !decision && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '2rem 0' }}>
              <AlertTriangle size={36} color="#ff9100" style={{ marginBottom: '1rem' }} />
              <div style={{ fontFamily: 'Inter', fontSize: '1.1rem', fontWeight: 600, color: '#f0f0fa', marginBottom: '0.5rem' }}>
                Can You Make the Right Call?
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'rgba(240,240,250,0.4)', maxWidth: '400px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
                You'll face a real job-site scenario. Your crew is counting on you to make the right decision.
              </div>
              <button onClick={() => setStarted(true)} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '0.75rem 2rem', background: '#ff9100', color: '#000',
                border: 'none', borderRadius: '8px', cursor: 'pointer',
              }}>
                ▶ BEGIN SCENARIO
              </button>
            </motion.div>
          )}

          {started && !decision && (
            <motion.div key="scenario" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {/* Scenario counter */}
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.45rem',
                fontWeight: 600, letterSpacing: '0.12em',
                color: 'rgba(240,240,250,0.2)', marginBottom: '0.75rem',
              }}>
                SCENARIO {scenarioIndex + 1} / {SCENARIOS.length}
              </div>

              <h3 style={{ fontFamily: 'Inter', fontSize: '1rem', fontWeight: 600, color: '#f0f0fa', marginBottom: '1rem' }}>
                {scenario.title}
              </h3>

              <div style={{
                background: 'rgba(255,145,0,0.04)', border: '1px solid rgba(255,145,0,0.1)',
                borderRadius: '12px', padding: '1.25rem',
                fontFamily: 'Inter', fontSize: '0.85rem', lineHeight: 1.7,
                color: 'rgba(240,240,250,0.6)', marginBottom: '2rem',
              }}>
                {scenario.situation}
              </div>

              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem',
                fontWeight: 600, letterSpacing: '0.12em',
                color: 'rgba(240,240,250,0.25)', marginBottom: '0.75rem', textAlign: 'center',
              }}>
                WHAT DO YOU DO?
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setDecision('stop')}
                  style={{
                    padding: '1.25rem', borderRadius: '14px', cursor: 'pointer',
                    background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.2)',
                    textAlign: 'center', transition: 'all 0.2s',
                  }}
                >
                  <ShieldCheck size={24} color="#00e676" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontFamily: 'Inter', fontSize: '0.9rem', fontWeight: 700, color: '#00e676', marginBottom: '4px' }}>
                    Stop Work
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.45rem', color: 'rgba(0,230,118,0.5)', letterSpacing: '0.08em' }}>
                    HALT OPERATIONS
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setDecision('continue')}
                  style={{
                    padding: '1.25rem', borderRadius: '14px', cursor: 'pointer',
                    background: 'rgba(255,68,68,0.06)', border: '1px solid rgba(255,68,68,0.2)',
                    textAlign: 'center', transition: 'all 0.2s',
                  }}
                >
                  <Skull size={24} color="#ff4444" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontFamily: 'Inter', fontSize: '0.9rem', fontWeight: 700, color: '#ff4444', marginBottom: '4px' }}>
                    Continue Work
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.45rem', color: 'rgba(255,68,68,0.5)', letterSpacing: '0.08em' }}>
                    PUSH THROUGH
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {decision && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <div style={{
                textAlign: 'center', padding: '1rem 0',
              }}>
                {decision === 'stop' ? (
                  <ShieldCheck size={40} color="#00e676" style={{ marginBottom: '1rem' }} />
                ) : (
                  <Skull size={40} color="#ff4444" style={{ marginBottom: '1rem' }} />
                )}

                <div style={{
                  fontFamily: 'Inter', fontSize: '1.1rem', fontWeight: 700,
                  color: decision === 'stop' ? '#00e676' : '#ff4444',
                  marginBottom: '1rem',
                }}>
                  {decision === 'stop' ? scenario.stopResult.headline : scenario.continueResult.headline}
                </div>

                <div style={{
                  background: decision === 'stop' ? 'rgba(0,230,118,0.04)' : 'rgba(255,68,68,0.04)',
                  border: `1px solid ${decision === 'stop' ? 'rgba(0,230,118,0.12)' : 'rgba(255,68,68,0.12)'}`,
                  borderRadius: '12px', padding: '1.25rem',
                  fontFamily: 'Inter', fontSize: '0.85rem', lineHeight: 1.7,
                  color: 'rgba(240,240,250,0.6)', textAlign: 'left',
                  maxWidth: '500px', margin: '0 auto 1.5rem',
                }}>
                  {decision === 'stop' ? scenario.stopResult.detail : scenario.continueResult.detail}
                </div>

                {scenarioIndex < SCENARIOS.length - 1 ? (
                  <button onClick={nextScenario} style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '0.7rem 1.5rem', background: 'rgba(240,240,250,0.05)',
                    color: 'rgba(240,240,250,0.6)', border: '1px solid rgba(240,240,250,0.1)',
                    borderRadius: '8px', cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                  }}>
                    NEXT SCENARIO <ChevronRight size={13} />
                  </button>
                ) : (
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem',
                    fontWeight: 600, letterSpacing: '0.1em',
                    color: 'rgba(240,240,250,0.25)', marginTop: '0.5rem',
                  }}>
                    ALL SCENARIOS COMPLETE · SAFETY IS A MINDSET
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
