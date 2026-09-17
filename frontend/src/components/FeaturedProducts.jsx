import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Heart, X, ShoppingBag } from 'lucide-react';
import { fetchProducts, fetchCategories } from '../lib/api';
import { useCart } from '../context/CartContext';

const SkeletonCard = () => (
  <div className="product-card flex flex-col animate-pulse" aria-hidden="true">
    <div className="aspect-square bg-champagne" />
    <div className="p-5 flex-1 flex flex-col gap-3">
      <div className="h-2 w-16 bg-champagne rounded" />
      <div className="h-5 w-3/4 bg-champagne rounded" />
      <div className="h-3 w-full bg-champagne rounded" />
      <div className="h-3 w-2/3 bg-champagne rounded" />
      <div className="mt-auto flex justify-between items-end">
        <div className="h-6 w-14 bg-champagne rounded" />
        <div className="h-11 w-11 bg-champagne rounded" />
      </div>
    </div>
  </div>
);

const FeaturedProducts = ({ activeCategory, onClearCategory }) => {
  const [tab, setTab] = useState(activeCategory || 'all');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()]).then(([p, c]) => {
      setProducts(p);
      setCategories(c);
      setLoading(false);
    });
  }, []);

  const TABS = [{ id: 'all', name: 'All' }, ...categories.map((c) => ({ id: c.id, name: c.name }))];

  React.useEffect(() => {
    if (activeCategory) setTab(activeCategory);
  }, [activeCategory]);

  const filtered = useMemo(() => {
    if (tab === 'all') return products;
    return products.filter((p) => p.category === tab);
  }, [tab, products]);

  const handleAdd = (e, p) => {
    const rect = e.currentTarget.getBoundingClientRect();
    addItem(p, rect);
  };

  return (
    <section
      id="featured"
      className="relative py-20 lg:py-28 bg-bg-alt grain"
      data-testid="featured-section"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="overline mb-3">The Cosmatica Edit</div>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-secondary-c">
              Loved <span className="italic text-primary-c">most</span>, made with care.
            </h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10" data-testid="product-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                if (onClearCategory) onClearCategory();
              }}
              className={`px-5 py-2 text-xs uppercase tracking-widest border transition-all ${
                tab === t.id
                  ? 'bg-secondary-c text-ivory border-secondary-c'
                  : 'bg-transparent text-secondary-c border-champagne hover:border-secondary-c'
              }`}
              data-testid={`tab-${t.id}`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="products-loading">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                  className="product-card group flex flex-col"
                  data-testid={`product-${p.id}`}
                >
                  <button
                    className="relative aspect-square overflow-hidden bg-champagne block w-full text-left"
                    onClick={() => setQuickView(p)}
                    aria-label={`Quick view ${p.name}`}
                    data-testid={`quick-view-open-${p.id}`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {p.badge && (
                      <span
                        className="absolute top-3 left-3 bg-primary-c text-ivory text-[10px] uppercase tracking-widest px-2 py-1"
                        data-testid={`badge-${p.id}`}
                      >
                        {p.badge}
                      </span>
                    )}
                    <span className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-secondary-c/90 text-ivory text-[10px] uppercase tracking-widest text-center py-2">
                      Quick view
                    </span>
                  </button>
                  <button
                    className="absolute top-3 right-3 w-9 h-9 bg-ivory/90 backdrop-blur flex items-center justify-center text-secondary-c hover:text-primary-c transition-colors"
                    aria-label="wishlist"
                    data-testid={`wishlist-${p.id}`}
                  >
                    <Heart size={15} />
                  </button>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="overline text-[10px]">{categories.find((c) => c.id === p.category)?.name}</div>
                    <h3 className="font-serif text-xl text-secondary-c mt-1 leading-snug">{p.name}</h3>
                    <p className="text-sm text-muted-c mt-2 line-clamp-2 flex-1">{p.description}</p>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <div className="font-serif text-xl text-primary-c" data-testid={`price-${p.id}`}>
                          ₹{p.price}
                        </div>
                        {p.originalPrice && (
                          <div className="text-xs text-muted-c line-through">₹{p.originalPrice}</div>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleAdd(e, p)}
                        className="w-11 h-11 bg-secondary-c text-ivory flex items-center justify-center hover:bg-primary-c transition-colors group/btn"
                        aria-label="add to cart"
                        data-testid={`add-to-cart-${p.id}`}
                      >
                        <Plus size={18} className="transition-transform group-hover/btn:rotate-90" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Quick view modal */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-testid="quick-view-modal"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setQuickView(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="relative bg-surface border border-champagne max-w-3xl w-full grid sm:grid-cols-2 max-h-[88vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label={quickView.name}
            >
              <button
                onClick={() => setQuickView(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-ivory/90 flex items-center justify-center text-secondary-c hover:text-primary-c"
                aria-label="Close quick view"
                data-testid="quick-view-close"
              >
                <X size={16} />
              </button>
              <div className="aspect-square sm:aspect-auto">
                <img src={quickView.image} alt={quickView.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 sm:p-8 flex flex-col">
                {quickView.badge && (
                  <span className="self-start bg-primary-c text-ivory text-[10px] uppercase tracking-widest px-2 py-1 mb-3">
                    {quickView.badge}
                  </span>
                )}
                <div className="overline text-[10px]">
                  {categories.find((c) => c.id === quickView.category)?.name}
                </div>
                <h3 className="font-serif text-3xl text-secondary-c mt-2">{quickView.name}</h3>
                <p className="text-muted-c mt-4 leading-relaxed flex-1">{quickView.description}</p>
                <div className="mt-6 flex items-end gap-3">
                  <div className="font-serif text-3xl text-primary-c">₹{quickView.price}</div>
                  {quickView.originalPrice && (
                    <div className="text-sm text-muted-c line-through mb-1">₹{quickView.originalPrice}</div>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    handleAdd(e, quickView);
                    setQuickView(null);
                  }}
                  className="btn-primary w-full justify-center mt-6"
                  data-testid="quick-view-add-btn"
                >
                  Add to bag <ShoppingBag size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedProducts;
