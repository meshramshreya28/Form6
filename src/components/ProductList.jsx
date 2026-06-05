import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ProductList = ({ hideHeader = false, title = "Clinical Solutions", subtitle = "", hideViewAll = false, centeredHeader = false }) => {
  const { products } = useContext(AppContext);
  const [sectionRef] = useIntersectionObserver({ threshold: 0.1 });

  // Only display the first 4 featured products
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="product-section" ref={sectionRef} style={{ padding: '6rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        {!hideHeader && (
          <div className="section-header" style={{ display: 'flex', justifyContent: centeredHeader ? 'center' : 'space-between', alignItems: centeredHeader ? 'center' : 'flex-end', marginBottom: '4rem', textAlign: centeredHeader ? 'center' : 'left' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '500', margin: '0', letterSpacing: '-0.02em' }}>{title}</h2>
              {subtitle && <p style={{ opacity: 0.7, marginTop: '0.75rem', fontSize: '1.1rem' }}>{subtitle}</p>}
            </div>
            {!hideViewAll && (
              <Link to="/shop" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '999px', padding: '0.75rem 1.5rem', border: '1px solid var(--border-color)', color: 'var(--text-primary)', textDecoration: 'none' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>View All Formulations</span>
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        )}

        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem' }}>
          {featuredProducts.map((product, index) => {
            const delayClass = `delay-${(index % 4 + 1) * 100}`;
            return (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className={`product-card scroll-reveal ${delayClass}`}
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className="product-image-wrapper" style={{ backgroundColor: product.bgColor, borderRadius: '24px', padding: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', aspectRatio: '1/1', position: 'relative' }}>
                  <div className="product-badges" style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', display: 'flex', gap: '0.5rem', zIndex: 2 }}>
                    <span className="badge dark" style={{ backgroundColor: product.range === 'CORE' ? 'var(--text-primary)' : '#ffffff', color: product.range === 'CORE' ? '#ffffff' : 'var(--text-primary)', fontSize: '0.65rem', padding: '0.3rem 0.75rem', borderRadius: '999px', fontWeight: '700', textTransform: 'uppercase' }}>
                      {product.range}
                    </span>
                  </div>
                  <img src={product.image} alt={product.name} className="product-image" loading="lazy" style={{ width: '115%', height: '115%', objectFit: 'contain' }} />
                </div>
                <div className="product-info" style={{ padding: '0.75rem 0.25rem 0.25rem 0.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 className="product-name" style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-primary)', margin: '0 0 0.2rem 0', letterSpacing: '0' }}>{product.name}</h3>
                  <p className="product-subtitle" style={{ fontSize: '0.7rem', opacity: 0.65, margin: '0 0 0.75rem 0', color: 'var(--text-primary)', lineHeight: '1.3' }}>{product.subtitle}</p>
                  <div className="product-price" style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>€{product.price.toFixed(2)}</span>
                    <span style={{ fontSize: '0.6rem', fontWeight: '700', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>View</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
