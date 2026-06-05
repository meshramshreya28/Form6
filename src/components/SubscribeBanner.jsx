import React from 'react';
import { Link } from 'react-router-dom';

const SubscribeBanner = () => {
  return (
    <section className="subscribe-banner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', backgroundColor: 'var(--bg-primary)', alignItems: 'stretch', height: 'calc(100vh - 80px)', overflow: 'hidden' }}>
      <div className="subscribe-text" style={{ padding: '6rem 12%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span className="micro-header" style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-primary)' }}></span>
          SUBSCRIBE & SAVE
        </span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '400', color: 'var(--text-primary)', margin: '0 0 1.5rem 0', lineHeight: '1.1', letterSpacing: '-0.02em' }}>Build Your Form6 Routine</h2>
        <p style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: '0 0 2rem 0', opacity: 0.8, lineHeight: '1.4', fontWeight: '400' }}>
          Nourish your life.<br/>
          One scoop at a time.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: '400', opacity: 0.9 }}>
          <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✓ Enjoy a 10% discount</li>
          <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✓ Never run out</li>
          <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✓ Pause or cancel anytime</li>
        </ul>
        <Link to="/subscribe" className="btn btn-outline" style={{ alignSelf: 'flex-start', padding: '1rem 2.5rem', border: '1px solid var(--text-primary)', color: 'var(--text-primary)', textDecoration: 'none', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.05em', borderRadius: '4px', transition: 'all 0.3s ease' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--text-primary)';
            e.currentTarget.style.color = 'var(--bg-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          GET STARTED
        </Link>
      </div>
      <div className="subscribe-image" style={{ width: '100%', height: '100%', backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="/sub_hero.png" alt="Form6 Subscription Routine" style={{ width: '70%', height: '70%', objectFit: 'contain', transform: 'translateY(-3rem)' }} />
      </div>
    </section>
  );
};

export default SubscribeBanner;
