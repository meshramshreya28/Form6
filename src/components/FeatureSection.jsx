import React from 'react';
import { Link } from 'react-router-dom';

const FeatureSection = () => {
  return (
    <section className="feature-section">
      <div className="feature-content">
        <h2 className="feature-title">
          Clinical Precision.<br />
          Cellular Optimization.<br />
          Engineered for Results.
        </h2>
        <p className="feature-desc">
          Solution-focused, micro-encapsulated formulations designed for maximum bioavailability and sustained vitality.
        </p>
        <Link to="/science" className="feature-btn">
          EXPLORE THE SCIENCE
        </Link>
      </div>
      <div className="feature-image-wrapper">
        <img
          src="/nutrihue-lifestyle.png"
          alt="Form 6 Lifestyle"
          className="feature-image"
          style={{ filter: 'grayscale(20%)' }}
        />
      </div>
    </section>
  );
};

export default FeatureSection;