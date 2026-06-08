import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ShoppingBag, Check, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { AppContext } from '../context/AppContext';

const ShopAll = () => {
  const { products, addCartItem } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const queryParam = searchParams.get('q');
  const initialRange = searchParams.get('range') || 'All';
  const initialGoal = searchParams.get('goal') || 'All';

  // Filters state
  const [rangeFilter, setRangeFilter] = useState(initialRange);
  const [goalFilter, setGoalFilter] = useState(initialGoal);
  const [formatFilter, setFormatFilter] = useState('All');
  const [intensityFilter, setIntensityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  
  const [addedItems, setAddedItems] = useState({});
  const [sectionRef] = useIntersectionObserver({ threshold: 0.1 });
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    setRangeFilter(searchParams.get('range') || 'All');
    setGoalFilter(searchParams.get('goal') || 'All');
  }, [searchParams]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    const flavor = product.flavors && product.flavors.length > 0 ? product.flavors[0] : "";
    const size = product.sizes && product.sizes.length > 0 ? product.sizes[0] : "";
    
    addCartItem(product, 1, flavor, size);
    
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const handleRangeChange = (range) => {
    setRangeFilter(range);
    const newParams = {};
    if (range !== 'All') newParams.range = range;
    if (goalFilter !== 'All') newParams.goal = goalFilter;
    if (queryParam) newParams.q = queryParam;
    setSearchParams(newParams);
  };

  const handleGoalChange = (goal) => {
    setGoalFilter(goal);
    const newParams = {};
    if (rangeFilter !== 'All') newParams.range = rangeFilter;
    if (goal !== 'All') newParams.goal = goal;
    if (queryParam) newParams.q = queryParam;
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setRangeFilter('All');
    setGoalFilter('All');
    setFormatFilter('All');
    setIntensityFilter('All');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter(p => {
    const matchesRange = rangeFilter === 'All' || p.range.toLowerCase() === rangeFilter.toLowerCase();
    const matchesGoal = goalFilter === 'All' || p.category.toLowerCase() === goalFilter.toLowerCase();
    const matchesFormat = formatFilter === 'All' || p.format.toLowerCase() === formatFilter.toLowerCase();
    const matchesIntensity = intensityFilter === 'All' || p.intensity.toLowerCase() === intensityFilter.toLowerCase();
    
    const matchesQuery = !queryParam || 
      p.name.toLowerCase().includes(queryParam.toLowerCase()) || 
      p.subtitle.toLowerCase().includes(queryParam.toLowerCase()) ||
      p.description.toLowerCase().includes(queryParam.toLowerCase());
      
    return matchesRange && matchesGoal && matchesFormat && matchesIntensity && matchesQuery;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    return 0; // Default Featured
  });

  const rangeOptions = ['All', 'CORE', 'PRIME'];
  const goalOptions = ['All', 'Recovery', 'Sleep', 'Focus', 'Immunity', 'Digestion'];
  const formatOptions = ['All', 'Powder', 'Sachet', 'Capsule'];
  const intensityOptions = ['All', 'Regular', 'High'];

  return (
    <main className="shop-page">
      <div className="page-hero">
        <div className="page-hero-image" style={{ background: '#004A3A' }}>
          <img src="/nutrihue-lifestyle.png" alt="Shop All Form6 Formulations" style={{ mixBlendMode: 'luminosity', opacity: 0.15 }} />
        </div>
        <div className="page-hero-text" style={{ backgroundColor: '#004A3A' }}>
          <span className="hero-eyebrow" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Science-backed Nutraceuticals</span>
          <h1>Shop All Formulas</h1>
          <p>Explore our premium solution-based nutrition. Split into CORE for athletic performance and PRIME for daily longevity.</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {queryParam && (
          <div className="search-status-banner" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(44, 47, 31, 0.04)',
            padding: '1.25rem 1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            border: '1px solid rgba(44, 47, 31, 0.08)'
          }}>
            <div style={{ fontSize: '0.95rem' }}>
              Showing results for <strong style={{ color: '#004A3A' }}>"{queryParam}"</strong>
              {rangeFilter !== 'All' && <span> in <strong style={{ color: '#004A3A' }}>{rangeFilter}</strong></span>}
            </div>
            <button
              onClick={() => {
                const newParams = {};
                if (rangeFilter !== 'All') newParams.range = rangeFilter;
                if (goalFilter !== 'All') newParams.goal = goalFilter;
                setSearchParams(newParams);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-primary)',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '0.875rem'
              }}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Range Navigation Switcher (CORE vs PRIME) */}
        <div className="shop-range-switcher" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2.5rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '1.5rem'
        }}>
          {rangeOptions.map(r => (
            <button
              key={r}
              className={`btn ${rangeFilter === r ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                borderRadius: '999px',
                padding: '0.6rem 2rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                border: rangeFilter === r ? 'none' : '1px solid var(--text-primary)',
                boxShadow: rangeFilter === r ? '0 4px 12px rgba(0,74,58,0.15)' : 'none'
              }}
              onClick={() => handleRangeChange(r)}
            >
              {r === 'All' ? 'All Ranges' : `Form6 ${r}`}
            </button>
          ))}
        </div>

        <div className="shop-header-inner">
          <div className="shop-meta">
            Showing <strong>{sortedProducts.length}</strong> scientific formulations
          </div>
        </div>
        
        {/* Advanced Filters Toolbar */}
        <div className="shop-toolbar" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '1rem' }}>
            {/* Goal Filter Pills */}
            <div className="shop-categories" style={{ flexWrap: 'wrap' }}>
              {goalOptions.map(goal => (
                <button 
                  key={goal} 
                  className={`category-pill ${goalFilter === goal ? 'active' : ''}`}
                  onClick={() => handleGoalChange(goal)}
                >
                  {goal === 'All' ? 'All Goals' : goal}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setFiltersOpen(!filtersOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  border: '1px solid var(--border-color)',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px'
                }}
              >
                <SlidersHorizontal size={14} />
                <span>Filters {formatFilter !== 'All' || intensityFilter !== 'All' ? '(Active)' : ''}</span>
                <ChevronDown size={14} style={{ transform: filtersOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              <div className="shop-sort">
                <select 
                  className="sort-select" 
                  aria-label="Sort products"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Collapsible Advanced Filters (Format, Intensity) */}
          {filtersOpen && (
              <div className="advanced-filters-panel mobile-stack" style={{
              background: 'rgba(44, 47, 31, 0.02)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              animation: 'fadeUp 0.3s ease'
            }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', opacity: 0.8 }}>Format</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {formatOptions.map(f => (
                    <button
                      key={f}
                      onClick={() => setFormatFilter(f)}
                      style={{
                        background: formatFilter === f ? 'var(--text-primary)' : '#white',
                        color: formatFilter === f ? 'white' : 'var(--text-primary)',
                        border: '1px solid var(--border-color)',
                        padding: '0.35rem 0.85rem',
                        fontSize: '0.75rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', opacity: 0.8 }}>Intensity Level</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {intensityOptions.map(i => (
                    <button
                      key={i}
                      onClick={() => setIntensityFilter(i)}
                      style={{
                        background: intensityFilter === i ? 'var(--text-primary)' : '#white',
                        color: intensityFilter === i ? 'white' : 'var(--text-primary)',
                        border: '1px solid var(--border-color)',
                        padding: '0.35rem 0.85rem',
                        fontSize: '0.75rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <button
                  onClick={resetFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    textDecoration: 'underline',
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="product-section" id="shop-grid" ref={sectionRef} style={{ paddingTop: '2rem' }}>
        <div className="container">
          {sortedProducts.length > 0 ? (
            <div className="product-grid">
              {sortedProducts.map((product, index) => {
                const added = addedItems[product.id];
                const delayClass = `delay-${(index % 4 + 1) * 100}`;
                return (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`}
                    className={`product-card scroll-reveal ${delayClass}`}
                    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
                  >
                    <div className="product-image-wrapper" style={{ backgroundColor: product.bgColor }}>
                      <div className="product-badges">
                        <span className="badge dark" style={{ backgroundColor: product.range === 'CORE' ? 'var(--text-primary)' : '#ffffff', color: product.range === 'CORE' ? '#ffffff' : 'var(--text-primary)' }}>
                          {product.range}
                        </span>
                        {product.stock === 0 && (
                          <span className="badge" style={{ backgroundColor: '#e00', color: 'white' }}>OUT OF STOCK</span>
                        )}
                      </div>
                      <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                    </div>
                    <div className="product-info" style={{ flexGrow: 1 }}>
                      <div className="product-text">
                        <h3 className="product-name" style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-primary)' }}>{product.name}</h3>
                        <p className="product-subtitle">{product.subtitle}</p>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                          <span style={{ fontSize: '0.65rem', background: 'rgba(0,0,0,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{product.format}</span>
                          <span style={{ fontSize: '0.65rem', background: 'rgba(0,0,0,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{product.intensity} Level</span>
                        </div>
                        <div className="product-price" style={{ marginTop: '0.5rem' }}>
                          <span>€{product.price.toFixed(2)}</span>
                        </div>
                      </div>

                      <button
                        className={`product-add-btn${added ? ' added' : ''}`}
                        disabled={product.stock === 0}
                        onClick={(e) => handleAddToCart(e, product)}
                        aria-label={added ? `${product.name} added to cart` : `Add ${product.name} to cart`}
                        style={{ opacity: product.stock === 0 ? 0.5 : 1 }}
                      >
                        {added ? <Check size={16} /> : <ShoppingBag size={16} />}
                        {added ? 'Added!' : product.stock === 0 ? 'Sold Out' : 'Add'}
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '6rem 0',
              color: 'var(--text-primary)',
              opacity: 0.8
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '500' }}>No products found matching your active filters.</h3>
              <button 
                onClick={resetFilters}
                style={{ 
                  marginTop: '1.5rem',
                  padding: '0.75rem 2rem',
                  border: '1px solid var(--text-primary)',
                  background: 'none',
                  borderRadius: '999px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ShopAll;
