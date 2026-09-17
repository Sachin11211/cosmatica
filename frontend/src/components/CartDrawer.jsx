import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../lib/api';

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal, clear } = useCart();
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [form, setForm] = useState({ customerName: '', phone: '', email: '', address: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const closeAndReset = () => {
    setIsOpen(false);
    setTimeout(() => setStep('cart'), 300);
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!form.customerName.trim() || !form.phone.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      await submitOrder({ ...form, items, subtotal });
      setStep('success');
      clear();
    } catch (err) {
      setError("Couldn't place your order right now — please call us instead, or try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-secondary-c/50 backdrop-blur-sm z-50"
            data-testid="cart-overlay"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-ivory z-50 flex flex-col shadow-2xl"
            data-testid="cart-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-champagne">
              <div>
                <div className="overline">Your Bag</div>
                <h3 className="font-serif text-2xl text-secondary-c">
                  {items.length} {items.length === 1 ? 'treasure' : 'treasures'}
                </h3>
              </div>
              <button
                onClick={closeAndReset}
                className="w-10 h-10 border border-champagne hover:border-primary-c hover:text-primary-c flex items-center justify-center transition-colors"
                aria-label="close cart"
                data-testid="cart-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            {step === 'cart' && (
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <ShoppingBag size={48} className="text-rose-gold mb-4" strokeWidth={1} />
                  <h4 className="font-serif text-2xl text-secondary-c">Your bag awaits</h4>
                  <p className="text-sm text-muted-c mt-2 max-w-xs">
                    Add your favourite mehndi cones, bindis & lipsticks — we will wrap them
                    like a love letter.
                  </p>
                  <button
                    onClick={closeAndReset}
                    className="btn-outline mt-8"
                    data-testid="cart-continue-shopping-btn"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-5">
                  <AnimatePresence>
                    {items.map((p) => (
                      <motion.li
                        key={p.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30, height: 0 }}
                        className="flex gap-4 py-4 border-b border-champagne"
                        data-testid={`cart-item-${p.id}`}
                      >
                        <div className="w-20 h-20 bg-bg-alt overflow-hidden flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-3">
                            <h4 className="font-serif text-base text-secondary-c leading-snug">
                              {p.name}
                            </h4>
                            <button
                              onClick={() => removeItem(p.id)}
                              className="text-muted-c hover:text-primary-c transition-colors"
                              aria-label="remove"
                              data-testid={`cart-remove-${p.id}`}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center border border-champagne">
                              <button
                                onClick={() => updateQty(p.id, -1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-bg-alt"
                                aria-label="decrease"
                                data-testid={`cart-decrease-${p.id}`}
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-sm" data-testid={`cart-qty-${p.id}`}>
                                {p.qty}
                              </span>
                              <button
                                onClick={() => updateQty(p.id, 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-bg-alt"
                                aria-label="increase"
                                data-testid={`cart-increase-${p.id}`}
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <div className="font-serif text-primary-c">
                              ₹{p.price * p.qty}
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
            )}

            {/* Checkout form */}
            {step === 'checkout' && (
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <button
                  onClick={() => setStep('cart')}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-c hover:text-primary-c transition-colors mb-6"
                  data-testid="checkout-back-btn"
                >
                  <ArrowLeft size={14} /> Back to bag
                </button>
                <h4 className="font-serif text-2xl text-secondary-c mb-1">Almost there</h4>
                <p className="text-sm text-muted-c mb-6">
                  Leave your details and we'll call to confirm your order.
                </p>
                <form onSubmit={handleCheckoutSubmit} className="space-y-4" data-testid="checkout-form">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-c">Your name *</label>
                    <input
                      required
                      value={form.customerName}
                      onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                      className="underline-input w-full mt-1"
                      data-testid="checkout-name-input"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-c">Phone number *</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="underline-input w-full mt-1"
                      data-testid="checkout-phone-input"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-c">
                      Email (optional, for order confirmation)
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="underline-input w-full mt-1"
                      data-testid="checkout-email-input"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-c">
                      Delivery address (optional)
                    </label>
                    <input
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="underline-input w-full mt-1"
                      data-testid="checkout-address-input"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-c">
                      Notes (optional)
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      rows={2}
                      className="underline-input w-full mt-1 resize-none"
                      data-testid="checkout-notes-input"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-primary-c" data-testid="checkout-error">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full justify-center mt-2 disabled:opacity-60"
                    data-testid="checkout-submit-btn"
                  >
                    {submitting ? 'Placing order…' : `Place order · ₹${subtotal}`}
                  </button>
                </form>
              </div>
            )}

            {/* Success */}
            {step === 'success' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <div className="w-16 h-16 rounded-full bg-primary-c/15 text-primary-c flex items-center justify-center mb-5">
                  <Check size={28} />
                </div>
                <h4 className="font-serif text-2xl text-secondary-c">Order received!</h4>
                <p className="text-sm text-muted-c mt-2 max-w-xs">
                  Thank you, {form.customerName || 'friend'}. Laxmi ji's team will call {form.phone} shortly to confirm.
                </p>
                <button onClick={closeAndReset} className="btn-outline mt-8" data-testid="order-done-btn">
                  Done
                </button>
              </div>
            )}

            {/* Footer */}
            {step === 'cart' && items.length > 0 && (
              <div className="border-t border-champagne px-6 py-5 bg-bg-alt">
                <div className="flex justify-between items-center text-sm text-muted-c">
                  <span>Subtotal</span>
                  <span className="font-serif text-2xl text-primary-c" data-testid="cart-subtotal">
                    ₹{subtotal}
                  </span>
                </div>
                <div className="text-xs text-muted-c mt-1">
                  Shipping & taxes calculated at checkout
                </div>
                <button
                  className="btn-primary w-full justify-center mt-4"
                  data-testid="cart-checkout-btn"
                  onClick={() => setStep('checkout')}
                >
                  Checkout <ArrowRight size={16} />
                </button>
                <button
                  onClick={clear}
                  className="w-full mt-3 text-xs uppercase tracking-widest text-muted-c hover:text-primary-c transition-colors"
                  data-testid="cart-clear-btn"
                >
                  Clear bag
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
