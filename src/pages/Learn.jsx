import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ShopByBenefit from '../components/ShopByBenefit';

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <button className="accordion-header" onClick={onClick} aria-expanded={isOpen}>
        <span>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div className="accordion-content" style={{ maxHeight: isOpen ? '500px' : '0' }}>
        <p>{content}</p>
      </div>
    </div>
  );
};

const Learn = () => {
  const [sectionRef] = useIntersectionObserver({ threshold: 0.1 });
  const [openFormulationIndex, setOpenFormulationIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const formulationItems = [
    { title: 'CONVENIENT', content: 'Our superpowders are designed to mix effortlessly with water, milk, or smoothies, making them incredibly easy to add to your daily routine.' },
    { title: 'CLINICALLY-VALIDATED ACTIVES', content: 'We use precise, effective doses of key ingredients that are backed by clinical research to ensure you get real results.' },
    { title: 'RIGOROUS THIRD-PARTY TESTING', content: 'Every batch is rigorously tested for purity and potency by independent third-party laboratories.' },
    { title: 'TASTE MATTERS', content: 'We believe wellness should be a treat, not a chore. Our natural flavors are crafted to make every sip delicious.' }
  ];

  const faqItems = [
    { title: 'How often can I take Form 6?', content: 'You can take Form 6 daily as part of your normal wellness routine. We recommend one to two servings a day depending on your nutritional needs.' },
    { title: 'Where should I store my powder?', content: 'Store in a cool, dry place away from direct sunlight. There is no need to refrigerate our superpowders.' },
    { title: 'Can I incorporate Form 6 into my current supplement routine?', content: 'Yes, our products are designed to be complementary. However, always consult with your healthcare provider if you have specific concerns.' },
    { title: 'Where are your products manufactured?', content: 'Our products are proudly blended and packaged in the USA using globally sourced, premium ingredients.' },
    { title: 'Are your products third-party tested?', content: 'Absolutely. We test for heavy metals, microbes, and ensure label accuracy through independent labs.' },
    { title: 'Can I take Form 6 if I am pregnant or breastfeeding?', content: 'While our ingredients are natural and food-based, we always recommend consulting your doctor before adding any new supplement to your routine when pregnant or breastfeeding.' },
    { title: 'Can children drink Form 6?', content: 'Our formulations are designed for adults. Please consult a pediatrician before giving to children.' }
  ];

  return (
    <main className="learn-page-new">
      
      {/* Section 1: Hero Split */}
      <section className="learn-hero-split">
        <div className="learn-split-text-area">
          <div className="learn-split-text-inner">
            <span className="learn-micro-header"><span className="dot">•</span> IT'S TIME TO TAKE CARE OF YOU</span>
            <h1>Self-Care Isn't Selfish.</h1>
            <p>At Form 6, we believe that being healthy extends to every aspect of daily wellness, empowering us to live happier, more positive, and beautiful lives.</p>
          </div>
        </div>
        <div className="learn-split-image-area">
          <img src="/nutrihue-lifestyle.png" alt="Woman drinking Form 6" />
        </div>
      </section>

      {/* Section 1.5: Introducing */}
      <section className="introducing-section scroll-reveal">
        <div className="container container-small text-center">
          <h2>Introducing Form 6</h2>
          <p>
            A collection of convenient, solution-focused, nutrient dense formulas designed for optimal daily health. Our supplements are formulated with antioxidant-rich superfoods, essential vitamins, vital minerals, and wholefood derived ingredients to help you meet your nutritional needs with ease while super-charging your immunity, energy, gut health, and overall well-being.
          </p>
          <p className="introducing-tagline">
            Live Happy. Live Healthy. Live Form 6.
          </p>
        </div>
      </section>

      {/* Section 2: Founder Note */}
      <section className="founder-note-section" id="story">
        <div className="container container-large">
          <div className="founder-note-grid">
            <div className="founder-note-image scroll-reveal">
              <img src="/founder.png" alt="Form 6 Founder" />
            </div>
            <div className="founder-note-text scroll-reveal delay-100">
              <span className="learn-micro-header"><span className="dot">•</span> A NOTE FROM OUR FOUNDER</span>
              <p>Hello friends!</p>
              <p>Inspiring and helping others to achieve their personal goals has always been a passion of mine. In 2016, I launched my own fitness company, where I quickly realized that being healthy is about so much more than just hours spent in the gym. Health extends to every aspect of daily wellness, empowering us to live happier, more positive, and beautiful lives. I am beyond excited to share a dream of mine that has finally grown into a reality.</p>
              <p>As a single mom, balancing my work life, my family life and my social life has often felt overwhelming. Like you - I am busy. Eating well and taking care of myself has always been a priority, but I'm not perfect- sometimes life gets in the way. Although it feels like I have tried every supplement, shake, beverage and bar on the market - I've struggled to find a product that was convenient to use, provided real benefits, and most importantly was delicious. If I was feeling this way, I had to believe others felt the same. This was the inspiration for Form 6.</p>
              <p>Every Form 6 product is thoughtfully designed and formulated to help you feel your best. Our supplements are made with antioxidant-rich superfoods, essential vitamins, vital minerals, and wholefood derived ingredients to help you meet your nutritional needs with ease while super-charging your immunity, energy, gut health, and overall well-being - not to mention they taste so good, you will look forward to enjoying them everyday!</p>
              <p>I am so excited to share what I've been working on and I hope you love these powders as much as I do.</p>
              <p>It's time to take care of you.</p>
              <p className="founder-signature">Elena</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Formulation (Deep Green) */}
      <section className="formulation-section" id="ingredients">
        <div className="formulation-split-image-area">
          <img src="/product-green.png" alt="Form 6 Ingredients" style={{ objectFit: 'contain', padding: '2rem' }} />
        </div>
        <div className="formulation-split-text-area">
          <div className="formulation-text-inner scroll-reveal" ref={sectionRef}>
            <span className="learn-micro-header light"><span className="dot light">•</span> OUR INGREDIENTS</span>
            <h2>Formulation Matters</h2>
            <p>At Form 6, we formulate our products with you in mind. Our mission is simple: to provide targeted solutions that seamlessly complement your wellness routine. Each product is thoughtfully crafted with essential nutrients to nourish your body and enhance overall health.</p>
            
            <div className="accordion-wrapper dark-theme">
              {formulationItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  title={item.title} 
                  content={item.content} 
                  isOpen={openFormulationIndex === index}
                  onClick={() => setOpenFormulationIndex(openFormulationIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: FAQs */}
      <section className="faq-section" id="faq">
        <div className="container container-small">
          <div className="faq-header scroll-reveal">
            <h2>FAQs</h2>
          </div>
          
          <div className="accordion-wrapper light-theme scroll-reveal delay-100">
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
      </section>

      {/* Section 5: Benefit Grid Panels */}
      <ShopByBenefit />

    </main>
  );
};

export default Learn;
