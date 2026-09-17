import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../data/products';

const MAP_URL = 'https://maps.app.goo.gl/t124mPDL6dqubSSH9';

const VisitStore = () => {
  const open = () => window.open(MAP_URL, '_blank', 'noopener,noreferrer');

  return (
    <section
      id="visit-store"
      className="relative py-20 lg:py-28 overflow-hidden aurora"
      data-testid="visit-store-section"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Big shop card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, type: 'spring', stiffness: 80 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          className="lg:col-span-6 relative"
        >
          <div
            className="relative shadow-2xl border-[6px] border-ivory overflow-hidden"
            style={{ boxShadow: '0 30px 80px -20px rgba(225,58,99,0.45), 0 0 0 1px rgba(232,193,88,0.4)' }}
            data-testid="visit-store-card"
          >
            <img
              src={BRAND.cardImage}
              alt="Cosmatica shop card — Laxmi Devi"
              className="w-full h-auto block"
            />
          </div>
          {/* Pin marker */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-6 -right-4 bg-primary-c text-ivory w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
            style={{ boxShadow: '0 0 0 6px rgba(225,58,99,0.25)' }}
          >
            <MapPin size={26} />
          </motion.div>
        </motion.div>

        {/* Text + CTA */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6"
        >
          <div className="overline mb-3">Visit Our Flagship</div>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-secondary-c leading-tight">
            Come say <span className="italic rainbow-text">namaste</span>
            <br />in person.
          </h2>
          <p className="mt-6 text-muted-c max-w-lg leading-relaxed">
            Step into our boutique in Bartand, Dhanbad and let Laxmi ji and her team help you
            find your perfect shade, your signature scent, or that one jhumka that will
            steal the show.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-4 p-4 border border-champagne bg-surface" data-testid="info-address">
              <div className="w-10 h-10 bg-primary-c/15 text-primary-c flex items-center justify-center flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <div className="overline text-[10px]">Address</div>
                <div className="text-secondary-c">{BRAND.address}</div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-champagne bg-surface" data-testid="info-phone">
              <div className="w-10 h-10 bg-gold/15 text-gold flex items-center justify-center flex-shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <div className="overline text-[10px]">Call to Order</div>
                <div className="text-secondary-c flex flex-wrap gap-x-3">
                  {BRAND.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, '')}`}
                      className="hover:text-gold transition-colors"
                      data-testid={`phone-link-${p.replace(/[^0-9]/g, '')}`}
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-champagne bg-surface" data-testid="info-hours">
              <div className="w-10 h-10 bg-teal/15 text-teal flex items-center justify-center flex-shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <div className="overline text-[10px]">Store Hours</div>
                <div className="text-secondary-c">Mon – Sun · 10:00 AM – 9:00 PM</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={open} className="btn-primary" data-testid="open-maps-btn">
              Get Directions <ArrowUpRight size={16} />
            </button>
            <a
              href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`}
              className="btn-outline"
              data-testid="call-now-btn"
            >
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisitStore;
