import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { submitNewsletter } from '../lib/api';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitting(true);
    setError('');
    try {
      await submitNewsletter(email);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setEmail('');
      }, 3500);
    } catch (err) {
      setError("Couldn't subscribe right now — please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 lg:py-24 bg-ivory" data-testid="newsletter-section">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="overline mb-3">Join the Sisterhood</div>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-secondary-c">
            Letters of <span className="italic text-primary-c">love</span>,
            <br className="hidden sm:block" /> straight to your inbox.
          </h2>
          <p className="mt-6 text-muted-c max-w-xl mx-auto">
            Early access to festive edits, behind-the-scenes from our artisans, and a little
            10% welcome gift on your first order.
          </p>

          <form
            onSubmit={submit}
            className="mt-10 max-w-md mx-auto flex items-stretch border border-champagne bg-ivory"
            data-testid="newsletter-form"
          >
            <div className="flex items-center pl-4 text-muted-c">
              <Mail size={18} />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@beautiful.com"
              className="underline-input flex-1 !border-b-0 px-3"
              data-testid="newsletter-email-input"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary-c text-ivory px-6 text-xs uppercase tracking-widest hover:bg-primary-deep transition-colors flex items-center gap-2 disabled:opacity-60"
              data-testid="newsletter-submit"
            >
              {sent ? (
                <>
                  <Check size={14} /> Sent
                </>
              ) : submitting ? (
                'Sending…'
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
          {error && (
            <p className="mt-4 text-sm text-primary-c" data-testid="newsletter-error">
              {error}
            </p>
          )}
          {sent && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-primary-c"
              data-testid="newsletter-success"
            >
              ✦ Welcome to Cosmatica. Check your inbox for your gift.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
