import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ShopAll from './pages/ShopAll';
import Bundles from './pages/Bundles';
import Learn from './pages/Learn';
import Subscribe from './pages/Subscribe';
import ProductDetail from './pages/ProductDetail';
import Science from './pages/Science';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import Account from './pages/Account';
import AdminDashboard from './pages/AdminDashboard';
import Blog from './pages/Blog';
import Legal from './pages/Legal';
import AboutContact from './pages/AboutContact';

function ScrollToTop() {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, search]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopAll />} />
          <Route path="/bundles" element={<Bundles />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/subscribe" element={<Subscribe />} />
          
          {/* Form6 New Core & Prime Platform Routes */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/science" element={<Science />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/about-contact" element={<AboutContact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;