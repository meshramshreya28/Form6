import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ShieldCheck, Heart, RotateCcw, AlertCircle, ChevronDown, Check } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addCartItem, wishlist, toggleWishlist } = useContext(AppContext);
  
  const product = products.find(p => p.id === parseInt(id));

  // Default variants
  const [flavor, setFlavor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [purchaseOption, setPurchaseOption] = useState("one-time"); // "one-time" or "subscribe"
  const [addedMessage, setAddedMessage] = useState(false);
  const [activeTab, setActiveTab] = useState("benefits"); // "benefits", "ingredients", "studies"

  useEffect(() => {
    if (product) {
      setFlavor(product.flavors && product.flavors.length > 0 ? product.flavors[0] : "");
      setSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : "");
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2>Product not found.</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Back to Shop</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const subscriptionDiscount = 0.20; // 20% off
  const displayPrice = purchaseOption === "subscribe" 
    ? product.price * (1 - subscriptionDiscount) 
    : product.price;

  const handleAddToCart = () => {
    addCartItem(product, quantity, flavor, size);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  return (
    <main className="pdp-page" style={{ paddingTop: 'calc(var(--header-height) + 2rem)', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Back Link */}
        <button onClick={() => navigate(-1)} className="pdp-back-btn" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-primary)',
          fontWeight: '500',
          fontSize: '0.85rem',
          marginBottom: '2rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <ArrowLeft size={16} />
          <span>Back to Collection</span>
        </button>

        {/* PDP Main Content Grid */}
        <div className="pdp-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '4rem',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Image & Supplement Facts */}
          <div className="pdp-left-col">
            <div className="pdp-image-showcase" style={{
              backgroundColor: product.bgColor,
              background: `radial-gradient(circle at center, white 0%, ${product.bgColor} 100%)`,
              borderRadius: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: '1/1',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
            >
              <span className="pdp-range-badge" style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: 'var(--text-primary)',
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                zIndex: 2
              }}>
                {product.range} Range
              </span>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 1, position: 'relative' }} />
            </div>

            {/* Scientific Supplement Facts Label */}
            <div className="supplement-facts-container" style={{
              marginTop: '4rem',
              backgroundColor: '#fff',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '24px',
              padding: '3rem',
              fontFamily: '"Inter", sans-serif',
              boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid rgba(0,0,0,0.1)', paddingBottom: '1rem', margin: 0, color: 'var(--text-primary)' }}>Clinical Formulation</h3>
              <div style={{ fontSize: '0.9rem', margin: '1.5rem 0', display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)', opacity: 0.8 }}>
                <div>Serving Size: <strong style={{ color: 'var(--text-primary)', opacity: 1 }}>{product.servingSize}</strong></div>
                <div>Servings: <strong style={{ color: 'var(--text-primary)', opacity: 1 }}>{product.servings}</strong></div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0', fontWeight: '600', color: 'var(--text-primary)', opacity: 0.6, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Compound</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem 0', fontWeight: '600', color: 'var(--text-primary)', opacity: 0.6, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>% Daily Value*</th>
                  </tr>
                </thead>
                <tbody>
                  {product.facts.map((fact, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', fontWeight: fact.dv ? '400' : '500' }}>
                      <td style={{ padding: '1rem 0', color: 'var(--text-primary)' }}>{fact.name} {fact.amount !== '15' && fact.amount !== '5' && fact.amount !== '115' && fact.amount !== '25g' && <span style={{ opacity: 0.6, marginLeft: '0.5rem', fontSize: '0.85rem' }}>({fact.amount})</span>}</td>
                      <td style={{ textAlign: 'right', padding: '1rem 0', fontWeight: '500', color: 'var(--text-primary)' }}>{fact.dv || '100%'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ fontSize: '0.75rem', marginTop: '2rem', opacity: 0.5, lineHeight: '1.5', color: 'var(--text-primary)' }}>
                * Percent Daily Values (DV) are based on a 2,000 calorie diet.<br />
                † Daily Value (DV) not established. Standardized clinical extraction.
              </div>
            </div>
          </div>

          {/* Right Column: Order Details Form */}
          <div className="pdp-right-col">
            <h1 style={{ fontSize: '2.5rem', fontWeight: '500', letterSpacing: '-0.02em', lineHeight: '1.1', color: 'var(--text-primary)', margin: '0 0 0.75rem 0' }}>
              {product.name}
            </h1>
            <p className="pdp-subtitle" style={{ fontSize: '1rem', color: 'var(--text-primary)', opacity: 0.7, marginBottom: '2rem', fontWeight: '400', lineHeight: '1.4' }}>
              {product.subtitle}
            </p>

            <div className="pdp-reviews-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', color: '#004A3A', gap: '2px' }}>
                {'★★★★★'.split('').map((star, i) => <span key={i} style={{ fontSize: '1.2rem' }}>{star}</span>)}
              </div>
              <span style={{ fontSize: '0.9rem', opacity: 0.6, fontWeight: '500' }}>(48 Verified Clinical Reviews)</span>
            </div>

            <p className="pdp-description" style={{ fontSize: '1.05rem', lineHeight: '1.6', opacity: 0.8, marginBottom: '3rem' }}>
              {product.description}
            </p>

            {/* Variant Flavors Selection */}
            {product.flavors && product.flavors.length > 0 && product.flavors[0] !== "Unflavored (Capsules)" && (
              <div className="pdp-variant-selector" style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', opacity: 0.6, fontWeight: '600' }}>Select Flavor</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                  {product.flavors.map(f => (
                    <button
                      key={f}
                      onClick={() => setFlavor(f)}
                      style={{
                        background: flavor === f ? 'var(--bg-primary)' : 'white',
                        color: 'var(--text-primary)',
                        border: flavor === f ? '2px solid var(--text-primary)' : '1px solid rgba(0,0,0,0.1)',
                        padding: '1rem',
                        fontSize: '0.9rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: flavor === f ? '600' : '400',
                        transition: 'all 0.2s ease',
                        boxShadow: flavor === f ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variant Sizes Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="pdp-variant-selector" style={{ marginBottom: '3rem' }}>
                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', opacity: 0.6, fontWeight: '600' }}>Select Supply Size</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      style={{
                        background: size === s ? 'var(--bg-primary)' : 'white',
                        color: 'var(--text-primary)',
                        border: size === s ? '2px solid var(--text-primary)' : '1px solid rgba(0,0,0,0.1)',
                        padding: '1rem',
                        fontSize: '0.9rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: size === s ? '600' : '400',
                        transition: 'all 0.2s ease',
                        boxShadow: size === s ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase Options Container (One-time vs Subscribe & Save) */}
            <div className="pdp-purchase-options" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '3rem'
            }}>
              {/* Option 1: One time */}
              <div 
                onClick={() => setPurchaseOption("one-time")}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  border: purchaseOption === "one-time" ? '2px solid var(--text-primary)' : '1px solid rgba(0,0,0,0.1)',
                  background: purchaseOption === "one-time" ? 'rgba(0,0,0,0.02)' : 'white',
                  transition: 'all 0.2s ease',
                  boxShadow: purchaseOption === "one-time" ? '0 4px 20px rgba(0,0,0,0.04)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: purchaseOption === "one-time" ? '6px solid var(--text-primary)' : '2px solid rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border 0.2s'
                  }} />
                  <span style={{ fontSize: '0.95rem', fontWeight: purchaseOption === "one-time" ? '600' : '400' }}>One-time purchase</span>
                </div>
                <strong style={{ fontSize: '1rem' }}>€{product.price.toFixed(2)}</strong>
              </div>

              {/* Option 2: Subscribe & Save */}
              <div 
                onClick={() => setPurchaseOption("subscribe")}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  border: purchaseOption === "subscribe" ? '2px solid var(--text-primary)' : '1px solid rgba(0,0,0,0.1)',
                  background: purchaseOption === "subscribe" ? 'rgba(0,0,0,0.02)' : 'white',
                  transition: 'all 0.2s ease',
                  boxShadow: purchaseOption === "subscribe" ? '0 4px 20px rgba(0,0,0,0.04)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: purchaseOption === "subscribe" ? '6px solid var(--text-primary)' : '2px solid rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border 0.2s'
                  }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: purchaseOption === "subscribe" ? '600' : '400' }}>Subscribe & Save 20%</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: '500', opacity: purchaseOption === "subscribe" ? 1 : 0.6, marginTop: '0.25rem' }}>Auto-delivers every 30 days. Cancel anytime.</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <strong style={{ fontSize: '1rem', color: 'var(--accent-primary)' }}>€{(product.price * 0.8).toFixed(2)}</strong>
                  <span style={{ fontSize: '0.8rem', textDecoration: 'line-through', opacity: 0.4 }}>€{product.price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons Grid */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
              <div className="qty-selector" style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '16px',
                padding: '0.5rem',
                backgroundColor: 'white'
              }}>
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '1.2rem', color: 'var(--text-primary)', opacity: 0.6 }}
                >
                  -
                </button>
                <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: '600', fontSize: '1rem' }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '1.2rem', color: 'var(--text-primary)', opacity: 0.6 }}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                style={{
                  flexGrow: 1,
                  borderRadius: '16px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  backgroundColor: 'var(--text-primary)',
                  boxShadow: '0 8px 30px rgba(0,74,58,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  color: 'white',
                  padding: '1.25rem'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,74,58,0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,74,58,0.2)'; }}
              >
                <ShoppingBag size={20} />
                <span>{product.stock === 0 ? 'Out of Stock' : purchaseOption === 'subscribe' ? 'Add Subscription' : 'Add to Cart'}</span>
              </button>

              <button 
                onClick={() => toggleWishlist(product.id)}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  background: isWishlisted ? '#FFF0F3' : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  color: isWishlisted ? '#E53B75' : 'var(--text-primary)'
                }}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={24} fill={isWishlisted ? '#E53B75' : 'none'} stroke={isWishlisted ? '#E53B75' : 'currentColor'} />
              </button>
            </div>

            {/* Added to Cart Feedback Banner */}
            {addedMessage && (
              <div style={{
                background: '#E2ECE6',
                color: '#004A3A',
                border: '1px solid #BFE0CD',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                animation: 'fadeUp 0.3s ease'
              }}>
                <Check size={18} />
                <span>Formulation added to your cart successfully.</span>
              </div>
            )}

            {/* Shipping / Trust Points Accordion Panel */}
            <div className="pdp-trust-accordions" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <ShieldCheck size={24} strokeWidth={1.5} color="#004A3A" style={{ flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)' }}>Third-Party Lab Verified</span>
                  <span style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: '1.4' }}>Rigorously tested for absolute purity and exact molecular composition.</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <RotateCcw size={24} strokeWidth={1.5} color="#004A3A" style={{ flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)' }}>30-Day Clinical Guarantee</span>
                  <span style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: '1.4' }}>Experience the physiological benefits or receive a full refund on initial purchases.</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <AlertCircle size={24} strokeWidth={1.5} color="#004A3A" style={{ flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)' }}>EU Regulatory Compliant</span>
                  <span style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: '1.4' }}>Meets and exceeds all stringent European Food Safety Authority standards.</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Science & Studies Detail Tabs section */}
        <section className="pdp-tabs-section" style={{ marginTop: '8rem', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div className="pdp-tabs-headers" style={{ display: 'flex', gap: '3rem', borderBottom: '1px solid rgba(0,0,0,0.08)', marginBottom: '4rem' }}>
            {['benefits', 'ingredients', 'studies'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  paddingBottom: '1.25rem',
                  borderBottom: activeTab === tab ? '2px solid var(--text-primary)' : '2px solid transparent',
                  cursor: 'pointer',
                  color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-primary)',
                  opacity: activeTab === tab ? 1 : 0.4,
                  letterSpacing: '0.05em',
                  transition: 'all 0.3s ease',
                  marginBottom: '-1px'
                }}
              >
                {tab === 'benefits' ? 'Benefits & Use' : tab === 'ingredients' ? 'Active Ingredients' : 'Clinical Studies'}
              </button>
            ))}
          </div>

          <div className="pdp-tabs-content" style={{ fontSize: '1.05rem', lineHeight: '1.8', opacity: 0.85, maxWidth: '900px' }}>
            {activeTab === 'benefits' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-primary)', fontWeight: '500', letterSpacing: '-0.01em' }}>Key Clinical Benefits</h4>
                  <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <li>Optimizes daily physiological pathways specific to targeted range.</li>
                    <li>Highly bioavailable chelates ensure smooth gastric pass and direct absorption.</li>
                    <li>100% trace mineral integration supports enzyme creation.</li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-primary)', fontWeight: '500', letterSpacing: '-0.01em' }}>Recommended Intake</h4>
                  <p style={{ margin: 0 }}>{product.servingSize}. Simply mix with cold water or incorporate into your nutrition shakes. Consume once daily or as recommended by your physician.</p>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div style={{ maxWidth: '700px' }}>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-primary)', fontWeight: '500', letterSpacing: '-0.01em' }}>Standardized Formulations Compounds</h4>
                <p style={{ marginBottom: '2rem', fontSize: '1.05rem' }}>Each serving contains: <strong style={{ color: 'var(--text-primary)' }}>{product.ingredients}</strong>.</p>
                <p>We source only standardized botanical extracts and pharmaceutical-grade vitamins. This guarantees that every single batch contains exactly the active milligram dosage shown on the label, avoiding seasonal potency swings.</p>
              </div>
            )}

            {activeTab === 'studies' && (
              <div style={{ maxWidth: '800px' }}>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-primary)', fontWeight: '500', letterSpacing: '-0.01em' }}>Clinical Trials Overview</h4>
                <p style={{ marginBottom: '2rem' }}>Form6 ingredients are integrated at clinical dosages backed by peer-reviewed double-blind trials:</p>
                <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '16px', borderLeft: '4px solid #004A3A' }}>
                  <p style={{ margin: 0, fontStyle: 'italic', fontSize: '1.05rem', lineHeight: '1.6' }}>
                    "Trial results indicated that utilizing KSM-66 standardized ashwagandha root extract at 600mg daily led to a 28% reduction in serum cortisol levels and significant sleep efficiency improvement within 8 weeks."<br/>
                    <strong style={{ display: 'block', marginTop: '1rem', fontSize: '0.9rem', fontStyle: 'normal' }}>— Journal of Clinical Psychopharmacology</strong>
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
};

export default ProductDetail;
