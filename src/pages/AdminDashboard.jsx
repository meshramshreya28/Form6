import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Shield, Plus, Minus, FileText, CheckCircle, Truck, Package, ShoppingCart, UserCheck, AlertCircle, Printer, X } from 'lucide-react';

const AdminDashboard = () => {
  const { user, products, orders, updateOrderStatus, adjustInventory, updateProductStock } = useContext(AppContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'inventory', 'analytics'
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  // Authorization guard
  if (!user || !user.loggedIn || user.role !== 'Administrator') {
    return (
      <main className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          background: 'white',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.01)'
        }}>
          <AlertCircle size={48} color="#C65F2B" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Unauthorized Access</h2>
          <p style={{ fontSize: '0.9rem', opacity: 0.75, marginBottom: '2rem', lineHeight: '1.5' }}>
            You do not have administrative permissions to view this panel. Please log in with an administrator account or toggle your role in the Account page.
          </p>
          <Link to="/account" className="btn btn-primary" style={{ display: 'inline-block', borderRadius: '999px' }}>
            Go to Account Portal
          </Link>
        </div>
      </main>
    );
  }

  // Analytics helper calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  
  // Calculate revenue from CORE vs PRIME ranges
  let coreRevenue = 0;
  let primeRevenue = 0;
  
  orders.forEach(o => {
    o.items.forEach(item => {
      // Find range by checking matching product in the catalog
      const catalogProd = products.find(p => p.id === item.id);
      if (catalogProd) {
        if (catalogProd.range === 'CORE') {
          coreRevenue += item.price * item.quantity;
        } else if (catalogProd.range === 'PRIME') {
          primeRevenue += item.price * item.quantity;
        }
      }
    });
  });

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <main className="admin-dashboard-page" style={{ paddingTop: 'calc(var(--header-height) + 3rem)', minHeight: '90vh', background: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Header Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
          <div>
            <span className="hero-eyebrow" style={{ color: '#004A3A', fontWeight: '700', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Shield size={12} />
              <span>Administrative Console</span>
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '500', letterSpacing: '-0.02em', margin: 0 }}>Form6 Hub</h1>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {['orders', 'inventory', 'analytics'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? 'var(--text-primary)' : 'white',
                  color: activeTab === tab ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  padding: '0.5rem 1.5rem',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Orders Manager */}
        {activeTab === 'orders' && (
          <div style={{
            background: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.01)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '1.5rem' }}>Active Customer Orders ({orders.length})</h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left', opacity: 0.6 }}>
                    <th style={{ padding: '0.75rem' }}>Order ID</th>
                    <th style={{ padding: '0.75rem' }}>Date</th>
                    <th style={{ padding: '0.75rem' }}>Customer</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Total Net</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>VAT Tax</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Total Paid</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center' }}>Tracking Status</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center' }}>Invoicing</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '1rem 0.75rem', fontWeight: '700' }}>{order.id}</td>
                      <td style={{ padding: '1rem 0.75rem' }}>{order.date}</td>
                      <td style={{ padding: '1rem 0.75rem' }}>
                        <div><strong>{order.customerName}</strong></div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{order.email}</div>
                      </td>
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>€{(order.subtotal - order.discount).toFixed(2)}</td>
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>€{order.tax.toFixed(2)}</td>
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'right', fontWeight: 'bold', color: '#004A3A' }}>€{order.total.toFixed(2)}</td>
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          style={{
                            padding: '0.35rem 0.75rem',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            borderRadius: '4px',
                            border: '1px solid var(--border-color)',
                            background: order.status === 'Delivered' ? '#E2ECE6' : order.status === 'Shipped' ? '#E3F2FD' : '#FFF9C4',
                            color: order.status === 'Delivered' ? '#004A3A' : order.status === 'Shipped' ? '#0D47A1' : '#F57F17',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                        <button
                          onClick={() => setSelectedInvoiceOrder(order)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#004A3A',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            textDecoration: 'underline',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}
                        >
                          <FileText size={14} />
                          <span>View Invoice</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Inventory Editor */}
        {activeTab === 'inventory' && (
          <div style={{
            background: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.01)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '1.5rem' }}>Fulfillment & Inventory Stock</h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left', opacity: 0.6 }}>
                    <th style={{ padding: '0.75rem' }}>SKU ID</th>
                    <th style={{ padding: '0.75rem' }}>Product Name</th>
                    <th style={{ padding: '0.75rem' }}>Range</th>
                    <th style={{ padding: '0.75rem' }}>Format</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Price</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center' }}>Stock Level</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center' }}>Adjust Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(prod => (
                    <tr key={prod.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '1rem 0.75rem', fontWeight: '700' }}>F6-P00{prod.id}</td>
                      <td style={{ padding: '1rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '6px',
                          backgroundColor: prod.bgColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <img src={prod.image} alt={prod.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                        </div>
                        <div>
                          <strong>{prod.name}</strong>
                          <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{prod.subtitle}</div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 0.75rem' }}>
                        <span style={{
                          fontSize: '0.65rem',
                          fontWeight: '700',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          backgroundColor: prod.range === 'CORE' ? 'var(--text-primary)' : 'rgba(0,0,0,0.05)',
                          color: prod.range === 'CORE' ? 'white' : 'var(--text-primary)'
                        }}>
                          {prod.range}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 0.75rem' }}>{prod.format}</td>
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>€{prod.price.toFixed(2)}</td>
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                        <span style={{
                          fontWeight: 'bold',
                          color: prod.stock === 0 ? 'red' : prod.stock < 30 ? '#C65F2B' : 'inherit'
                        }}>
                          {prod.stock} units
                        </span>
                        {prod.stock === 0 && <span style={{ fontSize: '0.65rem', color: 'red', display: 'block', fontWeight: 'bold' }}>[OUT OF STOCK]</span>}
                      </td>
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <button 
                            onClick={() => adjustInventory(prod.id, -10)} 
                            style={{ width: '28px', height: '28px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                            title="Subtract 10"
                          >
                            -10
                          </button>
                          <button 
                            onClick={() => adjustInventory(prod.id, -1)} 
                            style={{ width: '28px', height: '28px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                            title="Subtract 1"
                          >
                            -1
                          </button>
                          <button 
                            onClick={() => adjustInventory(prod.id, 1)} 
                            style={{ width: '28px', height: '28px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                            title="Add 1"
                          >
                            +1
                          </button>
                          <button 
                            onClick={() => adjustInventory(prod.id, 10)} 
                            style={{ width: '28px', height: '28px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                            title="Add 10"
                          >
                            +10
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Sales Analytics */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'grid', gap: '2.5rem' }}>
            {/* Metric widgets grid */}
            <div className="mobile-stack-xs" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
              <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>Total Revenue</span>
                <h3 style={{ fontSize: '2.25rem', fontWeight: '700', color: '#004A3A', margin: '0.5rem 0' }}>€{totalRevenue.toFixed(2)}</h3>
                <span style={{ fontSize: '0.7rem', color: '#004A3A', fontWeight: '600' }}>✓ VAT Tax Included</span>
              </div>
              
              <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>Orders Handled</span>
                <h3 style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0.5rem 0' }}>{totalOrders}</h3>
                <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>100% Checkout Success Rate</span>
              </div>

              <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>CORE Range Sales</span>
                <h3 style={{ fontSize: '2.25rem', fontWeight: '700', color: '#004A3A', margin: '0.5rem 0' }}>€{coreRevenue.toFixed(2)}</h3>
                <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Athletic Formulations</span>
              </div>

              <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>PRIME Range Sales</span>
                <h3 style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0.5rem 0' }}>€{primeRevenue.toFixed(2)}</h3>
                <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Daily Wellness & Longevity</span>
              </div>
            </div>

            {/* Sales Chart SVG */}
            <div style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.01)'
            }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '600', marginBottom: '2rem' }}>Weekly Sales Volume (Simulated Analytics)</h3>
              
              <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '2rem', padding: '0 1rem 1rem 1rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', height: '40px', backgroundColor: '#004A3A', opacity: 0.8, borderRadius: '4px 4px 0 0' }} />
                  <span style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>Week 21</span>
                </div>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', height: '80px', backgroundColor: '#004A3A', opacity: 0.8, borderRadius: '4px 4px 0 0' }} />
                  <span style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>Week 22</span>
                </div>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', height: '110px', backgroundColor: '#004A3A', opacity: 0.8, borderRadius: '4px 4px 0 0' }} />
                  <span style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>Week 23</span>
                </div>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', height: '150px', backgroundColor: '#004A3A', opacity: 1, borderRadius: '4px 4px 0 0' }} />
                  <span style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>Week 24 (Current)</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Invoice Viewer Modal */}
      {selectedInvoiceOrder && (
        <div className="cart-drawer-overlay" style={{ zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="cart-drawer-backdrop" onClick={() => setSelectedInvoiceOrder(null)} />
          <div className="invoice-modal-content" style={{
            background: 'white',
            width: '90%',
            maxWidth: '750px',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '16px',
            padding: '3rem',
            position: 'relative',
            zIndex: 1000,
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
          }}>
            <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
              <button 
                onClick={handlePrintInvoice}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--text-primary)',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <Printer size={16} />
                <span>Print Invoice</span>
              </button>
              <button 
                onClick={() => setSelectedInvoiceOrder(null)}
                style={{
                  background: 'none',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>

            {/* Printable Area */}
            <div id="print-invoice-area" style={{ color: '#2c2f1f', fontFamily: 'monospace, sans-serif' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #2c2f1f', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', letterSpacing: '0.05em' }}>FORM6 NUTRACEUTICALS</h2>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', opacity: 0.8 }}>
                    Form6 Europe GmbH<br />
                    Müllerstraße 42, 80469 Munich, Germany<br />
                    VAT Reg: DE 987 654 321 | Reg Court: Munich HRB 998877
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '900' }}>TAX INVOICE</h3>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem' }}>
                    Invoice No: <strong>INV-{selectedInvoiceOrder.id}</strong><br />
                    Date: {selectedInvoiceOrder.date}<br />
                    Customer ID: F6-C-98774
                  </p>
                </div>
              </div>

              <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem', fontSize: '0.8rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', textTransform: 'uppercase', borderBottom: '1px solid #eaeaea', paddingBottom: '0.25rem' }}>Billing / Delivery Address</h4>
                  <strong>{selectedInvoiceOrder.customerName}</strong><br />
                  {selectedInvoiceOrder.address.street}<br />
                  {selectedInvoiceOrder.address.zip} {selectedInvoiceOrder.address.city}<br />
                  {selectedInvoiceOrder.address.country}<br />
                  Tel: {selectedInvoiceOrder.address.phone}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', textTransform: 'uppercase', borderBottom: '1px solid #eaeaea', paddingBottom: '0.25rem' }}>Courier Reference</h4>
                  Courier Partner: DHL Express International<br />
                  Waybill Tracking No: {selectedInvoiceOrder.trackingNo}<br />
                  VAT Origin: EU Cross-Border VAT (Dynamic Calculation)
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', marginBottom: '2.5rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #2c2f1f', textAlign: 'left', fontWeight: 'bold' }}>
                    <th style={{ padding: '0.5rem 0' }}>Item Description</th>
                    <th style={{ padding: '0.5rem 0', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '0.5rem 0', textAlign: 'right' }}>Unit Price</th>
                    <th style={{ padding: '0.5rem 0', textAlign: 'right' }}>Net Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoiceOrder.items.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.75rem 0' }}>
                        <strong>{item.name}</strong><br />
                        <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>Flavor: {item.flavor || 'Neutral'} | Format: {item.size || 'Standard'}</span>
                      </td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'center' }}>{item.quantity}</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>€{item.price.toFixed(2)}</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>€{(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.8rem' }}>
                <div style={{ width: '250px' }}>
                  <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '0.35rem 0' }}>
                    <span>Net Subtotal</span>
                    <span>€{(selectedInvoiceOrder.subtotal - (selectedInvoiceOrder.discount || 0)).toFixed(2)}</span>
                  </div>
                  {selectedInvoiceOrder.discount > 0 && (
                    <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '0.35rem 0', color: 'green' }}>
                      <span>Discount (Promo)</span>
                      <span>-€{selectedInvoiceOrder.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '0.35rem 0' }}>
                    <span>Shipping Rate</span>
                    <span>€{selectedInvoiceOrder.shipping.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid #eee' }}>
                    <span>Calculated Tax</span>
                    <span>€{selectedInvoiceOrder.tax.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '900', borderBottom: '3px double #2c2f1f', marginTop: '0.25rem' }}>
                    <span>Total Paid</span>
                    <span>€{selectedInvoiceOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', marginTop: '4rem', opacity: 0.7, textAlign: 'center', borderTop: '1px solid #eaeaea', paddingTop: '1.5rem' }}>
                Form6 European Administrative Invoice Document DE-HRB-998877. Printed under security session.
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default AdminDashboard;
