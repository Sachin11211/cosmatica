// Cosmatica — product catalog with verified Pexels images
// Owner: Laxmi Devi · Address: Suraj Complex, in front of Asmita Studio, Bartand, Dhanbad

export const BRAND = {
  name: 'Cosmatica',
  tagline: 'Elevate Your Elegance.',
  owner: 'Laxmi Devi',
  phones: ['+91 93863 45904', '+91 98353 50778', '+91 79090 83831'],
  address: 'Suraj Complex, In front of Asmita Studio, Bartand, Dhanbad',
  cardImage:
    'https://customer-assets.emergentagent.com/job_site-gen-36/artifacts/nbka3ncy_WhatsApp%20Image%202026-05-20%20at%203.01.24%20PM.jpeg',
};

export const categories = [
  {
    id: 'jewelry',
    name: 'Jewelry & Bangles',
    tagline: 'Necklaces · Earrings · Mangalsutras',
    image: 'https://images.pexels.com/photos/9157350/pexels-photo-9157350.jpeg',
    color: '#7A1022',
  },
  {
    id: 'beauty',
    name: 'Beauty & Skincare',
    tagline: 'Foundations · Creams · Lotions',
    image: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg',
    color: '#B76E79',
  },
  {
    id: 'hair',
    name: 'Hair Accessories',
    tagline: 'Tiaras · Clips · Hairbands',
    image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg',
    color: '#0E7C66',
  },
  {
    id: 'fragrances',
    name: 'Fragrances & Gifting',
    tagline: 'Perfumes · Custom Gift Wrap',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
    color: '#D4AF37',
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics & Glamour',
    tagline: 'Lipsticks · Compacts · Palettes',
    image: 'https://images.pexels.com/photos/6739657/pexels-photo-6739657.jpeg',
    color: '#7A1022',
  },
  {
    id: 'eye-nail',
    name: 'Eye & Nail Essentials',
    tagline: 'Kajal · Liner · Mascara · Polish',
    image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg',
    color: '#1A3A32',
  },
  {
    id: 'body',
    name: 'Skincare & Body Care',
    tagline: 'Body Butter · Sunscreen · Lotion',
    image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg',
    color: '#23A6B0',
  },
];

export const products = [
  // Jewelry & Bangles
  {
    id: 1,
    name: 'Royal Kundan Necklace Set',
    category: 'jewelry',
    price: 1499,
    originalPrice: 1999,
    badge: 'Bridal',
    image: 'https://images.pexels.com/photos/9157350/pexels-photo-9157350.jpeg',
    description: 'Hand-set kundan necklace with matching jhumkas — the perfect bridal heirloom.',
  },
  {
    id: 2,
    name: 'Meenakari Jhumka Earrings',
    category: 'jewelry',
    price: 549,
    image: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg',
    description: 'Hand-painted meenakari jhumkas in ruby and emerald enamels.',
  },
  {
    id: 3,
    name: 'Gold Hoop Drop Earrings',
    category: 'jewelry',
    price: 899,
    badge: 'Bestseller',
    image: 'https://images.pexels.com/photos/12144990/pexels-photo-12144990.jpeg',
    description: 'Sculpted gold hoop drop earrings with a polished, everyday-luxe finish.',
  },
  {
    id: 4,
    name: 'Festive Glass Bangles (Dozen)',
    category: 'jewelry',
    price: 249,
    image: 'https://images.pexels.com/photos/12834994/pexels-photo-12834994.jpeg',
    description: 'A dozen Firozabad glass bangles in maroon, gold and rose tones.',
  },
  {
    id: 25,
    name: 'Gold-Tone Kada Bangles',
    category: 'jewelry',
    price: 799,
    badge: 'New',
    image: 'https://images.pexels.com/photos/1444441/pexels-photo-1444441.jpeg',
    description: 'A bold pair of gold-tone kada bangles, finished with fine mehendi-inspired etching.',
  },

  // Beauty & Skincare
  {
    id: 5,
    name: 'Silk Glow Foundation',
    category: 'beauty',
    price: 599,
    badge: 'New',
    image: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg',
    description: 'Weightless full-coverage foundation in 12 shades, with SPF 25.',
  },
  {
    id: 6,
    name: 'Rose Vitamin-C Day Cream',
    category: 'beauty',
    price: 449,
    originalPrice: 549,
    image: 'https://images.pexels.com/photos/29977128/pexels-photo-29977128.jpeg',
    description: 'Brightening rose extract + 10% Vitamin C for that everyday inner glow.',
  },
  {
    id: 7,
    name: 'Saffron Night Repair Cream',
    category: 'beauty',
    price: 699,
    image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg',
    description: 'Kashmiri saffron + retinol night cream that works while you dream.',
  },

  // Hair Accessories
  {
    id: 8,
    name: 'Pearl Princess Tiara',
    category: 'hair',
    price: 799,
    badge: 'Bridal',
    image: 'https://images.pexels.com/photos/13314616/pexels-photo-13314616.jpeg',
    description: 'A delicate freshwater-pearl tiara — your fairytale crown.',
  },
  {
    id: 9,
    name: 'Velvet Maroon Hairband',
    category: 'hair',
    price: 199,
    image: 'https://images.pexels.com/photos/7320509/pexels-photo-7320509.jpeg',
    description: 'Soft velvet hairband in our signature maroon. Comfort all day.',
  },
  {
    id: 10,
    name: 'Crystal Hair Clip Set',
    category: 'hair',
    price: 299,
    image: 'https://images.pexels.com/photos/122974/pexels-photo-122974.jpeg',
    description: 'Six rhinestone hair clips for the everyday sparkle.',
  },
  {
    id: 11,
    name: 'Embellished Evening Clutch',
    category: 'hair',
    price: 1199,
    image: 'https://images.pexels.com/photos/28387111/pexels-photo-28387111.jpeg',
    description: 'A hand-beaded clutch that turns every outfit into an occasion.',
  },

  // Fragrances & Gifting
  {
    id: 12,
    name: 'Damask Rose Eau de Parfum',
    category: 'fragrances',
    price: 1299,
    badge: 'Signature',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
    description: 'A romantic floral oriental, anchored in Bulgarian rose & oud.',
  },
  {
    id: 13,
    name: 'Mogra Attar Roll-on',
    category: 'fragrances',
    price: 349,
    image: 'https://images.pexels.com/photos/5790458/pexels-photo-5790458.jpeg',
    description: 'Pure jasmine attar in a glass roll-on. Lingers softly all day.',
  },
  {
    id: 14,
    name: 'Custom Gift Hamper',
    category: 'fragrances',
    price: 1999,
    badge: 'Gift',
    image: 'https://images.pexels.com/photos/1813948/pexels-photo-1813948.jpeg',
    description: 'Hand-wrapped gift box — you pick 4 favourites, we make it magical.',
  },

  // Cosmetics & Glamour
  {
    id: 15,
    name: 'Crimson Velvet Matte Lipstick',
    category: 'cosmetics',
    price: 349,
    badge: 'Bestseller',
    image: 'https://images.pexels.com/photos/6739657/pexels-photo-6739657.jpeg',
    description: '12-hour velvet matte in our signature Cosmatica crimson.',
  },
  {
    id: 16,
    name: 'Sunset Eyeshadow Palette',
    category: 'cosmetics',
    price: 899,
    image: 'https://images.pexels.com/photos/2535376/pexels-photo-2535376.jpeg',
    description: '12 silk-smooth shades from rose gold to deep mehendi green.',
  },
  {
    id: 17,
    name: 'Glow Highlighter Compact',
    category: 'cosmetics',
    price: 549,
    image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg',
    description: 'A buttery champagne highlighter for that lit-from-within glow.',
  },

  // Eye & Nail Essentials
  {
    id: 18,
    name: 'Kohl Black Kajal Stick',
    category: 'eye-nail',
    price: 199,
    image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg',
    description: 'Smudge-proof kohl with almond oil. Glides like silk, stays till sunrise.',
  },
  {
    id: 19,
    name: 'Waterproof Liquid Eyeliner',
    category: 'eye-nail',
    price: 249,
    badge: 'Waterproof',
    image: 'https://images.pexels.com/photos/2253833/pexels-photo-2253833.jpeg',
    description: 'Ultra-fine brush, blackest black, 24-hour smudge-proof formula.',
  },
  {
    id: 20,
    name: 'Lash Drama Mascara',
    category: 'eye-nail',
    price: 299,
    image: 'https://images.pexels.com/photos/9789234/pexels-photo-9789234.jpeg',
    description: 'Volumising, lengthening, flake-free. Drama in a single coat.',
  },
  {
    id: 21,
    name: 'Vibrant Nail Polish — Maroon',
    category: 'eye-nail',
    price: 149,
    image: 'https://images.pexels.com/photos/3997384/pexels-photo-3997384.jpeg',
    description: 'High-shine 10-day wear in our most-loved festive maroon.',
  },

  // Skincare & Body Care
  {
    id: 22,
    name: 'Shea Body Butter — Vanilla',
    category: 'body',
    price: 499,
    image: 'https://images.pexels.com/photos/13794471/pexels-photo-13794471.jpeg',
    description: 'Deep-nourishing shea butter with warm vanilla. Skin like silk.',
  },
  {
    id: 23,
    name: 'Daily Glow Body Lotion',
    category: 'body',
    price: 349,
    image: 'https://images.pexels.com/photos/5797999/pexels-photo-5797999.jpeg',
    description: 'Lightweight everyday lotion with hyaluronic acid & rosehip oil.',
  },
  {
    id: 24,
    name: 'Sun Shield SPF 50 PA+++',
    category: 'body',
    price: 599,
    badge: 'Summer Edit',
    image: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg',
    description: 'Broad-spectrum non-sticky sunscreen. No white cast, all sunshine.',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Ananya Sharma',
    location: 'Dhanbad',
    quote:
      'Cosmatica has become my one-stop shop. Laxmi ji personally helped me pick my wedding jewellery set — it was perfect!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Iyer',
    location: 'Bartand',
    quote:
      'The silk glow foundation feels like nothing on my skin and lasts all day. Every order comes wrapped like a love letter.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Meera Kapoor',
    location: 'Jharia',
    quote:
      'Finally a beauty store that respects tradition AND looks gorgeous on my dresser. The crimson lipstick is now my forever shade.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Riya Verma',
    location: 'Ranchi',
    quote:
      'Their tiara made me feel like a princess on my engagement. The gift wrapping made my mother cry happy tears.',
    rating: 5,
  },
];
