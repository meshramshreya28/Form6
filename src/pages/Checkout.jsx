import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, CreditCard, Tag, Landmark, ShieldCheck, HelpCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { supabase } from '../supabaseClient';

const Checkout = () => {
  const { cart, activeCoupon, couponError, applyCoupon, removeCoupon, placeOrder } = useContext(AppContext);
  const navigate = useNavigate();

  // Address form fields
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('Germany');
  const [phone, setPhone] = useState('');
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('stripe'); // 'stripe' or 'razorpay'
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculations
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(4.95);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // VAT rates mapping
  const vatRates = {
    'Germany': 0.19,
    'France': 0.20,
    'Ireland': 0.23,
    'Spain': 0.21,
    'Italy': 0.22,
    'India': 0.18 // Placeholder/pre-launch
  };

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/shop');
    }
  }, [cart, navigate]);

  // Recalculate totals dynamically
  useEffect(() => {
    const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const discountPct = activeCoupon ? activeCoupon.discount : 0;
    const discountedSubtotal = cartSubtotal * (1 - discountPct);
    
    // Shipping rules: Free shipping threshold at €50
    const calculatedShipping = discountedSubtotal >= 50 ? 0.00 : 4.95;
    
    // Tax: Automated tax calculation (Must handle EU VAT)
    const rate = vatRates[country] || 0.20; // default 20%
    const calculatedTax = discountedSubtotal * rate;
    
    const calculatedTotal = discountedSubtotal + calculatedShipping + calculatedTax;

    setSubtotal(cartSubtotal);
    setShipping(calculatedShipping);
    setTax(calculatedTax);
    setTotal(calculatedTotal);
  }, [cart, country, activeCoupon]);

  const handleCouponApply = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !street || !city || !zip || !phone) {
      alert("Please complete all shipping address fields.");
      return;
    }

    if (paymentMethod === 'stripe' && (!cardNumber || !cardExpiry || !cardCvv)) {
      alert("Please enter card details for payment.");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Insert order into Supabase
      const { data: orderResponse, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_email: email,
          subtotal: subtotal,
          tax: tax,
          total: total,
          status: 'pending',
          coupon: activeCoupon ? activeCoupon.code : null
        }])
        .select();

      if (orderError) throw orderError;
      
      const newOrderId = orderResponse[0].id;

      // 2. Insert order items into Supabase
      const orderItemsToInsert = cart.map(item => ({
        order_id: newOrderId,
        product_id: item.product.id.toString(),
        product_name: item.product.name,
        flavor: item.flavor || null,
        quantity: item.quantity,
        unit_price: item.product.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsToInsert);

      if (itemsError) throw itemsError;

      // 3. Keep local context updated
      const orderData = {
        id: newOrderId,
        name: `${firstName} ${lastName}`,
        email,
        subtotal,
        shipping,
        tax,
        total,
        discount: activeCoupon ? subtotal * activeCoupon.discount : 0,
        address: {
          street,
          city,
          zip,
          country,
          phone
        }
      };

      placeOrder(orderData); // Still using context for local state
      
      setIsProcessing(false);
      navigate(`/order-tracking/${newOrderId}`);
      
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to place order: ' + (error.message || JSON.stringify(error)));
      setIsProcessing(false);
    }
  };

  const discountAmount = activeCoupon ? subtotal * activeCoupon.discount : 0;
  const discountedSubtotal = subtotal - discountAmount;

  return (
    <main className="checkout-page" style={{ paddingTop: 'calc(var(--header-height) + 2rem)', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        <h1 style={{ fontSize: '2.25rem', fontWeight: '500', marginBottom: '2.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Secure Checkout
        </h1>

        <div className="checkout-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '4rem',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Form Info */}
          <form onSubmit={handlePlaceOrder} className="checkout-left-form">
            
            {/* Contact Information */}
            <div className="checkout-section-card" style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '1.25rem' }}>Contact Information</h3>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="checkout-section-card" style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '1.25rem' }}>Shipping Address</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>First Name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John" 
                    required 
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>Last Name</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe" 
                    required 
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>Street Address</label>
                <input 
                  type="text" 
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="123 Science Way" 
                  required 
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>City</label>
                  <input 
                    type="text" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Berlin" 
                    required 
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>Zip / Postal Code</label>
                  <input 
                    type="text" 
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="10115" 
                    required 
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>Country (EU VAT Rules)</label>
                  <select 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'white' }}
                  >
                    <option value="Germany">Germany (19% VAT)</option>
                    <option value="France">France (20% VAT)</option>
                    <option value="Ireland">Ireland (23% VAT)</option>
                    <option value="Spain">Spain (21% VAT)</option>
                    <option value="Italy">Italy (22% VAT)</option>
                    <option value="India">India (18% pre-launch placeholder)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>Phone Number</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+49 170 1234567" 
                    required 
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Gateways */}
            <div className="checkout-section-card" style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '1.25rem' }}>Payment Method</h3>
              
              <div className="payment-gateway-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('stripe')}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: paymentMethod === 'stripe' ? 'var(--text-primary)' : 'white',
                    color: paymentMethod === 'stripe' ? 'white' : 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem'
                  }}
                >
                  <CreditCard size={16} />
                  <span>Stripe (Credit Card)</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('razorpay')}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: paymentMethod === 'razorpay' ? 'var(--text-primary)' : 'white',
                    color: paymentMethod === 'razorpay' ? 'white' : 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    position: 'relative'
                  }}
                >
                  <Landmark size={16} />
                  <span>Razorpay / UPI</span>
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-4px',
                    fontSize: '0.55rem',
                    background: '#C65F2B',
                    color: 'white',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '4px',
                    fontWeight: '800'
                  }}>INDIA FUTURE</span>
                </button>
              </div>

              {paymentMethod === 'stripe' ? (
                <div style={{ display: 'grid', gap: '1rem', animation: 'fadeUp 0.2s ease' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>Card Number</label>
                    <input 
                      type="text" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4111 2222 3333 4444" 
                      style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>Expiry Date</label>
                      <input 
                        type="text" 
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM / YY" 
                        style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>CVV</label>
                      <input 
                        type="password" 
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••" 
                        maxLength={3}
                        style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: '1.5rem',
                  background: 'rgba(198,95,43,0.05)',
                  border: '1px dashed #C65F2B',
                  borderRadius: '10px',
                  textAlign: 'center',
                  animation: 'fadeUp 0.2s ease'
                }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#C65F2B', fontWeight: '600' }}>
                    Razorpay & UPI channels are configured and ready. They will be activated instantly upon Form6 India expansion. Please use Stripe Credit Card simulation for EU order processing today.
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: '1.25rem',
                backgroundColor: 'var(--text-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '999px',
                fontWeight: '700',
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem'
              }}
            >
              {isProcessing ? (
                <span>Authorizing Order Payment...</span>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Pay & Place Order (Total: €{total.toFixed(2)})</span>
                </>
              )}
            </button>
          </form>

          {/* Right Column: Order Summary & Coupons */}
          <div className="checkout-right-summary" style={{
            position: 'sticky',
            top: 'calc(var(--header-height) + 2rem)'
          }}>
            <div style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.01)'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>Order Summary</h3>

              {/* Items List */}
              <div className="checkout-summary-items" style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
                {cart.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '8px',
                      backgroundColor: item.product.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <img src={item.product.image} alt={item.product.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: '600', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.product.name}</h4>
                      <p style={{ fontSize: '0.7rem', opacity: 0.6, margin: 0 }}>Qty: {item.quantity} | {item.flavor || 'Standard'}</p>
                    </div>
                    <strong style={{ fontSize: '0.85rem' }}>€{(item.product.price * item.quantity).toFixed(2)}</strong>
                  </div>
                ))}
              </div>

              {/* Coupon input */}
              <form onSubmit={handleCouponApply} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                <input 
                  type="text" 
                  placeholder="Promo Code (WELCOME10, CORE20)" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    flexGrow: 1,
                    padding: '0.5rem 1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '0.8rem'
                  }}
                />
                <button type="submit" style={{
                  padding: '0.5rem 1.25rem',
                  background: 'var(--text-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}>
                  Apply
                </button>
              </form>

              {activeCoupon && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#E2ECE6',
                  color: '#004A3A',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  marginBottom: '2rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Tag size={12} />
                    <span>Coupon <strong>{activeCoupon.code}</strong> applied ({activeCoupon.discount * 100}% off)</span>
                  </div>
                  <button type="button" onClick={removeCoupon} style={{ background: 'none', border: 'none', color: '#004A3A', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                </div>
              )}

              {couponError && (
                <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '-1.5rem', marginBottom: '2rem' }}>{couponError}</p>
              )}

              {/* Calculations Block */}
              <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.85rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ opacity: 0.75 }}>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                {activeCoupon && (
                  <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', color: '#004A3A', fontWeight: '500' }}>
                    <span>Coupon Discount</span>
                    <span>-€{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ opacity: 0.75 }}>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `€${shipping.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ opacity: 0.75 }} className="tooltip-trigger">
                    EU VAT ({country === 'India' ? '18%' : `${(vatRates[country] || 0.20) * 100}%`})
                    <HelpCircle size={10} style={{ marginLeft: '4px', verticalAlign: 'middle', opacity: 0.5 }} />
                  </span>
                  <span>€{tax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '700', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                  <span>Total</span>
                  <span style={{ color: '#004A3A' }}>€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1.5rem',
              opacity: 0.6,
              fontSize: '0.75rem'
            }}>
              <ShieldCheck size={14} />
              <span>SSL Secure 256-bit Encrypted Transaction</span>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
};

export default Checkout;
