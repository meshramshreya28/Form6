import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogOut, Package, MapPin, KeyRound, ShieldAlert, Chrome, PlayCircle, Eye } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Account = () => {
  const { user, orders, logIn, logOut, updateUserRole, updateUserDetails } = useContext(AppContext);
  const navigate = useNavigate();

  // Login form inputs
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Address edit state
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [street, setStreet] = useState(user?.address?.street || '');
  const [city, setCity] = useState(user?.address?.city || '');
  const [zip, setZip] = useState(user?.address?.zip || '');
  const [country, setCountry] = useState(user?.address?.country || 'Germany');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (emailInput && passwordInput) {
      logIn(emailInput, passwordInput);
    }
  };

  const handleAddressSave = (e) => {
    e.preventDefault();
    updateUserDetails({
      address: {
        street,
        city,
        zip,
        country,
        phone: user.address?.phone || ''
      }
    });
    setIsEditingAddress(false);
  };

  const userOrders = orders.filter(o => o.email.toLowerCase() === (user?.email || '').toLowerCase());

  if (!user || !user.loggedIn) {
    return (
      <main className="account-login-page" style={{ paddingTop: 'calc(var(--header-height) + 4rem)', minHeight: '85vh', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '480px' }}>
          
          <div style={{
            background: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '3rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.02)'
          }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '500', textAlign: 'center', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
              {isRegistering ? 'Create Form6 Account' : 'Sign In'}
            </h2>
            <p style={{ fontSize: '0.85rem', opacity: 0.6, textAlign: 'center', marginBottom: '2rem' }}>
              {isRegistering ? 'Join for subscription controls and clinical tracking.' : 'Sign in to manage orders, subscriptions, and billing.'}
            </p>

            <form onSubmit={handleLoginSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
              {isRegistering && (
                <div className="form-group">
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>Full Name</label>
                  <input type="text" placeholder="Dr. Alexander Thorne" required style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                </div>
              )}
              <div className="form-group">
                <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>Email Address</label>
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="alex.thorne@clinic.org" 
                  required 
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>Password</label>
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••" 
                  required 
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: 'var(--text-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '999px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  boxShadow: '0 8px 24px rgba(44,47,31,0.1)'
                }}
              >
                {isRegistering ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            {/* Social Logins */}
            <div style={{ margin: '2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <div style={{ flexGrow: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
              <span style={{ fontSize: '0.7rem', opacity: 0.5, textTransform: 'uppercase', fontWeight: 'bold' }}>Or Sign In With</span>
              <div style={{ flexGrow: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button 
                onClick={() => logIn('google-user@domain.com', 'social')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem',
                  background: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}
              >
                <Chrome size={14} />
                <span>Google</span>
              </button>
              <button 
                onClick={() => logIn('apple-user@domain.com', 'social')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem',
                  background: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}
              >
                <KeyRound size={14} />
                <span>Apple ID</span>
              </button>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem' }}>
              {isRegistering ? (
                <span>Already have an account? <button onClick={() => setIsRegistering(false)} style={{ background: 'none', border: 'none', textDecoration: 'underline', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 'bold' }}>Sign In</button></span>
              ) : (
                <span>New to Form6? <button onClick={() => setIsRegistering(true)} style={{ background: 'none', border: 'none', textDecoration: 'underline', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 'bold' }}>Create Account</button></span>
              )}
            </div>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="account-dashboard-page" style={{ paddingTop: 'calc(var(--header-height) + 3rem)', minHeight: '90vh', background: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Dashboard Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <span className="hero-eyebrow" style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>Clinical Profile portal</span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '500', letterSpacing: '-0.02em', margin: 0 }}>Welcome, {user.name}</h1>
            <p style={{ opacity: 0.6, fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>Role Profile: <strong>{user.role}</strong> | Connected: <strong>{user.email}</strong></p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            {user.role === 'Administrator' ? (
              <Link to="/admin" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '999px', fontSize: '0.8rem', padding: '0.6rem 1.5rem' }}>
                <ShieldAlert size={14} />
                <span>Go to Admin Panel</span>
              </Link>
            ) : (
              <button 
                onClick={() => {
                  updateUserRole('Administrator');
                  alert('Administrator role activated. You can now access the Admin Dashboard.');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'white',
                  border: '1px solid var(--border-color)',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <ShieldAlert size={14} />
                <span>Switch to Admin Role</span>
              </button>
            )}
            
            <button 
              onClick={logOut}
              className="btn btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid var(--border-color)',
                borderRadius: '999px',
                fontSize: '0.8rem',
                padding: '0.6rem 1.5rem',
                cursor: 'pointer'
              }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid split */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.8fr 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          
          {/* Left Side: Order Log */}
          <div>
            <div style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.01)'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Package size={18} color="#004A3A" />
                <span>Your Order Logs ({userOrders.length})</span>
              </h3>

              {userOrders.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', opacity: 0.5 }}>
                  <Package size={36} style={{ marginBottom: '0.5rem' }} />
                  <p>You have not placed any orders yet.</p>
                  <Link to="/shop" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.8rem' }}>Order Now</Link>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {userOrders.map(order => (
                    <div 
                      key={order.id}
                      style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <strong style={{ fontSize: '0.9rem' }}>Order ID: {order.id}</strong>
                          <span style={{
                            fontSize: '0.65rem',
                            fontWeight: '700',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            background: order.status === 'Delivered' ? '#E2ECE6' : '#FFE4E1',
                            color: order.status === 'Delivered' ? '#004A3A' : '#C65F2B'
                          }}>
                            {order.status}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.75rem', opacity: 0.6, margin: '0.25rem 0' }}>Date: {order.date} | Total Paid: €{order.total.toFixed(2)}</p>
                        <p style={{ fontSize: '0.75rem', opacity: 0.8, margin: 0 }}>Items count: {order.items.reduce((s,i)=>s+i.quantity,0)} pack(s)</p>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link 
                          to={`/order-tracking/${order.id}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: 'var(--text-primary)',
                            color: 'white',
                            textDecoration: 'none',
                            padding: '0.45rem 1rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}
                        >
                          <Eye size={12} />
                          <span>Track Order</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Saved Addresses info */}
          <div>
            <div style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.01)'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} color="#004A3A" />
                <span>Primary Address Details</span>
              </h3>

              {!isEditingAddress ? (
                <div>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: '0 0 1.5rem 0' }}>
                    <strong>Street:</strong> {user.address?.street || 'Not set'}<br />
                    <strong>City:</strong> {user.address?.city || 'Not set'}<br />
                    <strong>ZIP Code:</strong> {user.address?.zip || 'Not set'}<br />
                    <strong>Country:</strong> {user.address?.country || 'Not set'}
                  </p>
                  
                  <button 
                    onClick={() => setIsEditingAddress(true)}
                    style={{
                      background: 'none',
                      border: '1px solid var(--text-primary)',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Edit Details
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAddressSave} style={{ display: 'grid', gap: '1rem' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>Street</label>
                    <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px' }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>City</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px' }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>ZIP Code</label>
                    <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} required style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px' }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>Country</label>
                    <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'white' }}>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Spain">Spain</option>
                      <option value="Italy">Italy</option>
                    </select>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button type="submit" style={{ flexGrow: 1, background: 'var(--text-primary)', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem' }}>Save</button>
                    <button type="button" onClick={() => setIsEditingAddress(false)} style={{ flexGrow: 1, background: 'white', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem' }}>Cancel</button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
};

export default Account;
