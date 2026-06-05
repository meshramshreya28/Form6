import React from 'react';

const BenefitBanner = () => {
  return (
    <section className="benefit-banner">
      <div className="banner-item">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 12c-2 0-3 1.5-3 3"></path>
          <path d="M12 12c2 0 3 1.5 3 3"></path>
          <path d="M12 4v2"></path>
          <path d="M16 6.5l-1.5 1.5"></path>
          <path d="M8 6.5l1.5 1.5"></path>
          <path d="M20 12h-2"></path>
          <path d="M4 12h2"></path>
        </svg>
        <p>Support overall health,<br />wellness and vitality</p>
      </div>

      <div className="banner-item">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9 8h6v3a3 3 0 0 1-6 0V9a1 1 0 0 0-2 0v2a5 5 0 0 0 10 0V7a2 2 0 0 0-4 0v3"></path>
          <path d="M8 17h8"></path>
        </svg>
        <p>Boost digestive function and<br />help relieve bloat</p>
      </div>

      <div className="banner-item">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M13 4l-5 9h4l-1 7 5-9h-4l1-7z"></path>
        </svg>
        <p>Supercharge immunity and<br />energy</p>
      </div>
    </section>
  );
};

export default BenefitBanner;