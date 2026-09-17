import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';
import { submitContact } from '../lib/api';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      await submitContact(form);
      setSent(true);
      setForm({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      setError("Couldn't send your message right now — please call or WhatsApp us instead.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-24 bg-bg-alt" data-testid="contact-section">
      <div className="max-w-2xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="overline mb-3 text-center">Get in Touch</div>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-secondary-c text-center">
            Have a <span className="italic text-primary-c">question</span>?
          </h2>
          <p className="mt-4 text-muted-c text-center max-w-lg mx-auto">
            Ask about a product, a custom order, or anything else — we usually reply within a day.
          </p>

          <form onSubmit={submit} className="mt-10 space-y-5" data-testid="contact-form">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-c">Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="underline-input w-full mt-1"
                  data-testid="contact-name-input"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-c">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="underline-input w-full mt-1"
                  data-testid="contact-phone-input"
                />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-c">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="underline-input w-full mt-1"
                data-testid="contact-email-input"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-c">Message *</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="underline-input w-full mt-1 resize-none"
                data-testid="contact-message-input"
              />
            </div>
            {error && (
              <p className="text-sm text-primary-c" data-testid="contact-error">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center disabled:opacity-60"
              data-testid="contact-submit-btn"
            >
              {sent ? (
                <>
                  <Check size={16} /> Message sent
                </>
              ) : submitting ? (
                'Sending…'
              ) : (
                <>
                  Send message <Send size={16} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
