import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin, Phone } from 'lucide-react';
import FloatingPetals from './FloatingPetals';
import OrnamentalMotif from './OrnamentalMotif';
import { BRAND } from '../data/products';

const Hero = () => {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-bg-alt grain"
      data-testid="hero-section"
    >
      <FloatingPetals variant="petal" />
      <OrnamentalMotif
        className="absolute -left-24 top-10 w-96 h-[520px] opacity-[0.18] pointer-events-none hidden lg:block"
        aria-hidden="true"
      />

      {/* Confetti color dots inspired by the shop card */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {[
          { c: '#23A6B0', t: '8%', l: '6%', s: 16 },
          { c: '#F472B6', t: '20%', l: '3%', s: 10 },
          { c: '#D4AF37', t: '60%', l: '2%', s: 14 },
          { c: '#7A1022', t: '80%', l: '8%', s: 8 },
          { c: '#0E7C66', t: '15%', l: '46%', s: 6 },
        ].map((d, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1, y: [0, -8, 0] }}
            transition={{ delay: 0.3 + i * 0.1, y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' } }}
            className="confetti-dot"
            style={{
              background: d.c,
              top: d.t,
              left: d.l,
              width: d.s,
              height: d.s,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-20 lg:pt-20 lg:pb-32 grid lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="lg:col-span-6 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles className="text-gold" size={16} />
            <span className="overline">{BRAND.tagline.replace('.', '')}</span>
          </motion.div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.02] text-secondary-c">
            Where every woman finds her
            <br />
            <span className="italic rainbow-text">spark</span>.
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 text-lg text-muted-c max-w-lg leading-relaxed font-light"
          >
            Jewellery, cosmetics, fragrances & little daily luxuries — hand-picked by{' '}
            <span className="italic text-primary-c">{BRAND.owner}</span> at our flagship store in
            Bartand, Dhanbad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button className="btn-primary" onClick={() => scrollTo('#categories')} data-testid="hero-shop-btn">
              Shop the Collection <ArrowRight size={16} />
            </button>
            <button
              className="btn-outline"
              onClick={() => window.open('https://maps.app.goo.gl/t124mPDL6dqubSSH9', '_blank', 'noopener,noreferrer')}
              data-testid="hero-story-btn"
            >
              Visit Our Store
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-c"
          >
            <div className="flex items-center gap-2" data-testid="hero-phone">
              <Phone size={14} className="text-teal" />
              <span>{BRAND.phones[0]}</span>
            </div>
            <div className="flex items-center gap-2" data-testid="hero-address">
              <MapPin size={14} className="text-primary-c" />
              <span>Bartand, Dhanbad</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Image column with card sticker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="lg:col-span-6 relative"
        >
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-champagne shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1760461804494-c39017a52e6b"
                alt="Cosmatica woman"
                className="w-full h-full object-cover hero-zoom"
                data-testid="hero-image-main"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-c/30 via-transparent to-transparent" />
            </div>

            {/* Small card chip removed — shop card now lives in dedicated VisitStore section */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="absolute -bottom-6 -right-4 lg:-right-10 bg-secondary-c text-ivory px-6 py-4 shadow-2xl flex items-center gap-4"
              style={{ background: 'var(--c-ink)' }}
              data-testid="hero-chip-owner"
            >
              <div
                className="w-12 h-12 rounded-full flex-shrink-0"
                style={{ background: 'conic-gradient(from 0deg, #7A1022, #D4AF37, #23A6B0, #F472B6, #7A1022)' }}
              />
              <div>
                <div className="overline" style={{ color: '#F7E7CE' }}>Curated by</div>
                <div className="font-serif text-lg">Laxmi Devi</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="relative border-t border-champagne bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { v: '12k+', l: 'Happy Women', c: 'text-primary-c' },
            { v: '500+', l: 'Curated Products', c: 'text-teal' },
            { v: '7', l: 'Categories', c: 'text-gold' },
            { v: '4.9★', l: 'Average Rating', c: 'text-rose-gold' },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-testid={`stat-${s.l.toLowerCase().replace(/\s/g, '-')}`}
            >
              <div className={`font-serif text-4xl ${s.c}`}>{s.v}</div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-c mt-1">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
