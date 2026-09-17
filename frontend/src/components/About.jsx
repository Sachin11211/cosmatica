import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Heart } from 'lucide-react';
import { BRAND } from '../data/products';

const values = [
  { icon: Heart, title: 'Hand-picked Daily', text: 'Laxmi ji personally curates every product on our shelf.' },
  { icon: MapPin, title: 'Bartand Flagship', text: 'Visit us at Suraj Complex, in front of Asmita Studio.' },
  { icon: Clock, title: 'Open 10 AM – 9 PM', text: 'All week long. Call ahead for personal styling sessions.' },
  { icon: Phone, title: 'Order on Call', text: 'Phone & WhatsApp orders delivered across Dhanbad.' },
];

const About = () => (
  <section id="about" className="relative py-20 lg:py-28 bg-ivory" data-testid="about-section">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-5 relative"
      >
        <div className="relative aspect-[4/5] overflow-hidden border border-champagne">
          <img
            src="https://images.pexels.com/photos/9157350/pexels-photo-9157350.jpeg"
            alt="Indian woman with jewellery"
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          whileHover={{ rotate: 0, scale: 1.04 }}
          className="absolute -bottom-6 -right-6 bg-secondary-c text-ivory p-6 max-w-[240px] shadow-2xl float-y"
          style={{ rotate: '-3deg' }}
        >
          <div className="overline" style={{ color: '#F7E7CE' }}>Founder</div>
          <div className="font-serif text-3xl">{BRAND.owner}</div>
          <div className="text-xs mt-1 opacity-80">Cosmatica, Bartand · Dhanbad</div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-7"
      >
        <div className="overline mb-3">Our Story</div>
        <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-secondary-c leading-tight">
          A little shop in Dhanbad,
          <br />
          <span className="italic rainbow-text">elevating elegance</span> since day one.
        </h2>
        <p className="mt-6 text-muted-c text-base leading-relaxed max-w-xl">
          Cosmatica is the dream of <span className="italic text-primary-c">Laxmi Devi</span> — a
          warm corner of Bartand where every woman, from college student to bride, finds her
          favourite shade, her perfect jhumka and a little bit of joy wrapped in tissue paper.
        </p>

        <div className="grid sm:grid-cols-2 gap-5 mt-10">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex gap-4 p-5 border border-champagne hover:border-primary-c transition-colors group bg-ivory"
              data-testid={`value-${v.title.replace(/\s/g, '-').toLowerCase()}`}
            >
              <div className="w-11 h-11 flex-shrink-0 bg-bg-alt text-primary-c flex items-center justify-center group-hover:bg-primary-c group-hover:text-ivory transition-colors">
                <v.icon size={18} />
              </div>
              <div>
                <h4 className="font-serif text-lg text-secondary-c">{v.title}</h4>
                <p className="text-sm text-muted-c mt-1 leading-relaxed">{v.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-bg-alt border-l-4 border-primary-c">
          <div className="overline mb-1">Visit the Store</div>
          <div className="font-serif text-xl text-secondary-c">{BRAND.address}</div>
          <div className="text-sm text-muted-c mt-2">
            Call to order: <span className="text-primary-c">{BRAND.phones[0]}</span> ·{' '}
            <span className="text-primary-c">{BRAND.phones[1]}</span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default About;
