import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';
import ProductList from '../components/ProductList';

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div style={{
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      padding: '1.5rem 0',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: isOpen ? 'rgba(0,0,0,0.02)' : 'transparent'
    }} onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem' }}>
        <span style={{ fontSize: '1.15rem', fontWeight: '500', color: 'var(--text-primary)' }}>{title}</span>
        <div style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          color: 'var(--accent-primary)'
        }}>
          <ChevronDown size={20} />
        </div>
      </div>
      <div style={{
        maxHeight: isOpen ? '200px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isOpen ? 1 : 0
      }}>
        <p style={{ margin: '1rem 0 0 0', padding: '0 1rem', fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.75, color: 'var(--text-primary)' }}>{content}</p>
      </div>
    </div>
  );
};

const Subscribe = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqItems = [
    {
      title: "How does a Form 6 subscription work?",
      content: "When you subscribe to Form 6, you'll receive your favorite superfood blends automatically every 30 days. You'll save 10% on every order, get free shipping, and you can easily manage, pause, or cancel your subscription at any time through your account portal."
    },
    {
      title: "Which products are eligible for subscription?",
      content: "All of our signature superfood blends (Greens, Blues, Corals, Pinks, Oranges) are eligible for the Subscribe & Save program."
    },
    {
      title: "What are my delivery/frequency options?",
      content: "Our standard subscription is delivered every 30 days to ensure you never run out of your daily dose of wellness. You can skip a delivery or adjust your shipping date anytime."
    },
    {
      title: "How will I know when my subscription is going to renew?",
      content: "We'll send you an email reminder 3 days before your subscription is scheduled to process, giving you plenty of time to make any changes or skip an order."
    },
    {
      title: "What happens if I forget to cancel my order?",
      content: "If your order has already processed but hasn't shipped yet, reach out to our support team immediately and we'll do our best to cancel it. If it has shipped, you can return unopened products within 30 days for a refund."
    },
    {
      title: "How do I cancel my subscription?",
      content: "You can cancel your subscription at any time by logging into your Form 6 account, clicking on 'Manage Subscriptions', and selecting the cancel option. There are no fees or commitments."
    }
  ];

  return (
    <main className="subscribe-page">
      
      {/* Section 1: Build Routine Split */}
      <section style={{ padding: '8rem 2rem', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/5', position: 'relative' }}
              onMouseEnter={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
            >
              <img src="/sub_routine.png" alt="Form 6 superfood tubs" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            </div>
            <div style={{ padding: '2rem 0' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>• Build Your Routine</span>
              <h2 style={{ fontSize: '3.5rem', fontWeight: '400', letterSpacing: '-0.03em', lineHeight: '1.1', marginBottom: '1.5rem' }}>Subscribe & Save.</h2>
              <p style={{ fontSize: '1.15rem', opacity: 0.8, lineHeight: '1.6', marginBottom: '3rem', maxWidth: '400px' }}>Choose your clinical blends and customize delivery. We'll take care of the rest so you never miss a dose.</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {['Enjoy a 10% lifetime discount', 'Never run out of formulas', 'Pause, modify, or cancel anytime'].map((benefit, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1rem', fontWeight: '500' }}>
                    <CheckCircle2 size={20} color="#004A3A" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Product List */}
      <div className="sub-products-section">
        <ProductList 
          hideHeader={false} 
          title="Select Your Formulation" 
          subtitle="All signature superfood blends are eligible for monthly delivery." 
          hideViewAll={true} 
          centeredHeader={true} 
        />
      </div>

      {/* Section 3: Hero Split (Subscriptions) */}
      <section style={{ padding: '8rem 2rem', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            <div style={{ padding: '2rem 0', order: 2 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>• Subscriptions</span>
              <h1 style={{ fontSize: '3.5rem', fontWeight: '400', letterSpacing: '-0.03em', lineHeight: '1.1', marginBottom: '1.5rem' }}>Your Daily Dose,<br /><span style={{ fontStyle: 'italic', color: '#004A3A' }}>Refreshed.</span></h1>
              <p style={{ fontSize: '1.15rem', opacity: 0.8, lineHeight: '1.6', marginBottom: '3rem', maxWidth: '400px' }}>Just add water. We handle the complex clinical sourcing, and automatically deliver your essentials.</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {['Free expedited shipping', 'Priority access to new formulas', 'Dedicated clinical support'].map((benefit, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1rem', fontWeight: '500' }}>
                    <CheckCircle2 size={20} color="#004A3A" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/5', position: 'relative', order: 1 }}
              onMouseEnter={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
            >
              <img src="/sub_hero.png" alt="Green superfood iced drink" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Subscription FAQ */}
      <section style={{ padding: '10rem 2rem', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>
            <div style={{ position: 'sticky', top: '120px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>• Support</span>
              <h2 style={{ fontSize: '3rem', fontWeight: '400', letterSpacing: '-0.03em', lineHeight: '1.1' }}>Subscription<br/>FAQ</h2>
            </div>
            <div>
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  title={item.title} 
                  content={item.content} 
                  isOpen={openFaqIndex === index}
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Bottom CTA */}
      <section style={{ padding: '8rem 2rem', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ 
            background: 'var(--bg-primary)', 
            borderRadius: '32px', 
            padding: '6rem 4rem', 
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '140%', height: '200%', background: 'radial-gradient(ellipse at center, rgba(0,74,58,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <h2 style={{ fontSize: '3.5rem', fontWeight: '400', letterSpacing: '-0.03em', margin: '0 0 1.5rem 0', position: 'relative', zIndex: 2 }}>Form 6 Nutrition, Delivered.</h2>
            <p style={{ fontSize: '1.15rem', opacity: 0.75, maxWidth: '500px', margin: '0 auto 3rem auto', lineHeight: '1.6', position: 'relative', zIndex: 2 }}>Subscribe for monthly delivery and we'll make sure you never run out. It's the simplest way to be proactive about your wellness routine.</p>
            <Link to="/shop" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              background: '#004A3A', 
              color: 'white', 
              padding: '1.25rem 2.5rem', 
              borderRadius: '999px', 
              textDecoration: 'none', 
              fontWeight: '600', 
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              transition: 'transform 0.3s ease, background 0.3s ease',
              position: 'relative',
              zIndex: 2
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = '#00362A'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#004A3A'; }}
            >
              SHOP SUBSCRIPTIONS
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Subscribe;
