import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Truck, FileText, ArrowLeft, Download, ShieldCheck, MapPin, Printer } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const OrderTracking = () => {
  const { orderId } = useParams();
  const { orders } = useContext(AppContext);
  const [truckProgress, setTruckProgress] = useState(15); // Percentage progress of the truck on the map
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  const order = orders.find(o => o.id === orderId);

  // Animate the truck on the simulated map path
  useEffect(() => {
    if (!order) return;
    
    // Customize target progress based on order status
    let target = 20;
    if (order.status === 'Shipped') target = 55;
    if (order.status === 'Out for Delivery') target = 85;
    if (order.status === 'Delivered') target = 100;

    const interval = setInterval(() => {
      setTruckProgress(prev => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [order]);

  if (!order) {
    return (
      <div className="container text-center" style={{ padding: '8rem 2rem' }}>
        <h2>Order not found.</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Back to Shop</Link>
      </div>
    );
  }

  // Map coordinate helpers based on progress percentage
  // Fulfillment center coordinate: (70, 150) -> Munich, Germany
  // Destination coordinate: (380, 70) -> Paris, France (or elsewhere)
  const fcX = 70;
  const fcY = 150;
  const destX = 380;
  const destY = 70;
  
  // Calculate truck current positions along a smooth Bezier curve route
  const t = truckProgress / 100;
  // Control point for Bezier curve route
  const ctrlX = 220;
  const ctrlY = 40;
  
  const truckX = (1 - t) * (1 - t) * fcX + 2 * (1 - t) * t * ctrlX + t * t * destX;
  const truckY = (1 - t) * (1 - t) * fcY + 2 * (1 - t) * t * ctrlY + t * t * destY;

  const statuses = [
    { title: 'Order Confirmed', description: 'Payment authorized & verified', date: order.date, active: true },
    { title: 'Processing', description: 'Standardized formulations packaged', date: order.date, active: order.status !== 'Pending' },
    { title: 'Shipped', description: 'Handed over to standard international courier', date: order.date, active: ['Shipped', 'Out for Delivery', 'Delivered'].includes(order.status) },
    { title: 'Out for Delivery', description: 'Local courier dispatching to address', date: order.date, active: ['Out for Delivery', 'Delivered'].includes(order.status) },
    { title: 'Delivered', description: 'Signed and completed at destination', date: order.date, active: order.status === 'Delivered' }
  ];

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <main className="tracking-page" style={{ paddingTop: 'calc(var(--header-height) + 2rem)', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Navigation back */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Link to="/shop" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontWeight: '600',
            fontSize: '0.8rem',
            textTransform: 'uppercase'
          }}>
            <ArrowLeft size={16} />
            <span>Continue Shopping</span>
          </Link>

          <button 
            onClick={() => setInvoiceOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'white',
              border: '1px solid var(--border-color)',
              padding: '0.5rem 1.25rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            <FileText size={16} />
            <span>View EU Tax Invoice</span>
          </button>
        </div>

        {/* Order Success Header Card */}
        <div style={{
          background: 'white',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '2.5rem',
          marginBottom: '3rem',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.01)'
        }}>
          <CheckCircle2 size={48} color="#004A3A" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: '500', marginBottom: '0.5rem' }}>Order successfully authorized!</h2>
          <p style={{ opacity: 0.7, margin: 0, fontSize: '0.95rem' }}>
            Thank you for choosing Form6. Your order ID is <strong>{order.id}</strong>. A confirmation email with invoice details has been sent to <strong>{order.email}</strong>.
          </p>
        </div>

        {/* Tracking Details Grid */}
        <div className="tablet-stack" style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          
          {/* Left Block: Interactive Map & Courier Data */}
          <div>
            {/* Interactive SVG Courier Map */}
            <div style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.01)'
            }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={18} color="#004A3A" />
                <span>Live Courier Progress Map</span>
              </h3>

              <div style={{ position: 'relative', width: '100%', height: '220px', background: '#f5f7f6', borderRadius: '12px', border: '1px solid #eef1ef', overflow: 'hidden' }}>
                <svg viewBox="0 0 450 220" style={{ width: '100%', height: '100%' }}>
                  {/* Map grid lines (simulated map detail) */}
                  <path d="M 0 50 Q 150 120 300 50 T 450 180" fill="none" stroke="rgba(0,0,0,0.02)" strokeWidth="15" strokeLinecap="round" />
                  <path d="M 120 0 Q 80 100 240 180 T 380 220" fill="none" stroke="rgba(0,0,0,0.02)" strokeWidth="20" strokeLinecap="round" />
                  
                  {/* Route path */}
                  <path
                    d={`M ${fcX} ${fcY} Q ${ctrlX} ${ctrlY} ${destX} ${destY}`}
                    fill="none"
                    stroke="#004A3A"
                    strokeWidth="3"
                    strokeDasharray="6 6"
                    opacity="0.3"
                  />
                  
                  {/* Travelled Route */}
                  {truckProgress > 0 && (
                    <path
                      d={`M ${fcX} ${fcY} Q ${ctrlX} ${ctrlY} ${truckX} ${truckY}`}
                      fill="none"
                      stroke="#004A3A"
                      strokeWidth="3.5"
                    />
                  )}

                  {/* Munich Fulfillment Center Pin */}
                  <circle cx={fcX} cy={fcY} r="8" fill="#004A3A" stroke="white" strokeWidth="2" />
                  <text x={fcX - 10} y={fcY + 22} fontSize="9" fontWeight="bold" fill="var(--text-primary)">Form6 Munich FC</text>

                  {/* Shipping Destination Pin */}
                  <circle cx={destX} cy={destY} r="8" fill="#C65F2B" stroke="white" strokeWidth="2" />
                  <text x={destX - 35} y={destY - 14} fontSize="9" fontWeight="bold" fill="var(--text-primary)">{order.address.city || 'Destination'}</text>

                  {/* Animated Moving Truck */}
                  {truckProgress < 100 ? (
                    <g transform={`translate(${truckX - 12}, ${truckY - 12})`}>
                      <circle cx="12" cy="12" r="12" fill="white" stroke="#004A3A" strokeWidth="2" />
                      <g transform="translate(4,4)">
                        <Truck size={15} color="#004A3A" strokeWidth={2} />
                      </g>
                    </g>
                  ) : (
                    <g transform={`translate(${destX - 15}, ${destY - 35})`}>
                      <rect x="0" y="0" width="30" height="20" rx="4" fill="#004A3A" stroke="white" strokeWidth="1" />
                      <text x="5" y="13" fontSize="8" fontWeight="bold" fill="white">ARR</text>
                    </g>
                  )}
                </svg>

                {/* Tracking Code Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(255,255,255,0.9)',
                  border: '1px solid var(--border-color)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  Courier Code: {order.trackingNo}
                </div>
              </div>
            </div>

            {/* Invoicing info warning banner */}
            <div style={{
              background: '#white',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '1.25rem 1.5rem',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              opacity: 0.8
            }}>
              <ShieldCheck size={20} color="#004A3A" />
              <span>EU VAT registered invoice generated automatically. Legally valid in compliance with GDPR guidelines.</span>
            </div>
          </div>

          {/* Right Block: Status Timeline */}
          <div style={{
            background: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.01)'
          }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '600', marginBottom: '2rem' }}>Tracking Timeline</h3>
            
            <div style={{ display: 'grid', gap: '1.75rem', position: 'relative', paddingLeft: '1.5rem' }}>
              {/* Vertical connecting line */}
              <div style={{
                position: 'absolute',
                top: '8px',
                bottom: '8px',
                left: '4px',
                width: '2px',
                background: '#eaeaea'
              }} />

              {statuses.map((status, index) => (
                <div key={index} style={{ position: 'relative', opacity: status.active ? 1 : 0.4 }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute',
                    top: '4px',
                    left: '-20px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: status.active ? '#004A3A' : '#bbb',
                    border: '2px solid white',
                    boxShadow: '0 0 0 2px ' + (status.active ? '#004A3A' : '#ddd')
                  }} />

                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>{status.title}</h4>
                  <p style={{ fontSize: '0.75rem', opacity: 0.8, margin: '0.2rem 0 0.1rem 0' }}>{status.description}</p>
                  {status.active && <span style={{ fontSize: '0.65rem', opacity: 0.5 }}>{status.date}</span>}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Tax Invoice Modal Overlay */}
      {invoiceOpen && (
        <div className="cart-drawer-overlay" style={{ zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="cart-drawer-backdrop" onClick={() => setInvoiceOpen(false)} />
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
            {/* Modal Controls */}
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
                onClick={() => setInvoiceOpen(false)}
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

            {/* HTML Invoice Body */}
            <div id="print-invoice-area" style={{ color: '#2c2f1f', fontFamily: 'monospace, sans-serif' }}>
              
              {/* Invoice Header */}
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
                    Invoice No: <strong>INV-{order.id}</strong><br />
                    Date: {order.date}<br />
                    Customer ID: F6-C-98774
                  </p>
                </div>
              </div>

              {/* Billing and Shipping details */}
              <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem', fontSize: '0.8rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', textTransform: 'uppercase', borderBottom: '1px solid #eaeaea', paddingBottom: '0.25rem' }}>Billing / Delivery Address</h4>
                  <strong>{order.customerName}</strong><br />
                  {order.address.street}<br />
                  {order.address.zip} {order.address.city}<br />
                  {order.address.country}<br />
                  Tel: {order.address.phone}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', textTransform: 'uppercase', borderBottom: '1px solid #eaeaea', paddingBottom: '0.25rem' }}>Courier Reference</h4>
                  Courier Partner: DHL Express International<br />
                  Waybill Tracking No: {order.trackingNo}<br />
                  VAT Origin: EU Cross-Border VAT (Dynamic Calculation)
                </div>
              </div>

              {/* Items Table */}
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
                  {order.items.map((item, idx) => (
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

              {/* Subtotals & Taxes calculation */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.8rem' }}>
                <div style={{ width: '250px' }}>
                  <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '0.35rem 0' }}>
                    <span>Net Subtotal</span>
                    <span>€{(order.subtotal - (order.discount || 0)).toFixed(2)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '0.35rem 0', color: 'green' }}>
                      <span>Discount (Promo)</span>
                      <span>-€{order.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '0.35rem 0' }}>
                    <span>Shipping Rate</span>
                    <span>€{order.shipping.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid #eee' }}>
                    <span>Calculated Tax</span>
                    <span>€{order.tax.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '900', borderBottom: '3px double #2c2f1f', marginTop: '0.25rem' }}>
                    <span>Total Paid</span>
                    <span>€{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', marginTop: '4rem', opacity: 0.7, textAlign: 'center', borderTop: '1px solid #eaeaea', paddingTop: '1.5rem' }}>
                Thank you for your order. If you have any inquiries regarding this document, please contact Form6 billing support at billing@form6health.eu
              </div>

            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default OrderTracking;
