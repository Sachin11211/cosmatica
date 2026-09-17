import React from 'react';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '../data/products';

const Card = ({ t }) => (
  <div
    className="flex-shrink-0 w-[320px] sm:w-[380px] bg-surface border border-champagne p-7 mx-3"
    data-testid={`testimonial-card-${t.id}`}
  >
    <Quote className="text-gold mb-4" size={26} strokeWidth={1.5} />
    <p className="font-serif italic text-lg leading-relaxed text-secondary-c min-h-[96px]">
      “{t.quote}”
    </p>
    <div className="mt-5 flex items-center gap-1 text-gold">
      {Array.from({ length: t.rating }).map((_, i) => (
        <Star key={i} size={14} fill="currentColor" stroke="none" />
      ))}
    </div>
    <div className="mt-3">
      <div className="font-serif text-base text-secondary-c">{t.name}</div>
      <div className="text-xs opacity-60 tracking-widest uppercase text-muted-c">{t.location}</div>
    </div>
  </div>
);

const Testimonials = () => {
  // Duplicate the list so the marquee can loop seamlessly.
  const loop = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="relative py-20 lg:py-28 bg-secondary-c text-ivory overflow-hidden"
      data-testid="testimonials-section"
    >
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-c/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center mb-12">
        <div className="overline mb-4" style={{ color: '#F7E7CE' }}>Loved By Women</div>
        <h2 className="font-serif text-4xl lg:text-5xl">
          Stories from <span className="italic" style={{ color: '#E8C158' }}>our shop floor</span>
        </h2>
      </div>

      <div
        className="relative group [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
        data-testid="testimonials-marquee"
      >
        <div className="flex testimonial-marquee group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {loop.map((t, i) => (
            <Card key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
