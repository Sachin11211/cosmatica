import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { fetchProducts, submitContact } from '../lib/api';
import { useCart } from '../context/CartContext';
import OrnamentalMotif from './OrnamentalMotif';

const OCCASIONS = [
  { id: 'wedding', label: 'Wedding & Bridal', categories: ['jewelry', 'hair'] },
  { id: 'festival', label: 'Festival & Celebration', categories: ['cosmetics', 'eye-nail', 'fragrances'] },
  { id: 'everyday', label: 'Everyday Glow', categories: ['beauty', 'body'] },
];

const CATEGORY_NAMES = {
  jewelry: 'Jewelry & Bangles',
  hair: 'Hair Accessories',
  cosmetics: 'Cosmetics & Glamour',
  'eye-nail': 'Eye & Nail Essentials',
  fragrances: 'Fragrances & Gifting',
  beauty: 'Beauty & Skincare',
  body: 'Skincare & Body Care',
};

const BUDGETS = [
  { id: 'low', label: 'Under ₹500', max: 500 },
  { id: 'mid', label: '₹500 – ₹1,500', max: 1500 },
  { id: 'high', label: '₹1,500+', max: Infinity },
];

const FestivalQuiz = () => {
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState(null);
  const [focusCat, setFocusCat] = useState(null);
  const [budget, setBudget] = useState(null);
  const [products, setProducts] = useState([]);
  const [phone, setPhone] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const results = useMemo(() => {
    if (!focusCat || !budget) return [];
    const b = BUDGETS.find((x) => x.id === budget);
    let list = products.filter((p) => p.category === focusCat && p.price <= b.max);
    if (list.length < 3) list = products.filter((p) => p.category === focusCat);
    return list.sort((a, b2) => a.price - b2.price).slice(0, 4);
  }, [products, focusCat, budget]);

  const reset = () => {
    setStep(0);
    setOccasion(null);
    setFocusCat(null);
    setBudget(null);
    setPhone('');
    setSaved(false);
  };

  const addAll = () => results.forEach((p) => addItem(p));

  const saveLead = async () => {
    if (!phone.trim()) return;
    setSaving(true);
    try {
      await submitContact({
        name: 'Festival quiz lead',
        phone,
        message: `Quiz picks — occasion: ${occasion}, focus: ${CATEGORY_NAMES[focusCat]}, budget: ${
          BUDGETS.find((b) => b.id === budget)?.label
        }. Recommended: ${results.map((r) => r.name).join(', ')}`,
      });
      setSaved(true);
    } catch (err) {
      // stays silent; user can still just add to cart
    } finally {
      setSaving(false);
    }
  };

  return (
    <section
      className="relative py-20 lg:py-24 bg-secondary-c text-ivory overflow-hidden"
      data-testid="festival-quiz-section"
    >
      <OrnamentalMotif className="absolute -right-16 -top-10 w-72 h-96 opacity-40 pointer-events-none hidden lg:block" />
      <OrnamentalMotif
        flip
        className="absolute -left-20 bottom-0 w-64 h-80 opacity-25 pointer-events-none hidden lg:block"
      />

      <div className="relative max-w-2xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <div className="overline mb-3 flex items-center justify-center gap-2" style={{ color: '#E8C158' }}>
            <Sparkles size={14} /> Festival Ready Quiz
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl">
            Find your <span className="italic" style={{ color: '#E8C158' }}>perfect picks</span>
          </h2>
        </div>

        {step < 3 && (
          <div className="flex gap-2 mb-10 justify-center" data-testid="quiz-progress">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1 w-16 rounded-full transition-colors ${i <= step ? 'bg-gold' : 'bg-ivory/20'}`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              data-testid="quiz-step-occasion"
            >
              <p className="text-center text-ivory/70 mb-6">What are you shopping for?</p>
              <div className="grid gap-3">
                {OCCASIONS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setOccasion(o.id);
                      setFocusCat(null);
                      setStep(1);
                    }}
                    className="border border-ivory/20 hover:border-gold hover:bg-ivory/5 transition-colors px-6 py-4 text-left font-serif text-xl"
                    data-testid={`quiz-occasion-${o.id}`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && occasion && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              data-testid="quiz-step-focus"
            >
              <p className="text-center text-ivory/70 mb-6">Where should we focus?</p>
              <div className="grid gap-3">
                {OCCASIONS.find((o) => o.id === occasion).categories.map((cid) => (
                  <button
                    key={cid}
                    onClick={() => {
                      setFocusCat(cid);
                      setStep(2);
                    }}
                    className="border border-ivory/20 hover:border-gold hover:bg-ivory/5 transition-colors px-6 py-4 text-left font-serif text-xl"
                    data-testid={`quiz-focus-${cid}`}
                  >
                    {CATEGORY_NAMES[cid]}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(0)}
                className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-ivory/50 hover:text-gold mx-auto"
                data-testid="quiz-back-to-occasion"
              >
                <ArrowLeft size={14} /> Back
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              data-testid="quiz-step-budget"
            >
              <p className="text-center text-ivory/70 mb-6">What's your budget?</p>
              <div className="grid gap-3">
                {BUDGETS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setBudget(b.id);
                      setStep(3);
                    }}
                    className="border border-ivory/20 hover:border-gold hover:bg-ivory/5 transition-colors px-6 py-4 text-left font-serif text-xl"
                    data-testid={`quiz-budget-${b.id}`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-ivory/50 hover:text-gold mx-auto"
                data-testid="quiz-back-to-focus"
              >
                <ArrowLeft size={14} /> Back
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              data-testid="quiz-results"
            >
              <p className="text-center text-ivory/70 mb-6">
                Here's your personal pick{results.length !== 1 ? 's' : ''}:
              </p>

              {results.length === 0 ? (
                <p className="text-center text-ivory/60">We're adding more here soon — check back!</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {results.map((p) => (
                    <div
                      key={p.id}
                      className="flex gap-3 bg-ivory/5 border border-ivory/10 p-3"
                      data-testid={`quiz-result-${p.id}`}
                    >
                      <img src={p.image} alt={p.name} className="w-16 h-16 object-cover flex-shrink-0" />
                      <div>
                        <div className="font-serif text-base leading-tight">{p.name}</div>
                        <div className="text-gold text-sm mt-1">₹{p.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {results.length > 0 && (
                <button
                  onClick={addAll}
                  className="btn-primary w-full justify-center mb-4"
                  data-testid="quiz-add-all-btn"
                >
                  Add all to bag <ArrowRight size={16} />
                </button>
              )}

              {!saved ? (
                <div className="border-t border-ivory/10 pt-6 mt-2">
                  <p className="text-sm text-ivory/60 mb-3 text-center">
                    Want us to call you about these instead?
                  </p>
                  <div className="flex gap-3">
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Your phone number"
                      className="underline-input flex-1"
                      data-testid="quiz-phone-input"
                    />
                    <button
                      onClick={saveLead}
                      disabled={saving}
                      className="btn-outline whitespace-nowrap disabled:opacity-60"
                      data-testid="quiz-save-btn"
                    >
                      {saving ? 'Sending…' : 'Send me these'}
                    </button>
                  </div>
                </div>
              ) : (
                <p
                  className="text-center text-gold flex items-center justify-center gap-2 mt-4"
                  data-testid="quiz-saved-msg"
                >
                  <Check size={16} /> Got it — we'll reach out soon.
                </p>
              )}

              <button
                onClick={reset}
                className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest text-ivory/50 hover:text-gold mx-auto"
                data-testid="quiz-retake-btn"
              >
                Retake quiz
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FestivalQuiz;
