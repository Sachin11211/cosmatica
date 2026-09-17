import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const links = [
  { label: 'Shop', href: '#categories' },
  { label: 'Featured', href: '#featured' },
  { label: 'Our Story', href: '#about' },
  { label: 'Loved By', href: '#testimonials' },
  { label: 'Contact', href: '#footer' },
];

const Navbar = () => {
  const { count, setIsOpen, bump } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-secondary-c text-ivory text-xs tracking-widest overflow-hidden" data-testid="announcement-bar">
        <div className="marquee py-2">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-12 px-6 whitespace-nowrap">
              <span>✦ FREE DELIVERY IN DHANBAD ABOVE ₹499</span>
              <span>✦ NEW BRIDAL JEWELLERY COLLECTION</span>
              <span>✦ VISIT US AT SURAJ COMPLEX, BARTAND</span>
              <span>✦ CALL +91 93863 45904 TO ORDER</span>
              <span>✦ CUSTOM GIFT WRAPPING ON ALL ORDERS</span>
            </div>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? 'glass-nav shadow-sm' : 'bg-transparent'
        }`}
        data-testid="navbar"
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          {/* Left links (desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {links.slice(0, 3).map((l) => (
              <button
                key={l.label}
                onClick={() => handleNav(l.href)}
                className="text-sm tracking-widest uppercase text-secondary-c hover:text-primary-c transition-colors relative group"
                data-testid={`nav-${l.label.toLowerCase().replace(' ', '-')}`}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-c group-hover:w-full transition-all duration-500" />
              </button>
            ))}
          </div>

          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col items-center leading-none"
            data-testid="logo"
          >
            <span className="font-serif text-3xl lg:text-4xl font-bold tracking-tight rainbow-text italic">
              Cosmatica
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-gold mt-1 hidden sm:block">
              Elevate Your Elegance
            </span>
          </a>

          {/* Right links + icons */}
          <div className="flex items-center gap-3 lg:gap-6">
            <div className="hidden lg:flex items-center gap-8">
              {links.slice(3).map((l) => (
                <button
                  key={l.label}
                  onClick={() => handleNav(l.href)}
                  className="text-sm tracking-widest uppercase text-secondary-c hover:text-primary-c transition-colors relative group"
                  data-testid={`nav-${l.label.toLowerCase().replace(' ', '-')}`}
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-c group-hover:w-full transition-all duration-500" />
                </button>
              ))}
            </div>

            <button
              className="hidden md:flex p-2 hover:text-primary-c transition-colors text-secondary-c"
              aria-label="Search"
              data-testid="search-btn"
            >
              <Search size={18} />
            </button>
            <button
              className="hidden md:flex p-2 hover:text-primary-c transition-colors text-secondary-c"
              aria-label="Wishlist"
              data-testid="wishlist-btn"
            >
              <Heart size={18} />
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 hover:text-primary-c transition-colors text-secondary-c"
              aria-label="Cart"
              data-testid="open-cart-btn"
            >
              <motion.span
                key={bump}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.28, 1] }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="inline-flex"
              >
                <ShoppingBag size={20} />
              </motion.span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-primary-c text-ivory text-[10px] font-medium w-5 h-5 rounded-full flex items-center justify-center"
                    data-testid="cart-count"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              className="lg:hidden p-2 text-secondary-c"
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
              data-testid="mobile-menu-btn"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-secondary-c text-ivory flex flex-col"
            data-testid="mobile-menu"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <span className="font-serif text-2xl italic">Cosmatica<span className="text-gold">.</span></span>
              <button onClick={() => setMobileOpen(false)} data-testid="mobile-close-btn">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {links.map((l, i) => (
                <motion.button
                  key={l.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  onClick={() => handleNav(l.href)}
                  className="font-serif text-4xl hover:text-gold transition-colors"
                  data-testid={`mobile-nav-${l.label.toLowerCase().replace(' ', '-')}`}
                >
                  {l.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
