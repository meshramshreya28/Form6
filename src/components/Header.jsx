import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, Plus, Minus, Trash2, Shield } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { cart, removeCartItem, updateCartItemQty, user, updateUserRole, products } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isSolidPage = ['/subscribe', '/checkout', '/account', '/admin', '/science', '/blog', '/about-contact', '/legal'].some(path => location.pathname.startsWith(path));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerState, setHeaderState] = useState(isSolidPage ? 'solid' : 'transparent');
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Close mobile menu on resize back to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when menu, search, or cart is open
  useEffect(() => {
    document.body.style.overflow = (mobileOpen || searchOpen || cartOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, searchOpen, cartOpen]);

  // Live Search Filter Logic from live products
  const filteredSearchProducts = searchQuery.trim() === ''
    ? []
    : products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Sync header solid state on route change
  useEffect(() => {
    if (window.scrollY < 50) {
      const isSolid = ['/subscribe', '/checkout', '/account', '/admin', '/science', '/blog', '/about-contact', '/legal'].some(path => location.pathname.startsWith(path));
      setHeaderState(isSolid ? 'solid' : 'transparent');
    }
  }, [location.pathname]);

  // Scroll handler for transparent vs solid vs hidden header
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (mobileOpen || cartOpen) return;
      const currentScrollY = window.scrollY;
      const isSolidPath = ['/subscribe', '/checkout', '/account', '/admin', '/science', '/blog', '/about-contact', '/legal'].some(path => location.pathname.startsWith(path));
      
      if (currentScrollY < 50) {
        setHeaderState(isSolidPath ? 'solid' : 'transparent');
      } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setHeaderState('hidden');
      } else if (currentScrollY < lastScrollY) {
        setHeaderState('solid');
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, mobileOpen, cartOpen]);

  // Listen for ESC key to close search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalCartQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const navLinks = [
    { href: '/shop', label: 'Shop All' },
    { href: '/shop?range=CORE', label: 'CORE Range', isMega: true, megaType: 'core' },
    { href: '/shop?range=PRIME', label: 'PRIME Range', isMega: true, megaType: 'prime' },
    { href: '/science', label: 'The Science' },
    { href: '/subscribe', label: 'Subscribe' },
  ];

  return (
    <>
      {/* Admin Panel Floating Bar */}
      {user && user.loggedIn && user.role === 'Administrator' && (
        <div className="admin-status-bar">
          <div className="admin-status-bar-container container">
            <div className="admin-status-info">
              <Shield size={14} className="admin-shield" />
              <span>Logged in as <strong>Administrator</strong></span>
            </div>
            <div className="admin-status-actions">
              <Link to="/admin" className="admin-link-btn">Go to Dashboard</Link>
              <button 
                className="admin-toggle-role-btn" 
                onClick={() => {
                  updateUserRole('Customer');
                  navigate('/');
                }}
              >
                Switch to Customer View
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`header-wrapper ${mobileOpen ? 'solid' : headerState} ${activeMegaMenu ? 'mega-open' : ''}`} onMouseLeave={() => setActiveMegaMenu(null)}>
        <header className="header container">
          <button
            className="icon-btn mobile-menu-btn mobile-only"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(prev => !prev)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav className="header-nav" aria-label="Main navigation">
            {navLinks.map(link => {
              if (link.isMega) {
                const rangeProducts = products.filter(p => p.range === (link.megaType === 'core' ? 'CORE' : 'PRIME'));
                return (
                  <div 
                    key={link.href} 
                    className="nav-item-has-mega"
                    onMouseEnter={() => setActiveMegaMenu(link.megaType)}
                  >
                    <Link to={link.href}>{link.label}</Link>
                    <div className={`mega-menu ${activeMegaMenu === link.megaType ? 'open' : ''}`}>
                      <div className="container mega-menu-inner">
                        <div className="mega-menu-list">
                          <h3 className="mega-menu-section-title">
                            {link.megaType === 'core' ? 'Form6 CORE (High-Performance)' : 'Form6 PRIME (Daily Longevity)'}
                          </h3>
                          <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            {rangeProducts.map(p => (
                              <Link to={`/product/${p.id}`} key={p.id} className="mega-menu-item" onClick={() => setActiveMegaMenu(null)}>
                                <div className="mega-color-box" style={{ backgroundColor: p.bgColor }}>
                                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                                <div className="mega-item-text">
                                  <h4>{p.name.replace('Form6 CORE ', '').replace('Form6 PRIME ', '')}</h4>
                                  <p>{p.subtitle}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div className="mega-menu-features">
                          {link.megaType === 'core' ? (
                            <Link to="/shop?range=CORE" className="mega-feature-card" onClick={() => setActiveMegaMenu(null)}>
                              <img src="/product-green.png" alt="Form6 CORE Range" style={{ backgroundColor: '#E2ECE6', objectFit: 'contain', padding: '1rem' }} />
                              <p>Explore CORE Athlete Range →</p>
                            </Link>
                          ) : (
                            <Link to="/shop?range=PRIME" className="mega-feature-card" onClick={() => setActiveMegaMenu(null)}>
                              <img src="/product-blue.png" alt="Form6 PRIME Range" style={{ backgroundColor: '#E1E4DF', objectFit: 'contain', padding: '1rem' }} />
                              <p>Explore PRIME Wellness Range →</p>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link 
                  key={link.href} 
                  to={link.href} 
                  onMouseEnter={() => setActiveMegaMenu(null)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link to="/" className="header-logo" aria-label="Form 6 home">
            FORM6
          </Link>

          <div className="header-icons">
            <button className="icon-btn desktop-only" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={20} />
            </button>
            <button className="icon-btn desktop-only" aria-label="Account" onClick={() => navigate('/account')}>
              <User size={20} />
            </button>
            <button className="icon-btn cart-icon-button" aria-label={`Cart (${totalCartQty} items)`} onClick={() => setCartOpen(true)}>
              <ShoppingBag size={20} />
              {totalCartQty > 0 && <span className="cart-badge">{totalCartQty}</span>}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <ul>
            {navLinks.map(link => (
              <li key={link.href}>
                <Link to={link.href} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li><Link to="/account" onClick={() => setMobileOpen(false)}>My Account</Link></li>
            {user && user.loggedIn && user.role === 'Administrator' && (
              <li><Link to="/admin" onClick={() => setMobileOpen(false)}>Admin Panel</Link></li>
            )}
          </ul>
          
          <div className="mobile-nav-utility">
            <button className="mobile-utility-btn" onClick={() => { setMobileOpen(false); setSearchOpen(true); }}>
              <Search size={18} />
              <span>Search</span>
            </button>
            <button className="mobile-utility-btn" onClick={() => { setMobileOpen(false); navigate('/account'); }}>
              <User size={18} />
              <span>Account</span>
            </button>
          </div>
        </nav>
      )}

      {/* Sliding Cart Drawer */}
      {cartOpen && (
        <div className="cart-drawer-overlay">
          <div className="cart-drawer-backdrop" onClick={() => setCartOpen(false)} />
          <div className="cart-drawer-content">
            <div className="cart-drawer-header">
              <h3>Your Cart ({totalCartQty})</h3>
              <button className="cart-drawer-close" aria-label="Close cart" onClick={() => setCartOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="cart-drawer-body">
              {cart.length === 0 ? (
                <div className="empty-cart-message">
                  <ShoppingBag size={48} strokeWidth={1.2} />
                  <p>Your cart is empty.</p>
                  <Link to="/shop" className="btn btn-primary" onClick={() => setCartOpen(false)}>
                    Shop Our Range
                  </Link>
                </div>
              ) : (
                <div className="cart-drawer-items">
                  {cart.map((item, idx) => (
                    <div className="cart-drawer-item" key={`${item.product.id}-${item.flavor}-${item.size}-${idx}`}>
                      <div className="cart-item-img-container" style={{ backgroundColor: item.product.bgColor }}>
                        <img src={item.product.image} alt={item.product.name} />
                      </div>
                      <div className="cart-item-info">
                        <span className="cart-item-range-badge">{item.product.range}</span>
                        <h4>{item.product.name}</h4>
                        {item.flavor && <p className="cart-item-variant">Flavor: {item.flavor}</p>}
                        {item.size && <p className="cart-item-variant">Size: {item.size}</p>}
                        <span className="cart-item-price">€{(item.product.price * item.quantity).toFixed(2)}</span>
                        
                        <div className="cart-item-controls">
                          <div className="qty-control">
                            <button onClick={() => updateCartItemQty(item.product.id, item.quantity - 1, item.flavor, item.size)} aria-label="Decrease quantity">
                              <Minus size={12} />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateCartItemQty(item.product.id, item.quantity + 1, item.flavor, item.size)} aria-label="Increase quantity">
                              <Plus size={12} />
                            </button>
                          </div>
                          <button 
                            className="cart-item-remove-btn" 
                            onClick={() => removeCartItem(item.product.id, item.flavor, item.size)}
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-drawer-footer">
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <strong>€{cartSubtotal.toFixed(2)}</strong>
                </div>
                <p className="cart-tax-shipping-note">Taxes and shipping calculated at checkout.</p>
                <button 
                  className="btn btn-primary cart-checkout-btn" 
                  onClick={() => {
                    setCartOpen(false);
                    navigate('/checkout');
                  }}
                >
                  Proceed to Checkout
                </button>
                <button className="cart-continue-shopping" onClick={() => setCartOpen(false)}>
                  Or Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Premium Search Overlay Modal */}
      {searchOpen && (
        <div className="search-overlay">
          <div className="search-overlay-backdrop" onClick={() => setSearchOpen(false)} />
          <div className="search-overlay-content">
            <div className="container search-overlay-inner">
              <div className="search-header">
                <Search size={24} className="search-input-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search our formulas, ranges, goals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit();
                    }
                  }}
                  autoFocus
                />
                <button className="search-close-btn" aria-label="Close search" onClick={() => setSearchOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {/* Dashboard Layout */}
              <div className="search-dashboard-grid">
                {/* Left Column: Sidebar Suggestions & Quick Links */}
                <div className="search-dashboard-sidebar">
                  <div className="search-sidebar-section">
                    <h4 className="search-sidebar-title">Popular Searches</h4>
                    <div className="search-tags">
                      {['CORE', 'PRIME', 'Recovery', 'Sleep', 'Immunity', 'Digest'].map(tag => (
                        <button key={tag} className="search-tag-link" onClick={() => setSearchQuery(tag)}>
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="search-sidebar-section">
                    <h4 className="search-sidebar-title">Quick Navigation</h4>
                    <div className="search-quick-links">
                      <Link to="/shop" className="search-quick-link-btn" onClick={() => setSearchOpen(false)}>Shop All Products</Link>
                      <Link to="/subscribe" className="search-quick-link-btn" onClick={() => setSearchOpen(false)}>Subscribe & Save 20%</Link>
                      <Link to="/science" className="search-quick-link-btn" onClick={() => setSearchOpen(false)}>The Science / Quality</Link>
                    </div>
                  </div>
                </div>

                {/* Right Column: Trending Products or Search Results */}
                <div className="search-dashboard-results">
                  {searchQuery.trim() === '' ? (
                    <>
                      <div className="search-results-top">
                        <h4 className="search-sidebar-title">Featured Formulations</h4>
                      </div>
                      <div className="search-results-grid">
                        {products.slice(0, 3).map((product, idx) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="search-card-premium"
                            style={{ '--delay': idx * 80 }}
                            onClick={() => setSearchOpen(false)}
                          >
                            <div className="search-card-img-container" style={{ backgroundColor: product.bgColor || '#F5F5F5' }}>
                              <img src={product.image} alt={product.name} className="search-card-img" />
                            </div>
                            <div className="search-card-details">
                              <span className="search-card-badge">{product.range}</span>
                              <h4 className="search-card-title">{product.name}</h4>
                              <span className="search-card-price">€{product.price.toFixed(2)}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="search-results-top">
                        <h4 className="search-sidebar-title">Search Results ({filteredSearchProducts.length})</h4>
                        {filteredSearchProducts.length > 0 && (
                          <button className="view-all-results-btn" onClick={handleSearchSubmit}>
                            View all results
                          </button>
                        )}
                      </div>

                      {filteredSearchProducts.length > 0 ? (
                        <div className="search-results-grid">
                          {filteredSearchProducts.slice(0, 6).map((product, idx) => (
                            <Link
                              key={product.id}
                              to={`/product/${product.id}`}
                              className="search-card-premium"
                              style={{ '--delay': idx * 80 }}
                              onClick={() => setSearchOpen(false)}
                            >
                              <div className="search-card-img-container" style={{ backgroundColor: product.bgColor || '#F5F5F5' }}>
                                <img src={product.image} alt={product.name} className="search-card-img" />
                              </div>
                              <div className="search-card-details">
                                <span className="search-card-badge">{product.range}</span>
                                <h4 className="search-card-title">{product.name}</h4>
                                <span className="search-card-price">€{product.price.toFixed(2)}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="search-no-results">
                          No products found for "{searchQuery}". Try searching for something else.
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Muted Esc Helper */}
              <div className="search-footer-info">
                <span>Form 6 Wellness Store Search</span>
                <span>Press <kbd className="search-esc-hint">ESC</kbd> to close</span>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;