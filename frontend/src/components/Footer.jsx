import React from 'react';
import { Instagram, Facebook, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND } from '../data/products';

const Footer = () => {
  const cols = [
    {
      title: 'Shop',
      links: [
        'Jewelry & Bangles',
        'Beauty & Skincare',
        'Hair Accessories',
        'Fragrances & Gifting',
        'Cosmetics & Glamour',
        'Eye & Nail Essentials',
        'Skincare & Body Care',
      ],
    },
    {
      title: 'Help',
      links: ['Order on WhatsApp', 'Delivery in Dhanbad', 'Returns & Refunds', 'Gift Wrapping', 'Bulk Orders'],
    },
    {
      title: 'About',
      links: ['Our Story', 'Meet Laxmi Devi', 'Store Hours', 'Press & Features', 'Contact Us'],
    },
  ];

  return (
    <footer id="footer" className="bg-secondary-c text-ivory" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="font-serif text-4xl italic rainbow-text">{BRAND.name}</div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold mt-1">{BRAND.tagline}</div>
            <p className="mt-5 text-sm opacity-80 max-w-xs leading-relaxed">
              Cosmetics · Imitation Jewellery · Bangles · Ladies Bags · Gift Items.
              Curated with love by {BRAND.owner}.
            </p>
            <div className="mt-6 space-y-2 text-sm opacity-80">
              <div className="flex items-start gap-3" data-testid="footer-address">
                <MapPin size={14} className="text-gold mt-1" />
                <span>{BRAND.address}</span>
              </div>
              {BRAND.phones.map((p, i) => (
                <div className="flex items-center gap-3" key={i} data-testid={`footer-phone-${i}`}>
                  <Phone size={14} className="text-gold" />
                  <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-gold transition-colors">{p}</a>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-gold" />
                <a href="mailto:hello@cosmatica.in" className="hover:text-gold">hello@cosmatica.in</a>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, label: 'instagram' },
                { Icon: Facebook, label: 'facebook' },
                { Icon: MessageCircle, label: 'whatsapp' },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  className="w-10 h-10 border border-ivory/30 flex items-center justify-center hover:bg-gold hover:text-secondary-c hover:border-gold transition-colors"
                  data-testid={`social-${label}`}
                  aria-label={label}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="lg:col-span-2">
              <div className="overline mb-4" style={{ color: '#F7E7CE' }}>{c.title}</div>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#footer"
                      className="text-sm opacity-80 hover:opacity-100 hover:text-gold transition-colors"
                      data-testid={`footer-link-${l.toLowerCase().replace(/[^a-z]/g, '-')}`}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <div className="overline mb-4" style={{ color: '#F7E7CE' }}>We Accept</div>
            <div className="flex flex-wrap gap-2 text-xs">
              {['UPI', 'Cash', 'Card', 'COD', 'GPay'].map((p) => (
                <span
                  key={p}
                  className="px-3 py-1 border border-ivory/30 tracking-widest uppercase"
                >
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <div className="overline mb-2" style={{ color: '#F7E7CE' }}>Hours</div>
              <div className="text-sm opacity-80">Mon – Sun</div>
              <div className="text-sm opacity-80">10:00 AM – 9:00 PM</div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-ivory/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs opacity-70">
          <div>© {new Date().getFullYear()} {BRAND.name}. Made with ♡ in Dhanbad.</div>
          <div className="flex gap-5">
            <a href="#footer" className="hover:text-gold">Privacy</a>
            <a href="#footer" className="hover:text-gold">Terms</a>
            <a href="#footer" className="hover:text-gold">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
