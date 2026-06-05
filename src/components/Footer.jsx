import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, Beaker } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">

        <div className="footer-newsletter" id="newsletter">
          <h3>Join the Form 6 Collective</h3>
          <p>Sign up for exclusive access to new releases, holistic wellness tips, and private sales.</p>
          <form onSubmit={handleSubmit} className="newsletter-form-premium">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
              className={status === 'error' ? 'input-error' : ''}
            />
            <button type="submit" aria-label="Submit Email">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>
          {status === 'success' && (
            <p className="form-feedback success">✓ You're on the list. Welcome.</p>
          )}
          {status === 'error' && (
            <p className="form-feedback error">Please enter a valid email address.</p>
          )}
        </div>

        <div className="footer-links">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop">Shop All</Link></li>
            <li><Link to="/shop?range=CORE">CORE (Athletes)</Link></li>
            <li><Link to="/shop?range=PRIME">PRIME (Daily Wellness)</Link></li>
            <li><Link to="/subscribe">Subscribe & Save</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>About & Science</h4>
          <ul>
            <li><Link to="/science">The Science</Link></li>
            <li><Link to="/blog">Scientific Blog</Link></li>
            <li><Link to="/about-contact">About & Contact</Link></li>
            <li><Link to="/about-contact#faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Legal (EU GDPR)</h4>
          <ul>
            <li><Link to="/legal?doc=privacy">Privacy Policy</Link></li>
            <li><Link to="/legal?doc=terms">Terms of Service</Link></li>
            <li><Link to="/legal?doc=cookies">Cookie Policy</Link></li>
            <li><Link to="/legal?doc=shipping">Shipping & Returns</Link></li>
          </ul>
        </div>
      </div>

      <div className="container footer-trust">
        <div className="trust-badge">
          <Leaf size={20} strokeWidth={1.5} />
          <span>100% Plant-Based</span>
        </div>
        <div className="trust-badge">
          <Beaker size={20} strokeWidth={1.5} />
          <span>Clinically Proven Actives</span>
        </div>
        <div className="trust-badge">
          <ShieldCheck size={20} strokeWidth={1.5} />
          <span>Third-Party Tested</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="footer-disclaimer">
          <p>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
        </div>
        
        <div className="footer-meta">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Form 6. All rights reserved.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;