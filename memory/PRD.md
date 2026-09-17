# Cosmatica — Product Requirements Doc

## Original Problem Statement
Build a fully working e-commerce website for **Cosmatica** — a ladies cosmetics & daily essentials shop in Bartand, Dhanbad owned by **Laxmi Devi**. Tagline: *"Elevate Your Elegance"*. The user requested a beautiful, vibrant, animated website with working buttons/menus, expanded categories, the actual shop card displayed prominently, dark luxury theme, Google Maps integration, and WhatsApp chat.

## Architecture
- **Frontend**: React 19 + TailwindCSS + Framer Motion (single-page, dark luxury theme)
- **Backend**: FastAPI boilerplate (untouched — no backend integrations needed)
- **State**: Local Cart Context (React Context API)
- **No DB writes** — fully static storefront with in-memory cart

## Brand Identity
- **Name**: Cosmatica
- **Tagline**: Elevate Your Elegance
- **Owner**: Laxmi Devi
- **Address**: Suraj Complex, In front of Asmita Studio, Bartand, Dhanbad
- **Phones**: +91 93863 45904, +91 98353 50778, +91 79090 83831
- **Google Maps**: https://maps.app.goo.gl/t124mPDL6dqubSSH9

## User Persona
Indian women (college students through brides), primarily Dhanbad/Jharkhand region, looking for jewellery, cosmetics, fragrances, hair accessories and daily beauty essentials.

## Core Requirements (static)
- 7 product categories: Jewelry & Bangles · Beauty & Skincare · Hair Accessories · Fragrances & Gifting · Cosmetics & Glamour · Eye & Nail Essentials · Skincare & Body Care
- Working clickable buttons, menus, smooth-scroll navigation
- Animated, vibrant dark theme that works on phone & desktop
- Shop card prominently displayed (in Visit Store section)
- WhatsApp floating button to both owner numbers
- Working cart with qty controls, remove, clear, demo checkout

## What's Been Implemented (2026-05-20)
- ✅ Brand rebranded throughout the site (Cosmatica + tagline)
- ✅ **Dark luxury theme** — deep wine-black (#120710) with gold/crimson/teal/rose-gold accents
- ✅ 7 categories with vibrant Pexels imagery, bento-grid hero
- ✅ 24 products across all categories (verified images)
- ✅ Hero with rainbow shimmer text, confetti dots, multi-color floating petals
- ✅ Featured products grid with category tab filtering + add-to-cart
- ✅ Slide-over cart drawer with qty +/-, remove, clear, demo checkout
- ✅ **Visit Our Store** section with BIG tilted shop card + glowing border + "Get Directions" → opens Google Maps in new tab + "Call Now" tel: link
- ✅ "Visit Our Store" button in hero also opens Maps URL
- ✅ About section with founder card (Laxmi Devi) + 4 value props + address block
- ✅ Auto-advancing testimonials carousel with prev/next/dots
- ✅ Newsletter signup with HTML5 validation
- ✅ Footer with 3 columns + contact details + tel: anchors + social icons
- ✅ **Floating WhatsApp button** (bottom-right, green pulse) opens menu with both numbers → wa.me/91… deep links
- ✅ Mobile responsive (no horizontal overflow after fix)
- ✅ Testing: ~97% pass rate, all critical flows verified

## Files
- `/app/frontend/src/App.js` — composition
- `/app/frontend/src/index.css` — dark theme tokens, utilities, animations
- `/app/frontend/src/data/products.js` — BRAND constants, categories, products, testimonials
- `/app/frontend/src/context/CartContext.jsx` — cart state
- `/app/frontend/src/components/` — Navbar, Hero, Categories, FeaturedProducts, About, VisitStore, Testimonials, Newsletter, Footer, CartDrawer, FloatingPetals, WhatsAppFab

## Prioritised Backlog
### P0 — Done
- All requested features delivered.

### P1 — Future enhancements
- Real backend (products in MongoDB, admin panel for Laxmi ji to add/edit products & prices)
- Stripe / Razorpay / UPI checkout instead of demo alert
- Product detail page with image gallery
- Search bar wired to filtering
- Wishlist persistence

### P2
- Multi-language (Hindi toggle)
- Order tracking
- Customer accounts
- Newsletter actually sending via SendGrid

## Testing
- Frontend testing agent run on 2026-05-20 — see `/app/test_reports/iteration_1.json`
- All critical flows: PASS
- Fixed: 2 brand typos + 6px mobile overflow + FAB z-index
