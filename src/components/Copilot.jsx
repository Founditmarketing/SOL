import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, ShieldAlert, Zap, Clock } from 'lucide-react';

export default function Copilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'SolPowerlines Assistant online. How can we help you with your distribution, underground, or storm restoration needs?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI Logic
    setTimeout(() => {
      let responseText = "I will connect you with our operations team. SolPowerlines has over 200 skilled employees ready for deployment.";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes('safety') || lowerText.includes('record')) {
        responseText = "Safety is at the forefront of everything we do. Our Safety Manager, Kevin Sasser, is CUSP certified and leads our commitment to safety leadership and workforce development.";
      } else if (lowerText.includes('kv') || lowerText.includes('distribution')) {
        responseText = "Yes. We offer construction and maintenance services for electrical distribution systems up to 34.5kv — new construction, system improvements, and complete rebuilds.";
      } else if (lowerText.includes('storm') || lowerText.includes('response')) {
        responseText = "SolPowerlines takes pride in keeping our fleet fully operational. We can respond at a moment's notice with bucket trucks, digger trucks, material handlers, and more. Our storm teams understand the importance of responding promptly and safely.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: responseText }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999,
          width: '60px', height: '60px', borderRadius: '50%',
          background: 'var(--red)', color: 'white',
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'none',
        }}
      >
        {isOpen ? <X size={28} /> : <Bot size={28} />}
        {!isOpen && (
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}
            style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: '2px solid var(--red)', pointerEvents: 'none' }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: "spring", bounce: 0.3 }}
            style={{
              position: 'fixed', bottom: '6rem', right: '1.5rem', zIndex: 9998,
              width: 'calc(100vw - 3rem)', maxWidth: '400px', height: '600px', maxHeight: '75vh',
              background: 'var(--glass)', backdropFilter: 'blur(16px)',
              border: '1px solid var(--glass-border)', borderRadius: '24px',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.6)'
            }}
          >
            {/* Header */}
            <div style={{ background: 'var(--dark2)', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(218,41,28,0.1)', border: '1px solid var(--red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} color="var(--red)" />
              </div>
              <div>
                <h3 style={{ fontFamily: 'Inter', color: 'var(--white)', fontSize: '1.2rem', fontWeight: 600, lineHeight: 1 }}>SOL ASSISTANT</h3>
                <p style={{ color: 'var(--red)', fontSize: '0.8rem', fontFamily: 'Barlow Condensed', letterSpacing: '0.1em', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '6px', height: '6px', background: 'var(--red)', borderRadius: '50%', display: 'inline-block' }} /> ONLINE
                </p>
              </div>
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} className="hide-scrollbar">
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%', padding: '1rem 1.2rem', borderRadius: '16px',
                    background: msg.sender === 'user' ? 'var(--red)' : 'var(--dark3)',
                    color: msg.sender === 'user' ? 'white' : 'var(--text-light)',
                    border: msg.sender === 'bot' ? '1px solid var(--glass-border)' : 'none',
                    borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                    borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
                    fontSize: '0.95rem', lineHeight: 1.5
                  }}
                >
                  {msg.text}
                </motion.div>
              ))}
              
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: 'var(--dark3)', padding: '1rem', borderRadius: '16px', borderBottomLeftRadius: '4px', border: '1px solid var(--glass-border)' }}>
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} style={{ color: 'var(--red)', fontSize: '0.85rem', fontWeight: 600 }}>Processing...</motion.div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div style={{ padding: '0 1.5rem 1rem', display: 'flex', gap: '0.5rem', overflowX: 'auto' }} className="hide-scrollbar">
                <button onClick={() => handleSend("What is your safety culture?")} style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--dark2)', border: '1px solid var(--glass-border)', color: 'var(--text)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer' }}><ShieldAlert size={14} color="var(--red)" /> Safety Culture</button>
                <button onClick={() => handleSend("Do you handle 34.5kv distribution work?")} style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--dark2)', border: '1px solid var(--glass-border)', color: 'var(--text)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer' }}><Zap size={14} color="var(--red)" /> Distribution Specs</button>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} style={{ padding: '1rem', background: 'var(--dark)', borderTop: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--dark2)', border: '1px solid var(--steel)', borderRadius: '12px', padding: '0.4rem' }}>
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a technical question..."
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'white', padding: '0.5rem 0.8rem', fontSize: '0.95rem' }}
                />
                <button type="submit" disabled={!inputValue.trim() || isTyping} style={{ background: 'var(--red)', border: 'none', width: '44px', height: '44px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: inputValue.trim() ? 'pointer' : 'not-allowed', opacity: inputValue.trim() ? 1 : 0.5 }}>
                  <Send size={18} color="white" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width: 900px) {
          /* Push above the mobile action bar */
          button[style*="z-index: 9999"] {
            bottom: 80px !important;
          }
          div[style*="z-index: 9998"] {
            bottom: 150px !important;
            height: 500px !important;
          }
        }
      `}</style>
    </>
  );
}
