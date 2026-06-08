import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Instagram } from 'lucide-react';
import { supabase } from '../supabaseClient';

const faqItems = [
  {
    question: "What is the difference between Form6 CORE and Form6 PRIME?",
    answer: "Form6 CORE is formulated specifically for athletes and high-intensity performance. It focuses on muscle recovery, glycogen restoration, and jitter-free athletic energy. Form6 PRIME is designed for daily clinical wellness, longevity, and metabolic support, targeting stress hormones, gut microbiome balance, and restful sleep."
  },
  {
    question: "Are Form6 formulations third-party tested?",
    answer: "Yes, every single batch of Form6 is tested by ISO-certified third-party laboratories. We verify the precise active compound dosages (e.g. mg of Ashwagandha or L-Theanine) and check for heavy metals, microbes, and pesticide residues before packaging."
  },
  {
    question: "How does the subscription work, and can I pause it?",
    answer: "Subscriptions offer a 20% discount and auto-deliver every 30 days. You can easily pause, skip a delivery, adjust dates, or cancel at any time directly through your account dashboard with no lock-in fees or penalties."
  },
  {
    question: "Does Form6 comply with EU food safety standards?",
    answer: "Absolutely. All our products are formulated to comply with European Food Safety Authority (EFSA) regulations and are registered under EU VAT guidelines for cross-border shipments. Our main warehouse is in Munich, Germany."
  }
];

const AboutContact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{ 
          name: formData.name, 
          email: formData.email, 
          message: formData.message 
        }]);

      if (error) {
        console.error('Error sending message:', error);
        alert('Could not send message. Please try again.');
        return;
      }

      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 4000);
    }
  };

  return (
    <main className="about-contact-page" style={{ paddingTop: 'calc(var(--header-height) + 2rem)', minHeight: '90vh', background: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Intro */}
        <section className="about-intro" style={{ padding: '4rem 0', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <span className="hero-eyebrow" style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>Get in Touch</span>
          <h1 style={{ fontSize: '3rem', fontWeight: '500', lineHeight: '1.1', marginBottom: '1rem', letterSpacing: '-0.02em' }}>About & Contact</h1>
          <p style={{ opacity: 0.75, fontSize: '1rem', lineHeight: '1.5', margin: 0 }}>
            Have a question about our active compounds, batch test results, or shipping? Our clinical support team is here to assist.
          </p>
        </section>

        {/* FAQ & Contact Form Grid */}
        <div className="tablet-stack" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '4rem',
          alignItems: 'start',
          marginBottom: '5rem'
        }}>
          
          {/* Left: Interactive FAQ Accordion */}
          <div id="faq">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Frequently Asked Questions</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {faqItems.map((faq, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600', fontSize: '0.9rem' }}>
                    <span>{faq.question}</span>
                    <span style={{ fontSize: '1.1rem' }}>{openIndex === idx ? '−' : '+'}</span>
                  </div>
                  {openIndex === idx && (
                    <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', lineHeight: '1.5', opacity: 0.8, borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', margin: '0.75rem 0 0 0' }}>
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div style={{
            background: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.01)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '1.25rem' }}>Send Support Request</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
              <div className="form-group">
                <label style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                  style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', borderRadius: '6px' }} 
                />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                  style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', borderRadius: '6px' }} 
                />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>Message</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4} 
                  required 
                  style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', borderRadius: '6px', resize: 'vertical' }} 
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'var(--text-primary)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '999px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '0.5rem'
                }}
              >
                <Send size={12} />
                <span>Submit Form</span>
              </button>
            </form>

            {formSubmitted && (
              <div style={{
                background: '#E2ECE6',
                color: '#004A3A',
                border: '1px solid #BFE0CD',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: '500',
                marginTop: '1.25rem',
                textAlign: 'center'
              }}>
                ✓ Message authorized. Support ticket created.
              </div>
            )}
          </div>

        </div>

        {/* Integration Provision: Social Shop Grid (Instagram Storefront) */}
        <section className="insta-shop-section" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '4rem', marginBottom: '6rem' }}>
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <Instagram size={32} color="#004A3A" style={{ marginBottom: '0.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '500', letterSpacing: '-0.02em', margin: 0 }}>Shop Our Instagram</h3>
            <p style={{ opacity: 0.6, fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>Tag <strong>#Form6Scientific</strong> in your routine to be featured.</p>
          </div>

          <div className="mobile-stack-xs" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div style={{ aspectRatio: '1/1', background: '#ccc', borderRadius: '12px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
              <img src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXRobGV0ZXx8fHx8fDE2NDYyMjA3MTY&ixlib=rb-1.2.1&q=80&w=400" alt="Instagram Post" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} className="instagram-mock-img" />
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(255,255,255,0.9)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold' }}>Shop CORE →</div>
            </div>
            <div style={{ aspectRatio: '1/1', background: '#ccc', borderRadius: '12px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
              <img src="https://images.unsplash.com/photo-1511295742364-92767fa62d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c2xlZXB8fHx8fHwxNjQ2MjIwNzE2&ixlib=rb-1.2.1&q=80&w=400" alt="Instagram Post" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} className="instagram-mock-img" />
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(255,255,255,0.9)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold' }}>Shop Sleep →</div>
            </div>
            <div style={{ aspectRatio: '1/1', background: '#ccc', borderRadius: '12px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
              <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWVkaXRhdGlvbnx8fHx8fDE2NDYyMjA3MTY&ixlib=rb-1.2.1&q=80&w=400" alt="Instagram Post" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} className="instagram-mock-img" />
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(255,255,255,0.9)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold' }}>Shop Focus →</div>
            </div>
            <div style={{ aspectRatio: '1/1', background: '#ccc', borderRadius: '12px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWVkY2luZXx8fHx8fDE2NDYyMjA3MTY&ixlib=rb-1.2.1&q=80&w=400" alt="Instagram Post" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} className="instagram-mock-img" />
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(255,255,255,0.9)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold' }}>Shop PRIME →</div>
            </div>
          </div>
        </section>

      </div>

      {/* Floating Support chat provision (WhatsApp Widget) */}
      <div 
        onClick={() => alert("Launching WhatsApp Support Chat... \nConnecting with Form6 Lead Clinician.")}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#25D366',
          color: 'white',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 99,
          transition: 'transform 0.2s'
        }}
        className="whatsapp-float-widget"
        title="WhatsApp Clinical Support"
      >
        <MessageCircle size={28} fill="white" stroke="#25D366" />
      </div>

    </main>
  );
};

export default AboutContact;
