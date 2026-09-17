import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const COLLECTIONS = [
  {
    id: 'jewelry',
    title: 'The Bridal Edit',
    subtitle: 'Kundan, meenakari & gold — dressed for your big day.',
    image: 'https://images.pexels.com/photos/9157350/pexels-photo-9157350.jpeg',
  },
  {
    id: 'cosmetics',
    title: 'Festive Glam',
    subtitle: 'Bold lips, shimmer & glow for every celebration.',
    image: 'https://images.pexels.com/photos/6739657/pexels-photo-6739657.jpeg',
  },
  {
    id: 'beauty',
    title: 'Everyday Glow',
    subtitle: 'Skincare rituals worth waking up early for.',
    image: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg',
  },
];

const OccasionCollections = ({ onSelect }) => (
  <section className="relative py-20 lg:py-24 bg-bg-alt" data-testid="occasion-collections">
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="text-center mb-12">
        <div className="overline mb-3">Shop By Occasion</div>
        <h2 className="font-serif text-4xl lg:text-5xl text-secondary-c">
          Curated for every <span className="italic text-primary-c">moment</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {COLLECTIONS.map((c, i) => (
          <motion.button
            key={c.id}
            onClick={() => onSelect(c.id)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.7 }}
            className="category-card group relative aspect-[3/4] text-left"
            data-testid={`occasion-${c.id}`}
          >
            <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
              <h3 className="font-serif text-2xl lg:text-3xl text-ivory">{c.title}</h3>
              <p className="text-sm text-ivory/70 mt-2 max-w-[85%]">{c.subtitle}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold">
                Shop now <ArrowUpRight size={14} />
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  </section>
);

export default OccasionCollections;
