import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const bundleProducts = [
  { id: 1, name: 'The Beauty Supplement Bundle', subtitle: 'The Corals + The Purples', price: '$56.00', salePrice: '$44.80', image: '/product-pink.png', color: '#EBE5DF', badges: [{text: 'SAVE 20%', dark: true}, {text: 'FREE ELECTRIC MIXER', dark: false}] },
  { id: 2, name: 'Greens Enthusiast Bundle', subtitle: 'The Greens', price: '$56.00', salePrice: '$44.80', image: '/product-green.png', color: '#E6E2DA', badges: [{text: 'SAVE 20%', dark: true}, {text: 'FREE WATER BOTTLE', dark: false}] },
  { id: 9, name: 'Morning & Night Duo', subtitle: 'The Greens + The Blues', price: '$56.00', salePrice: '$44.80', image: '/product-blue.png', color: '#E1E4DF', badges: [{text: 'BESTSELLER', dark: true}] },
  { id: 10, name: 'The Ultimate Hydration Kit', subtitle: 'All 4 Flavors', price: '$112.00', salePrice: '$85.00', image: '/product-yellow.png', color: '#EAE5DB', badges: [{text: 'SAVE 25%', dark: true}] },
];

const Bundles = () => {
  const [addedItems, setAddedItems] = useState({});
  const [sectionRef] = useIntersectionObserver({ threshold: 0.1 });

  const handleAddToCart = (id) => {
    setAddedItems(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <main className="shop-page">
      <div className="page-hero">
        <div className="page-hero-image">
          <img src="/nutrihue-lifestyle.png" alt="Form 6 Bundles" />
        </div>
        <div className="page-hero-text">
          <h1>Bundles</h1>
          <p>Curated Form 6 bundles—so you can save on the superpowder routine that works best for you.</p>
        </div>
      </div>

      <section className="product-section" id="shop-grid" ref={sectionRef}>
        <div className="container" style={{ paddingTop: '2rem' }}>
          <div className="shop-meta" style={{ marginBottom: '2rem', fontWeight: 500 }}>
            {bundleProducts.length} products
          </div>
          <div className="product-grid">
            {bundleProducts.map((product, index) => (
              <div 
                key={product.id} 
                className={`product-card scroll-reveal delay-${(index % 4 + 1) * 100}`}
              >
                <div className="product-image-wrapper" style={{ backgroundColor: product.color }}>
                  {product.badges && (
                    <div className="product-badges">
                      {product.badges.map((badge, i) => (
                        <span key={i} className={`badge ${badge.dark ? 'dark' : ''}`}>{badge.text}</span>
                      ))}
                    </div>
                  )}
                  <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-subtitle">{product.subtitle}</p>
                  <div className="product-price">
                    {product.salePrice ? (
                      <>
                        <span className="sale-price">{product.salePrice}</span>
                        <span className="original-price">{product.price}</span>
                      </>
                    ) : (
                      <span>{product.price}</span>
                    )}
                  </div>
                </div>
                <button 
                  className={`product-add-btn ${addedItems[product.id] ? 'added' : ''}`}
                  onClick={() => handleAddToCart(product.id)}
                >
                  {addedItems[product.id] ? <Check size={16} /> : <ShoppingBag size={16} />}
                  {addedItems[product.id] ? 'Added!' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Bundles;
