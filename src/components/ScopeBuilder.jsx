import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Cable, Shield, Wrench, Lightbulb, ArrowRight, CheckCircle2, Send } from 'lucide-react';

const SERVICES = [
  { id: 'distribution', label: 'Distribution', icon: <Zap size={20} />, desc: 'Overhead lines up to 34.5kV' },
  { id: 'underground', label: 'Underground', icon: <Cable size={20} />, desc: 'Conduit, trenching, URD' },
  { id: 'storm', label: 'Storm Response', icon: <Shield size={20} />, desc: 'Emergency restoration crews' },
  { id: 'fiber', label: 'Telecom / Fiber', icon: <Wrench size={20} />, desc: 'Aerial & underground fiber' },
  { id: 'streetlight', label: 'Streetlight', icon: <Lightbulb size={20} />, desc: 'Install & maintain lighting' },
];

const SCOPES = [
  { id: 'small', label: 'Small', desc: '< 5 miles / single site' },
  { id: 'medium', label: 'Medium', desc: '5–25 miles / multi-site' },
  { id: 'large', label: 'Large', desc: '25–100 miles / regional' },
  { id: 'enterprise', label: 'Enterprise', desc: '100+ miles / territory-wide' },
];

export default function ScopeBuilder({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedScope, setSelectedScope] = useState(null);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (id) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setStep(1);
      setSelectedServices([]);
      setSelectedScope(null);
      setFormData({ name: '', company: '', email: '', phone: '', notes: '' });
      setSubmitted(false);
    }, 3000);
  };

  const canAdvance = step === 1 ? selectedServices.length > 0 : step === 2 ? selectedScope !== null : formData.name && formData.email;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '580px', maxHeight: '85vh', overflow: 'auto',
              background: '#0a0c10', border: '1px solid rgba(0,168,255,0.15)',
              borderRadius: '20px', boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.5rem 2rem', borderBottom: '1px solid rgba(240,240,250,0.06)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.12em', color: '#00a8ff', marginBottom: '2px' }}>
                  SCOPE YOUR PROJECT
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '1.1rem', fontWeight: 600, color: '#f0f0fa' }}>
                  {step === 1 && 'Select Services'}
                  {step === 2 && 'Estimate Scope'}
                  {step === 3 && 'Your Details'}
                </div>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(240,240,250,0.4)', cursor: 'pointer', padding: '0.5rem' }}>
                <X size={20} />
              </button>
            </div>

            {/* Progress bar */}
            <div style={{ height: '2px', background: 'rgba(240,240,250,0.04)' }}>
              <motion.div animate={{ width: `${(step / 3) * 100}%` }} style={{ height: '100%', background: '#00a8ff' }} />
            </div>

            {/* Content */}
            <div style={{ padding: '2rem' }}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <CheckCircle2 size={48} color="#00e676" style={{ marginBottom: '1rem' }} />
                    <div style={{ fontFamily: 'Inter', fontSize: '1.2rem', fontWeight: 600, color: '#00e676', marginBottom: '0.5rem' }}>Scope Received</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(240,240,250,0.5)' }}>Our team will review and contact you within 24 hours.</div>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {SERVICES.map(srv => {
                        const selected = selectedServices.includes(srv.id);
                        return (
                          <motion.button key={srv.id} whileTap={{ scale: 0.98 }}
                            onClick={() => toggleService(srv.id)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '1rem',
                              padding: '1rem 1.25rem', borderRadius: '12px',
                              background: selected ? 'rgba(0,168,255,0.08)' : 'rgba(240,240,250,0.02)',
                              border: `1px solid ${selected ? 'rgba(0,168,255,0.3)' : 'rgba(240,240,250,0.06)'}`,
                              cursor: 'pointer', textAlign: 'left', width: '100%',
                              transition: 'all 0.2s',
                            }}>
                            <div style={{ color: selected ? '#00a8ff' : 'rgba(240,240,250,0.3)', transition: 'color 0.2s' }}>{srv.icon}</div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontFamily: 'Inter', fontSize: '0.9rem', fontWeight: 600, color: selected ? '#f0f0fa' : 'rgba(240,240,250,0.6)' }}>{srv.label}</div>
                              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem', color: 'rgba(240,240,250,0.3)', letterSpacing: '0.05em' }}>{srv.desc}</div>
                            </div>
                            <div style={{
                              width: '20px', height: '20px', borderRadius: '6px',
                              background: selected ? '#00a8ff' : 'transparent',
                              border: `1.5px solid ${selected ? '#00a8ff' : 'rgba(240,240,250,0.15)'}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 0.2s',
                            }}>
                              {selected && <span style={{ color: '#000', fontSize: '0.7rem', fontWeight: 700 }}>✓</span>}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      {SCOPES.map(scope => {
                        const selected = selectedScope === scope.id;
                        return (
                          <motion.button key={scope.id} whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedScope(scope.id)}
                            style={{
                              padding: '1.5rem 1rem', borderRadius: '12px', textAlign: 'center',
                              background: selected ? 'rgba(0,168,255,0.08)' : 'rgba(240,240,250,0.02)',
                              border: `1px solid ${selected ? 'rgba(0,168,255,0.3)' : 'rgba(240,240,250,0.06)'}`,
                              cursor: 'pointer', transition: 'all 0.2s',
                            }}>
                            <div style={{ fontFamily: 'Inter', fontSize: '1rem', fontWeight: 700, color: selected ? '#00a8ff' : 'rgba(240,240,250,0.6)', marginBottom: '4px' }}>{scope.label}</div>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem', color: 'rgba(240,240,250,0.3)', letterSpacing: '0.05em' }}>{scope.desc}</div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {['name', 'company', 'email', 'phone'].map(field => (
                        <input key={field}
                          type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1) + (field === 'company' || field === 'phone' ? ' (optional)' : ' *')}
                          value={formData[field]}
                          onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                          style={{
                            width: '100%', padding: '0.85rem 1rem', borderRadius: '10px',
                            background: 'rgba(240,240,250,0.03)', border: '1px solid rgba(240,240,250,0.08)',
                            color: '#f0f0fa', fontFamily: 'Inter', fontSize: '0.85rem',
                            outline: 'none', transition: 'border-color 0.2s',
                          }}
                          onFocus={(e) => e.target.style.borderColor = 'rgba(0,168,255,0.3)'}
                          onBlur={(e) => e.target.style.borderColor = 'rgba(240,240,250,0.08)'}
                        />
                      ))}
                      <textarea
                        placeholder="Project notes (optional)"
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        rows={3}
                        style={{
                          width: '100%', padding: '0.85rem 1rem', borderRadius: '10px',
                          background: 'rgba(240,240,250,0.03)', border: '1px solid rgba(240,240,250,0.08)',
                          color: '#f0f0fa', fontFamily: 'Inter', fontSize: '0.85rem',
                          outline: 'none', resize: 'vertical', transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(0,168,255,0.3)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(240,240,250,0.08)'}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {!submitted && (
              <div style={{
                padding: '1rem 2rem 1.5rem', borderTop: '1px solid rgba(240,240,250,0.06)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                {step > 1 ? (
                  <button onClick={() => setStep(s => s - 1)} style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', fontWeight: 600,
                    letterSpacing: '0.1em', background: 'none', border: '1px solid rgba(240,240,250,0.1)',
                    color: 'rgba(240,240,250,0.5)', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer',
                  }}>
                    ← BACK
                  </button>
                ) : <div />}

                <button
                  onClick={() => step < 3 ? setStep(s => s + 1) : handleSubmit()}
                  disabled={!canAdvance}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    background: canAdvance ? 'var(--amber)' : 'rgba(240,240,250,0.05)',
                    color: canAdvance ? '#000' : 'rgba(240,240,250,0.2)',
                    border: 'none', padding: '0.7rem 1.5rem', borderRadius: '8px',
                    cursor: canAdvance ? 'pointer' : 'not-allowed',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    transition: 'all 0.2s',
                  }}
                >
                  {step < 3 ? <>NEXT <ArrowRight size={13} /></> : <>SUBMIT <Send size={13} /></>}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
