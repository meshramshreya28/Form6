import React from 'react';
import { Link } from 'react-router-dom';
import heroRightImage from '../assets/hero.png';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-glass-card">
            <span className="hero-eyebrow">Scientific Premium Nutraceuticals</span>
            <h1>Choose Your Path to Wellness</h1>
            <p>
              Form6 delivers clinical, solution-based formulations split into two distinct high-performance ranges: <strong>CORE</strong> for athletic recovery and performance, and <strong>PRIME</strong> for daily longevity and vitality.
            </p>
            <div className="hero-actions" style={{ flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
              <div style={{ display: 'flex', gap: '1rem', width: '100%', flexWrap: 'wrap' }}>
                <Link to="/shop?range=CORE" className="btn btn-primary hero-btn core-hero-btn" style={{ flex: 1, minWidth: '150px', textAlign: 'center' }}>
                  CORE (Athletes)
                </Link>
                <Link to="/shop?range=PRIME" className="btn btn-secondary hero-btn prime-hero-btn" style={{ flex: 1, minWidth: '150px', textAlign: 'center', border: '1px solid var(--text-primary)' }}>
                  PRIME (Wellness)
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-right-media" aria-hidden="true">
            <img
              src={heroRightImage}
              alt="Form6 Scientific Premium Supplements"
              className="hero-right-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;