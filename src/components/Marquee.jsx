import React from 'react';

const Marquee = () => {
  const items = [
    "Clinical Precision",
    "•",
    "High Bioavailability",
    "•",
    "Third-Party Tested",
    "•",
    "EU Compliant",
    "•",
    "Pharmaceutical Grade",
    "•",
    "Cellular Optimization",
    "•"
  ];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="marquee-track" aria-hidden={i !== 0 ? "true" : undefined}>
            {items.map((item, idx) => (
              <span key={idx} className="marquee-item">{item}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
