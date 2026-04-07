import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, ShieldAlert, Zap } from 'lucide-react';

export default function Copilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'SolPowerlines Assistant online. How can we help you with your distribution, underground, or storm restoration needs?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text }]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      let r = "I will connect you with our operations team. SolPowerlines has over 200 skilled employees ready for deployment.";
      const l = text.toLowerCase();
      if (l.includes('safety')) r = "Safety is at the forefront of everything we do. Our Safety Manager, Kevin Sasser, is CUSP certified and leads our commitment to safety leadership.";
      else if (l.includes('kv') || l.includes('distribution')) r = "We offer construction and maintenance services for electrical distribution systems up to 34.5kv — new construction, system improvements, and complete rebuilds.";
      else if (l.includes('storm')) r = "SolPowerlines keeps our fleet operational — bucket trucks, digger trucks, material handlers. Our storm teams respond promptly and safely.";
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: r }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)}
        style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999, width: '46px', height: '46px', background: '#F5A623', color: '#000', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', boxShadow: '0 4px 20px rgba(245,166,35,0.3)' }}>
        {isOpen ? <X size={18} /> : <Bot size={18} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            style={{ position: 'fixed', bottom: '5rem', right: '1.5rem', zIndex: 9998, width: 'calc(100vw - 3rem)', maxWidth: '380px', height: '530px', maxHeight: '70vh', background: '#0a0a0a', border: '1px solid rgba(240,240,250,0.08)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            <div style={{ background: '#000', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(240,240,250,0.06)' }}>
              <Bot size={18} color="#F5A623" />
              <div>
                <h3 style={{ fontFamily: 'Inter', color: '#f0f0fa', fontSize: '0.9rem', fontWeight: 600 }}>Sol Assistant</h3>
                <p style={{ fontFamily: 'Barlow Condensed', color: '#F5A623', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Online</p>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }} className="hide-scrollbar">
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', padding: '0.8rem 1rem',
                    background: msg.sender === 'user' ? '#F5A623' : '#141414',
                    color: msg.sender === 'user' ? '#000' : '#f0f0fa',
                    fontSize: '0.88rem', lineHeight: 1.5 }}>
                  {msg.text}
                </motion.div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: '#141414', padding: '0.8rem 1rem' }}>
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} style={{ color: 'var(--amber)', fontSize: '0.85rem', fontWeight: 500 }}>Typing...</motion.span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div style={{ padding: '0 1rem 0.5rem', display: 'flex', gap: '0.5rem', overflowX: 'auto' }} className="hide-scrollbar">
                <button onClick={() => handleSend("What is your safety culture?")} style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#141414', border: '1px solid rgba(240,240,250,0.08)', color: '#f0f0fa', padding: '0.5rem 0.8rem', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 500 }}><ShieldAlert size={12} color="#F5A623" /> Safety</button>
                <button onClick={() => handleSend("Do you handle 34.5kv distribution?")} style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#141414', border: '1px solid rgba(240,240,250,0.08)', color: '#f0f0fa', padding: '0.5rem 0.8rem', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 500 }}><Zap size={12} color="#F5A623" /> Distribution</button>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} style={{ padding: '0.75rem', borderTop: '1px solid rgba(240,240,250,0.06)' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask a question..."
                  style={{ flex: 1, background: '#141414', border: '1px solid rgba(240,240,250,0.08)', outline: 'none', color: '#f0f0fa', padding: '0.6rem 0.8rem', fontSize: '0.88rem' }} />
                <button type="submit" disabled={!inputValue.trim()} style={{ background: '#F5A623', border: 'none', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: inputValue.trim() ? 'pointer' : 'not-allowed', opacity: inputValue.trim() ? 1 : 0.3 }}>
                  <Send size={15} color="#000" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@media(max-width: 900px) { button[style*="z-index: 9999"] { bottom: 80px !important; } div[style*="z-index: 9998"] { bottom: 150px !important; } }`}</style>
    </>
  );
}
