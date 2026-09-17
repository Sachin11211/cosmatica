import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { fetchCategories } from '../lib/api';

const Categories = ({ onSelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  // 7 categories - first wide, then 2-up, then 3 + 1 wide
  const sizes = [
    'md:col-span-7 md:row-span-2 md:h-[520px]',
    'md:col-span-5 md:h-[252px]',
    'md:col-span-5 md:h-[252px]',
    'md:col-span-4 md:h-[300px]',
    'md:col-span-4 md:h-[300px]',
    'md:col-span-4 md:h-[300px]',
    'md:col-span-12 md:h-[260px]',
  ];

  return (
    <section
      id="categories"
      className="relative py-20 lg:py-28 bg-ivory"
      data-testid="categories-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="overline mb-3">Curated Categories</div>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-secondary-c">
              Every shade of <span className="italic rainbow-text">her</span>.
            </h2>
          </div>
          <p className="text-muted-c max-w-md text-base leading-relaxed">
            From bridal kundan sets to your everyday kajal — seven worlds of beauty,
            curated by Laxmi ji, one shelf at a time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
          {categories.map((c, i) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              onClick={() => onSelect && onSelect(c.id)}
              className={`category-card aspect-[4/3] md:aspect-auto ${sizes[i]} group text-left relative overflow-hidden`}
              data-testid={`category-${c.id}`}
            >
              <img
                src={c.image}
                alt={c.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* Color tinted overlay using category accent */}
              <div
                className="absolute inset-0 transition-opacity duration-500 opacity-30 group-hover:opacity-60 mix-blend-multiply"
                style={{ background: `linear-gradient(180deg, transparent 0%, ${c.color}cc 100%)` }}
              />
              <div className="relative z-10 h-full w-full flex flex-col justify-end p-6 lg:p-8">
                <div className="overline" style={{ color: '#F7E7CE' }}>
                  {c.tagline}
                </div>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <h3 className="font-serif text-2xl lg:text-3xl text-ivory drop-shadow-lg">{c.name}</h3>
                  <div className="w-10 h-10 rounded-full border border-ivory/70 flex items-center justify-center text-ivory group-hover:bg-ivory group-hover:text-secondary-c transition-all duration-500 flex-shrink-0">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
