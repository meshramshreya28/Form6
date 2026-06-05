import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Shield, Eye, Scale, ShieldCheck, HelpCircle } from 'lucide-react';

const Legal = () => {
  const [searchParams] = useSearchParams();
  const doc = searchParams.get('doc') || 'privacy';
  const [activeDoc, setActiveDoc] = useState(doc);

  useEffect(() => {
    setActiveDoc(searchParams.get('doc') || 'privacy');
  }, [searchParams]);

  const docs = [
    { id: 'privacy', label: 'Privacy Policy', icon: <Eye size={16} /> },
    { id: 'terms', label: 'Terms of Service', icon: <Scale size={16} /> },
    { id: 'cookies', label: 'Cookie Policy', icon: <Shield size={16} /> },
    { id: 'shipping', label: 'Shipping & Returns', icon: <ShieldCheck size={16} /> }
  ];

  return (
    <main className="legal-page" style={{ paddingTop: 'calc(var(--header-height) + 2rem)', minHeight: '90vh', background: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '250px 1fr',
          gap: '3rem',
          alignItems: 'start',
          marginTop: '2rem'
        }}>
          
          {/* Side links */}
          <div style={{
            background: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '1.25rem'
          }}>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5, marginBottom: '1rem', paddingLeft: '0.5rem' }}>EU Legal Documents</h4>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {docs.map(d => (
                <Link
                  key={d.id}
                  to={`/legal?doc=${d.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    textDecoration: 'none',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    background: activeDoc === d.id ? 'var(--text-primary)' : 'transparent',
                    color: activeDoc === d.id ? 'white' : 'var(--text-primary)',
                    transition: 'all 0.2s'
                  }}
                >
                  {d.icon}
                  <span>{d.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Doc body */}
          <div style={{
            background: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '3rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.01)'
          }}>
            {activeDoc === 'privacy' && (
              <div style={{ fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.9 }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '500', marginBottom: '1.5rem' }}>Privacy Policy (EU GDPR Compliant)</h2>
                <p>Last updated: June 4, 2026</p>
                <p>
                  Form6 Europe GmbH ("we", "our") takes your privacy seriously. In compliance with the General Data Protection Regulation (GDPR) (EU) 2016/679, this document explains how we collect, process, and protect your personal data when you visit our website or make a purchase.
                </p>
                
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. Data Controller</h3>
                <p>
                  Form6 Europe GmbH, Müllerstraße 42, 80469 Munich, Germany.<br />
                  Email: privacy@form6health.eu
                </p>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Data We Collect</h3>
                <p>
                  We collect your email, full name, phone number, shipping address, and billing parameters exclusively to authorize transaction payments and dispatch standard international shipments. Credit card processing is handled securely under Stripe's PCI-DSS compliant gateways.
                </p>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem' }}>3. Your GDPR Rights</h3>
                <p>
                  You have the right to request access to, rectification of, or erasure of your personal data stored within our databases. To exercise your rights, please submit a request to privacy@form6health.eu.
                </p>
              </div>
            )}

            {activeDoc === 'terms' && (
              <div style={{ fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.9 }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '500', marginBottom: '1.5rem' }}>Terms of Service</h2>
                <p>Last updated: June 4, 2026</p>
                <p>
                  Welcome to the Form6 platform. By accessing or purchasing from our storefront, you agree to be bound by these Terms of Service.
                </p>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. Contractual Parties</h3>
                <p>
                  All transactions conducted through this store represent a legal contract with Form6 Europe GmbH, Munich, Germany.
                </p>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Intended Use & Disclaimer</h3>
                <p>
                  Our formulations are sold as dietary supplements. They are not intended to replace professional medical therapy or diagnose, treat, or cure any disease. Please review the clinical dosages and consult your physician before initiating supplementation.
                </p>
              </div>
            )}

            {activeDoc === 'cookies' && (
              <div style={{ fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.9 }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '500', marginBottom: '1.5rem' }}>Cookie Policy</h2>
                <p>Last updated: June 4, 2026</p>
                <p>
                  We utilize cookies to optimize shopping cart state storage, authorize active user profiles, and compile anonymous website analytics.
                </p>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. Essential Cookies</h3>
                <p>
                  These are required to store your active cart selection and allow billing checkouts. They cannot be deactivated.
                </p>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Analytical Cookies</h3>
                <p>
                  If you consent via our dynamic cookie consent banner, we compile anonymous traffic data using Google Analytics (GA4) placeholders.
                </p>
              </div>
            )}

            {activeDoc === 'shipping' && (
              <div style={{ fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.9 }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '500', marginBottom: '1.5rem' }}>Shipping & Returns Guidelines</h2>
                <p>Last updated: June 4, 2026</p>
                <p>
                  We ship directly to all EU member countries and Switzerland.
                </p>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. Delivery Times & Shipping Fee</h3>
                <p>
                  Orders are dispatched within 24 hours from our Munich fulfillment center. Standard shipping is €4.95. Shipping is free for orders over €50. Deliveries generally arrive within 3-5 business days.
                </p>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Returns & Refunds</h3>
                <p>
                  Under EU consumer protection regulations, you have a 14-day right of withdrawal. Unopened products returned in original packaging within 30 days are fully refundable. Return shipping fees are paid by the customer.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
};

export default Legal;
