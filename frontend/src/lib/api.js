// Cosmatica — backend API helper.
// Falls back to the static data in data/products.js if the backend is
// unreachable, so the site never breaks just because the API is offline.

import { products as staticProducts, categories as staticCategories } from '../data/products';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = `${BACKEND_URL}/api`;

export async function fetchProducts() {
  try {
    const res = await fetch(`${API}/products`);
    if (!res.ok) throw new Error('bad response');
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('empty');
    return data;
  } catch (err) {
    console.warn('[api] Falling back to static products —', err.message);
    return staticProducts;
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${API}/categories`);
    if (!res.ok) throw new Error('bad response');
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('empty');
    return data;
  } catch (err) {
    console.warn('[api] Falling back to static categories —', err.message);
    return staticCategories;
  }
}

export async function submitOrder({ customerName, phone, email, address, notes, items, subtotal }) {
  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer_name: customerName,
      phone,
      email: email || undefined,
      address,
      notes,
      items: items.map((p) => ({ id: p.id, name: p.name, price: p.price, qty: p.qty, image: p.image })),
      subtotal,
    }),
  });
  if (!res.ok) throw new Error('Order failed');
  return res.json();
}

export async function submitNewsletter(email) {
  const res = await fetch(`${API}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('Subscribe failed');
  return res.json();
}

export async function submitContact({ name, phone, email, message }) {
  const res = await fetch(`${API}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, email, message }),
  });
  if (!res.ok) throw new Error('Message failed to send');
  return res.json();
}
