import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Search, Zap, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Contact() {
  const [inputText, setInputText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [brief, setBrief] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setAnalyzing(true);
    // Simulate AI processing time
    setTimeout(() => {
      const lower = inputText.toLowerCase();
      
      const simulatedBrief = {
        urgency: lower.includes('hurricane') || lower.includes('storm') || lower.includes('down') ? 'High / Emergency Response' : 'Standard Development',
        category: lower.includes('transmission') || lower.includes('kv') ? 'High-Voltage Transmission' : lower.includes('distribution') ? 'Distribution' : 'Grid Infrastructure Build',
        action: 'Route to Elite Estimating Desk',
        crews: lower.includes('storm') ? 'Deploying Logistics (50+ personnel)' : 'Awaiting Final Scope'
      };
      
      setBrief(simulatedBrief);
      setAnalyzing(false);
    }, 2500);
  };

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <section className="section" style={{ padding: '2rem 2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.2fr)', gap: '4rem' }}>
            
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <div className="section-label">AI Digital Dispatch</div>
              <h2 className="section-title">PROJECT <span style={{ color: 'var(--red)', textShadow: '0 0 20px rgba(230,30,37,0.4)' }}>INTAKE ENGINE.</span></h2>
              <p style={{ fontSize: '1.15rem', color: 'var(--text)', lineHeight: 1.6, marginBottom: '3rem' }}>
                Skip the rigid corporate forms. Describe your grid emergency, transmission scope, or operational requirement in plain language. Our AI engine instantly reads, categorizes, and dispatches the brief securely to our estimating desk.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', background: 'var(--dark2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(0,168,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Search color="var(--blue)" size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'Barlow Condensed', letterSpacing: '0.1em', fontSize: '1.1rem', color: 'var(--white)', fontWeight: 600, textTransform: 'uppercase' }}>1. Natural Input</h4>
                    <p style={{ color: 'var(--text)', fontSize: '0.95rem', marginTop: '0.4rem', lineHeight: 1.5 }}>Simply describe the scenario. E.g., "Hurricane knocked out 5 miles of 345kV lines in Baton Rouge."</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', background: 'var(--dark2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(230,30,37,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Network color="var(--red)" size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'Barlow Condensed', letterSpacing: '0.1em', fontSize: '1.1rem', color: 'var(--white)', fontWeight: 600, textTransform: 'uppercase' }}>2. Semantic Triage</h4>
                    <p style={{ color: 'var(--text)', fontSize: '0.95rem', marginTop: '0.4rem', lineHeight: 1.5 }}>Our engine isolates the urgency vector, geographic parameters, and raw scope instantly.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <div style={{ background: 'var(--dark)', border: '1px solid var(--glass-border)', padding: '2.5rem', borderRadius: '16px', position: 'relative', overflow: 'hidden', minHeight: '500px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--blue), var(--red))' }}></div>
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem', color: 'var(--white)', marginBottom: '0.5rem' }}>Scope Description</h3>
                <p style={{ color: 'var(--text)', fontSize: '0.9rem', marginBottom: '2rem' }}>Provide the raw details. The system will formalize them.</p>
                
                <AnimatePresence mode='wait'>
                  {!brief && !analyzing && (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                      onSubmit={handleAnalyze}
                    >
                      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <textarea 
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          placeholder="e.g. We require a turnkey 8-mile reconductor on a 138kV line. Access is extremely limited due to dense swamplands. Need timeline estimates." 
                          style={{ minHeight: '200px', fontSize: '1.1rem', lineHeight: 1.6 }}
                        ></textarea>
                      </div>
                      
                      <button type="submit" disabled={!inputText.trim()} className="btn btn-blue" style={{ width: '100%', minHeight: '54px', fontSize: '1.1rem' }}>
                        <Zap size={20} style={{ marginRight: '10px' }} /> Analyze & Dispatch Scope
                      </button>
                    </motion.form>
                  )}

                  {analyzing && (
                    <motion.div 
                      key="analyzing"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', gap: '1.5rem' }}
                    >
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ width: '60px', height: '60px', borderRadius: '50%', border: '4px solid rgba(0,168,255,0.1)', borderTopColor: 'var(--blue)' }} />
                      <div style={{ fontFamily: 'Barlow Condensed', fontSize: '1.2rem', color: 'var(--blue)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Extracting Operational Data...</div>
                    </motion.div>
                  )}

                  {brief && (
                    <motion.div 
                      key="brief"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      style={{ background: 'var(--dark2)', border: '1px solid var(--blue)', borderRadius: '12px', overflow: 'hidden' }}
                    >
                      <div style={{ background: 'rgba(0,168,255,0.1)', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(0,168,255,0.2)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <CheckCircle2 color="var(--blue)" size={24} />
                        <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', color: 'var(--white)', letterSpacing: '0.05em' }}>Generated Project Brief</span>
                      </div>
                      
                      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>Detected Classification</div>
                          <div style={{ fontSize: '1.1rem', color: 'var(--white)', fontWeight: 500 }}>{brief.category}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>Implied Urgency</div>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: brief.urgency.includes('High') ? 'rgba(230,30,37,0.1)' : 'rgba(0,168,255,0.1)', color: brief.urgency.includes('High') ? 'var(--red)' : 'var(--blue)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontWeight: 600, fontSize: '0.9rem' }}>
                            {brief.urgency.includes('High') && <ShieldAlert size={16} />} {brief.urgency}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>Operational Logistics</div>
                          <div style={{ fontSize: '1.1rem', color: 'var(--white)', fontWeight: 500 }}>{brief.crews}</div>
                        </div>
                        
                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                          <button onClick={() => { setBrief(null); setInputText(''); }} className="btn btn-outline" style={{ width: '100%' }}>Submit to Estimating Desk</button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <style>{`
        @media(max-width: 900px) {
          .container > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </div>
  );
}
