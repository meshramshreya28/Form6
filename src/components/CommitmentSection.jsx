import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { CheckCircle, ShieldCheck } from 'lucide-react';

const commitments = [
  {
    id: 1,
    title: 'Clinically Proven',
    description: 'Our formulas utilize clinically backed actives that are standardized to ensure consistent bioactivity and real results you can feel.',
    icon: <CheckCircle size={32} strokeWidth={1.5} />,
    color: '#f5e6c8'
  },
  {
    id: 2,
    title: 'Third-Party Tested',
    description: 'Every ingredient and dosage undergoes rigorous testing to meet the highest standards of quality, purity, and safety before reaching you.',
    icon: <ShieldCheck size={32} strokeWidth={1.5} />,
    color: '#d6ecd6'
  }
];

const CommitmentCard = ({ commitment }) => {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true, threshold: 0.2 });

  return (
    <div 
      ref={ref}
      className={`commitment-card reveal-up ${isVisible ? 'is-visible' : ''}`}
      style={{ backgroundColor: commitment.color }}
    >
      <div className="commitment-icon">{commitment.icon}</div>
      <h3 className="commitment-title">{commitment.title}</h3>
      <p className="commitment-desc">{commitment.description}</p>
    </div>
  );
};

const CommitmentSection = () => {
  return (
    <section className="commitment-section" id="commitment">
      <div className="commitment-container container">
        <div className="commitment-left">
          <div className="commitment-sticky">
            <span className="hero-eyebrow">The Form 6 Standard</span>
            <h2>Our Commitment</h2>
            <p>
              We believe in effortless wellness without compromising on quality. 
              Our pillars ensure you get exactly what your body needs.
            </p>
          </div>
        </div>
        <div className="commitment-right">
          {commitments.map(commitment => (
            <CommitmentCard key={commitment.id} commitment={commitment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;
