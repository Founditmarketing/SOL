import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Phone, MapPin, Mail } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div style={{ paddingTop: '8rem' }}>
      <section className="page-section" style={{ background: '#000', padding: '4rem 2rem 0' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label">Get in Touch</div>
            <h1 className="section-title" style={{ maxWidth: '500px' }}>Ready to Talk<br/>About Your Project?</h1>
          </motion.div>
        </div>
      </section>

      <section className="section page-section" style={{ background: '#000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.2fr)', gap: '4rem' }} className="contact-grid">
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="page-card-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(240,240,250,0.06)' }}>
                {[
                  { icon: <Phone size={18} color="#F5A623" />, label: 'Phone', value: '318.776.0557', href: 'tel:318-776-0557' },
                  { icon: <Mail size={18} color="#F5A623" />, label: 'Email', value: 'info@solpowerlines.com', href: 'mailto:info@solpowerlines.com' },
                  { icon: <MapPin size={18} color="#F5A623" />, label: 'Address', value: '1613 J.B. Hunt Drive #1708\nAlexandria, LA 71303' }
                ].map((item, idx) => (
                  <div key={idx} className="page-card" style={{ background: '#000', padding: '2rem', display: 'flex', gap: '1rem' }}>
                    <div style={{ flexShrink: 0, marginTop: '0.1rem' }}>{item.icon}</div>
                    <div>
                      <div className="card-body" style={{ fontFamily: 'Barlow Condensed', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,240,250,0.3)', marginBottom: '0.3rem' }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="card-title" style={{ fontSize: '1rem', color: '#f0f0fa', fontWeight: 500 }}>{item.value}</a>
                      ) : (
                        <span className="card-title" style={{ fontSize: '0.95rem', color: '#f0f0fa', whiteSpace: 'pre-line' }}>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="contact-form-box" style={{ border: '1px solid rgba(240,240,250,0.08)', padding: '2.5rem' }}>
                <AnimatePresence mode='wait'>
                  {!submitted ? (
                    <motion.form key="form" exit={{ opacity: 0 }} onSubmit={handleSubmit}>
                      <div className="form-group"><label>Full Name</label><input type="text" placeholder="Your full name" required /></div>
                      <div className="form-group"><label>Email</label><input type="email" placeholder="your@email.com" required /></div>
                      <div className="form-group"><label>Phone</label><input type="tel" placeholder="(000) 000-0000" /></div>
                      <div className="form-group"><label>How can we help?</label><textarea placeholder="Describe your project needs, service request, or question..." required></textarea></div>
                      <button type="submit" className="btn btn-red" style={{ width: '100%' }}>
                        <Send size={16} style={{ marginRight: '8px' }} /> Send Message
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                      <CheckCircle2 size={48} color="#F5A623" style={{ marginBottom: '1.5rem' }} />
                      <h3 className="card-title" style={{ fontFamily: 'Inter', fontSize: '1.3rem', color: '#f0f0fa', fontWeight: 600, marginBottom: '0.5rem' }}>Message Sent</h3>
                      <p className="card-body" style={{ color: 'rgba(240,240,250,0.6)', lineHeight: 1.5 }}>Thank you for reaching out. Our team will get back to you shortly.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`@media(max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }`}</style>
    </div>
  );
}
