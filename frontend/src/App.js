import React, { useState } from 'react';
import '@/App.css';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import OccasionCollections from './components/OccasionCollections';
import FestivalQuiz from './components/FestivalQuiz';
import FeaturedProducts from './components/FeaturedProducts';
import About from './components/About';
import VisitStore from './components/VisitStore';
import ContactForm from './components/ContactForm';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FlyToCartLayer from './components/FlyToCartLayer';
import WhatsAppFab from './components/WhatsAppFab';

function App() {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    setTimeout(() => {
      document.querySelector('#featured')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <CartProvider>
      <div className="App min-h-screen bg-ivory" data-testid="app-root">
        <Navbar />
        <Hero />
        <Categories onSelect={handleSelectCategory} />
        <OccasionCollections onSelect={handleSelectCategory} />
        <FestivalQuiz />
        <FeaturedProducts
          activeCategory={activeCategory}
          onClearCategory={() => setActiveCategory(null)}
        />
        <About />
        <VisitStore />
        <ContactForm />
        <Testimonials />
        <Newsletter />
        <Footer />
        <CartDrawer />
        <FlyToCartLayer />
        <WhatsAppFab />
      </div>
    </CartProvider>
  );
}

export default App;
