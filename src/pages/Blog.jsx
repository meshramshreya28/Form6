import React, { useState } from 'react';
import { BookOpen, Calendar, User, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Understanding Sleep Architecture: The Role of Magnesium in REM Sleep",
    category: "Sleep",
    excerpt: "Deep sleep represents the body's primary phase for physiological cellular restoration. Discover how bioavailable magnesium glycinate acts as a natural agonist for inhibitory neurotransmitters.",
    date: "2026-05-24",
    author: "Dr. Julian Vane, MD",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1511295742364-92767fa62d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c2xlZXB8fHx8fHwxNjQ2MjIwNzE2&ixlib=rb-1.2.1&q=80&w=600"
  },
  {
    id: 2,
    title: "Adaptogenic Cortisol Suppression: Standardizing Ashwagandha (KSM-66)",
    category: "Focus",
    excerpt: "Chronic elevation of serum cortisol degrades glycogen storage, impairs cognitive focus, and initiates systemic inflammatory responses. Clinical trials validate root extract efficacy in adrenal support.",
    date: "2026-05-18",
    author: "Dr. Amara Thorne, PhD",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWVkaXRhdGlvbnx8fHx8fDE2NDYyMjA3MTY&ixlib=rb-1.2.1&q=80&w=600"
  },
  {
    id: 3,
    title: "Re-defining Post-Exercise Glycogen Synthesis: Electrolytes & EAA Synergy",
    category: "Recovery",
    excerpt: "Taking protein alone post-workout is inefficient. Muscle biopsy trials show that matching essential amino acids with chelated sodium and potassium carriers speeds up cell restoration by 40%.",
    date: "2026-05-10",
    author: "Marcus Sterling, MS",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXRobGV0ZXx8fHx8fDE2NDYyMjA3MTY&ixlib=rb-1.2.1&q=80&w=600"
  },
  {
    id: 4,
    title: "The Gut-Brain Axis: Lactobacillus and Neurotransmitter Biosynthesis",
    category: "Digestion",
    excerpt: "90% of the body's serotonin receptors reside in the gastrointestinal tract. Microbiome diversity is directly tied to mental wellness, making targeted probiotic strain intake crucial.",
    date: "2026-04-28",
    author: "Dr. Julian Vane, MD",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWVkY2luZXx8fHx8fDE2NDYyMjA3MTY&ixlib=rb-1.2.1&q=80&w=600"
  }
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Sleep', 'Focus', 'Recovery', 'Digestion'];

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <main className="blog-page" style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      
      {/* Blog Hero */}
      <section className="blog-hero" style={{ padding: '5rem 2rem', borderBottom: '1px solid var(--border-color)', background: 'white' }}>
        <div className="container text-center" style={{ maxWidth: '700px' }}>
          <span className="hero-eyebrow" style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>The Form6 Digest</span>
          <h1 style={{ fontSize: '3rem', fontWeight: '500', lineHeight: '1.1', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Scientific Wellness</h1>
          <p style={{ opacity: 0.75, fontSize: '1rem', lineHeight: '1.5', margin: 0 }}>
            Exploring peer-reviewed biological studies, athletic human performance protocols, and targeted nutrition formulations.
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <div className="container" style={{ paddingTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
              style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                padding: '0.4rem 1.25rem',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'uppercase'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <section className="blog-grid-section" style={{ padding: '3rem 2rem 6rem 2rem' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}>
            {filteredPosts.map(post => (
              <article 
                key={post.id}
                style={{
                  background: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.01)'
                }}
              >
                <div style={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    color: '#004A3A',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                  }}>
                    {post.category}
                  </span>
                </div>

                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.75rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <User size={12} />
                      <span>{post.author}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '500', lineHeight: '1.25', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    {post.title}
                  </h3>

                  <p style={{ opacity: 0.8, fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1.5rem', flexGrow: 1 }}>
                    {post.excerpt}
                  </p>

                  <button 
                    onClick={() => alert(`Full article loading... \n"${post.title}" is in review.`)}
                    style={{
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#004A3A',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left'
                    }}
                  >
                    <span>Read Full Research</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Blog;
