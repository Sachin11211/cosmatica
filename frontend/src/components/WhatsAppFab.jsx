import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone } from 'lucide-react';

const PHONES = [
  { label: 'Laxmi Devi', number: '919386345904', display: '+91 93863 45904' },
  { label: 'Cosmatica Store', number: '919835350778', display: '+91 98353 50778' },
];

const WhatsAppFab = () => {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 8000);
    return () => clearTimeout(t);
  }, []);

  const startChat = (n) => {
    const msg = encodeURIComponent("Hi Cosmatica! I'd like to know more about your products ✨");
    window.open(`https://wa.me/${n}?text=${msg}`, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-surface border border-champagne shadow-2xl w-72 overflow-hidden"
              data-testid="whatsapp-menu"
            >
              <div className="bg-[#25D366] text-white px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="font-serif text-base leading-tight">Chat with Cosmatica</div>
                  <div className="text-[11px] opacity-90">Typically replies in minutes</div>
                </div>
              </div>
              <div className="p-2">
                {PHONES.map((p) => (
                  <button
                    key={p.number}
                    onClick={() => startChat(p.number)}
                    className="w-full text-left px-3 py-3 hover:bg-bg-alt transition-colors flex items-center gap-3 border-b border-champagne last:border-0"
                    data-testid={`whatsapp-${p.number}`}
                  >
                    <Phone size={14} className="text-[#25D366]" />
                    <div className="flex-1">
                      <div className="text-sm text-ivory">{p.label}</div>
                      <div className="text-xs text-muted-c">{p.display}</div>
                    </div>
                    <MessageCircle size={16} className="text-gold" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            boxShadow: '0 10px 30px -8px rgba(37,211,102,0.6)',
          }}
          aria-label="Chat on WhatsApp"
          data-testid="whatsapp-fab"
        >
          {pulse && !open && (
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: 'rgba(37,211,102,0.45)' }}
            />
          )}
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                className="text-white"
              >
                <X size={26} />
              </motion.span>
            ) : (
              <motion.span
                key="msg"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                className="text-white"
              >
                <MessageCircle size={26} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
};

export default WhatsAppFab;
