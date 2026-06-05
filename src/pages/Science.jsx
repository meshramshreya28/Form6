import React, { useState } from 'react';
import { Beaker, ShieldCheck, Dna, BrainCircuit, HeartHandshake } from 'lucide-react';

const ingredientDb = [
  {
    name: "KSM-66® Ashwagandha",
    dose: "600mg",
    mechanism: "Regulates HPA-axis (hypothalamic-pituitary-adrenal) activity, lowering systemic serum cortisol levels under stress.",
    study: "Double-blind, placebo-controlled trial showing 27.9% reduction in cortisol after 60 days.",
    range: "PRIME Focus & Calm"
  },
  {
    name: "Magnesium Bisglycinate",
    dose: "300mg",
    mechanism: "Crosses the blood-brain barrier efficiently to bind to GABA-A receptors, facilitating neural relaxation and deep sleep.",
    study: "Clinical evaluation showing 35-minute average increase in total sleep time for insomnia subjects.",
    range: "PRIME Sleep Restore"
  },
  {
    name: "L-Theanine (Alpha-Grade)",
    dose: "150mg - 200mg",
    mechanism: "Promotes alpha brain wave generation associated with relaxed alertness without inducing drowsiness.",
    study: "EEG scan studies proving alpha wave generation 40 minutes post-intake.",
    range: "CORE Performance Energy & PRIME Focus & Calm"
  },
  {
    name: "Zinc Picolinate",
    dose: "15mg",
    mechanism: "Highly bioavailable zinc salt that supports T-cell development and acts as a structural component for over 300 enzymes.",
    study: "Meta-analysis proving a 3-day reduction in viral symptom duration when taken at first sign of immune stress.",
    range: "PRIME Daily Immunity Glow"
  },
  {
    name: "Essential Amino Acids (EAAs)",
    dose: "3500mg",
    mechanism: "Provides all nine amino compounds that the body cannot synthesize, fueling muscle protein synthesis and cell repair.",
    study: "Muscle biopsy studies confirming 40% higher amino absorption rate when taken with electrolytes.",
    range: "CORE Hydration & Recovery"
  }
];

const Science = () => {
  const [selectedIngredient, setSelectedIngredient] = useState(ingredientDb[0]);
  const [hoveredChartPoint, setHoveredChartPoint] = useState(null);

  // Bioavailability mock data points for SVG charting
  // x: hours (0 to 6), y1: generic absorption, y2: Form6 absorption
  const chartPoints = [
    { hour: 0, generic: 0, form6: 0 },
    { hour: 1, generic: 30, form6: 65 },
    { hour: 2, generic: 45, form6: 95 },
    { hour: 3, generic: 40, form6: 90 },
    { hour: 4, generic: 25, form6: 80 },
    { hour: 5, generic: 15, form6: 65 },
    { hour: 6, generic: 5, form6: 50 },
  ];

  return (
    <main className="science-page" style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      
      {/* Hero Section */}
      <section className="science-hero" style={{ padding: '12rem 2rem 10rem', backgroundColor: 'var(--bg-primary)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        {/* Soft background glow */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '60%', height: '140%', background: 'radial-gradient(ellipse at center, rgba(0,74,58,0.04) 0%, rgba(250,244,240,0) 70%)', zIndex: 1, pointerEvents: 'none' }} />
        
        <div className="container" style={{ maxWidth: '1200px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '100px', padding: '0.5rem 1.25rem', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem', background: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                <Beaker size={14} color="var(--accent-primary)" />
                Clinical Authority
              </span>
              <h1 style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', fontWeight: '400', lineHeight: '1.05', marginBottom: '1rem', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                The Science of<br /><span style={{ fontStyle: 'italic', color: '#004A3A' }}>Bioavailability.</span>
              </h1>
            </div>
            <div>
              <p style={{ fontSize: '1.35rem', opacity: 0.85, lineHeight: '1.6', color: 'var(--text-primary)', borderLeft: '2px solid var(--border-color)', paddingLeft: '2.5rem', marginLeft: '1rem' }}>
                Form6 formulations are built in collaboration with medical researchers, clinical nutritionists, and performance athletes. We do not hide behind proprietary blends. We list every active compound in standardized, clinically effective dosages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Bioavailability Chart Section */}
      <section className="science-chart-section" style={{ padding: '8rem 2rem', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            
            <div className="science-chart-info" style={{ padding: '2rem 0' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '400', marginBottom: '2.5rem', lineHeight: '1.15', letterSpacing: '-0.02em' }}>Why Standard <span style={{ color: '#004A3A', fontStyle: 'italic' }}>Powders</span> Aren't Enough</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFF5F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #FFE0D6' }}>
                    <span style={{ fontSize: '1.2rem', color: '#C65F2B', fontWeight: '700' }}>×</span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>Gastric Degradation</h4>
                    <p style={{ opacity: 0.75, lineHeight: '1.6', fontSize: '1rem', margin: 0 }}>Standard generic vitamins and powders are often degraded in the acidic gastric environment before reaching the small intestine, resulting in poor absorption (often &lt; 20%).</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E2ECE6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #C5DBD0' }}>
                    <ShieldCheck size={22} color="#004A3A" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>Liposomal Encapsulation</h4>
                    <p style={{ opacity: 0.75, lineHeight: '1.6', fontSize: '1rem', margin: 0 }}>Form6 utilizes <strong>Micro-Chelated Mineral Complexes</strong>. This effectively shields the compounds, yielding a <strong>2.4x higher absorption curve</strong> and sustained release.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '2rem', marginTop: '3.5rem', padding: '1.5rem 2rem', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#E2ECE6', border: '2px solid #004A3A' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Form6 Complex</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF8A65' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Generic Form</span>
                </div>
              </div>
            </div>

          {/* Interactive SVG Chart Card */}
          <div className="science-chart-card" style={{
            background: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            borderRadius: '16px',
            padding: '3rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.9 }}>
              <Dna size={20} color="var(--bg-primary)" />
              <span>Bio-Absorbency Over Time (Plasma Levels)</span>
            </h3>

            {/* SVG Plot */}
            <div style={{ position: 'relative', width: '100%', height: '260px' }}>
              <svg viewBox="0 0 500 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                {/* Horizontal grid lines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="40" y1="70" x2="480" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="40" y1="120" x2="480" y2="120" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                
                {/* Axes */}
                <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <line x1="40" y1="20" x2="40" y2="170" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

                {/* Plot Paths */}
                {/* Generic curve */}
                <path
                  d="M 40 170 C 110 120, 180 100, 250 110 C 320 120, 390 140, 480 170"
                  fill="none"
                  stroke="#FF8A65"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                  opacity="0.7"
                />
                
                {/* Form6 curve */}
                <path
                  d="M 40 170 C 110 60, 180 20, 250 30 C 320 40, 390 70, 480 100"
                  fill="none"
                  stroke="#E2ECE6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Interactible Nodes */}
                {chartPoints.map((pt, idx) => {
                  const x = 40 + (idx * 73.3);
                  const yGeneric = 170 - (pt.generic * 1.5);
                  const yForm6 = 170 - (pt.form6 * 1.5);
                  
                  return (
                    <g key={idx} style={{ cursor: 'pointer' }}>
                      {/* Invisible wider hover targets */}
                      <rect 
                        x={x - 15} y="10" width="30" height="180" 
                        fill="transparent" 
                        onMouseEnter={() => setHoveredChartPoint(pt)}
                        onMouseLeave={() => setHoveredChartPoint(null)}
                      />
                      
                      {/* Generic Nodes */}
                      <circle cx={x} cy={yGeneric} r="4" fill="#FF8A65" />
                      
                      {/* Form6 Nodes */}
                      <circle 
                        cx={x} cy={yForm6} r="6" fill="#E2ECE6" 
                        stroke="var(--text-primary)" strokeWidth="2"
                        className={hoveredChartPoint?.hour === pt.hour ? 'scale-up-node' : ''} 
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip Overlay */}
              {hoveredChartPoint && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '50px',
                  background: 'rgba(44, 47, 31, 0.95)',
                  color: 'white',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  pointerEvents: 'none',
                  animation: 'fadeUp 0.15s ease',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div><strong>Time Elapsed:</strong> {hoveredChartPoint.hour} hour{hoveredChartPoint.hour !== 1 && 's'}</div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                    <span>Form6 Plasma: <strong style={{ color: '#E2ECE6' }}>{hoveredChartPoint.form6}%</strong></span>
                    <span>Generic: <strong style={{ color: '#FFB8A1' }}>{hoveredChartPoint.generic}%</strong></span>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.5rem 0 1.5rem', fontSize: '0.75rem', opacity: 0.5 }}>
              <span>Intake (0hr)</span>
              <span>Absorption Peak (2-3hr)</span>
              <span>Clearance (6hr)</span>
            </div>
          </div>

        </div>
        </div>
      </section>

      {/* Interactive Ingredient Database Section */}
      <section className="science-ingredients-db" style={{ padding: '8rem 2rem', background: '#f4f4f4', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="hero-eyebrow" style={{ color: 'var(--text-primary)', fontSize: '0.85rem', letterSpacing: '0.15em', fontWeight: '600', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'inline-block' }}>Science Database</span>
            <h2 style={{ fontSize: '3rem', fontWeight: '400', letterSpacing: '-0.025em', color: 'var(--text-primary)', margin: 0 }}>Standardized Compounds</h2>
            <p style={{ maxWidth: '600px', margin: '1.5rem auto 0 auto', opacity: 0.8, fontSize: '1.1rem', lineHeight: '1.6' }}>
              Select a clinical compound from our database below to view its active dosage, bio-physiological mechanism, and clinical efficacy.
            </p>
          </div>

          <div className="ingredients-db-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-primary)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            
            {/* List side */}
            <div className="ingredients-db-list" style={{
              background: 'white',
              borderRight: '1px solid var(--border-color)',
              padding: '3rem 2rem'
            }}>
              {ingredientDb.map(ing => (
                <button
                  key={ing.name}
                  onClick={() => setSelectedIngredient(ing)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    textAlign: 'left',
                    background: selectedIngredient.name === ing.name ? 'var(--bg-primary)' : 'transparent',
                    border: '1px solid',
                    borderColor: selectedIngredient.name === ing.name ? 'var(--border-color)' : 'transparent',
                    borderRadius: '8px',
                    padding: '1.25rem 1.5rem',
                    marginBottom: '0.5rem',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    boxShadow: selectedIngredient.name === ing.name ? '0 4px 12px rgba(0,0,0,0.02)' : 'none',
                    transition: 'all 0.2s',
                    opacity: selectedIngredient.name === ing.name ? 1 : 0.6
                  }}
                >
                  {ing.name}
                  {selectedIngredient.name === ing.name && <span style={{ fontSize: '1.2rem' }}>→</span>}
                </button>
              ))}
            </div>

            {/* View side */}
            <div className="ingredients-db-details" style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', display: 'block', opacity: 0.6 }}>
                Formulation: {selectedIngredient.range}
              </span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: '400', color: 'var(--text-primary)', marginBottom: '3rem', letterSpacing: '-0.02em' }}>{selectedIngredient.name}</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '1.5rem' }}>
                <div style={{ paddingLeft: '1.5rem', borderLeft: '2px solid var(--text-primary)' }}>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.5rem', fontWeight: '600' }}>Clinical Dosage</h4>
                  <p style={{ fontSize: '1.75rem', fontWeight: '400', color: 'var(--text-primary)', margin: 0 }}>{selectedIngredient.dose}</p>
                </div>
                <div style={{ paddingLeft: '1.5rem', borderLeft: '2px solid rgba(0,0,0,0.1)' }}>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.5rem', fontWeight: '600' }}>Physiological Mechanism</h4>
                  <p style={{ fontSize: '1.1rem', margin: 0, opacity: 0.9, lineHeight: '1.6' }}>{selectedIngredient.mechanism}</p>
                </div>
                <div style={{ paddingLeft: '1.5rem', borderLeft: '2px solid rgba(0,0,0,0.1)' }}>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.5rem', fontWeight: '600' }}>Clinical Trials Validation</h4>
                  <p style={{ fontSize: '1.1rem', margin: 0, opacity: 0.8, fontStyle: 'italic', lineHeight: '1.5' }}>"{selectedIngredient.study}"</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Medical Advisory Board Section */}
      <section className="science-advisory-section" style={{ padding: '6rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="hero-eyebrow" style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>Medical Authority</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '500', letterSpacing: '-0.025em' }}>Scientific Advisory Board</h2>
            <p style={{ maxWidth: '500px', margin: '0.75rem auto 0 auto', opacity: 0.75, fontSize: '0.95rem' }}>
              Meet the clinicians and researchers auditing our active compound formulas.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            
            {/* Board member 1 */}
            <div style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '3rem 2rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)'; }}
            >
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                backgroundColor: '#EBE5DF',
                margin: '0 auto 2rem auto',
                overflow: 'hidden',
                border: '4px solid white',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
              }}>
                <img src="/adviser1.png" alt="Dr. Julian Vane" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZG9jdG9yfHx8fHx8MTY0NjIyMDcxNg&ixlib=rb-1.2.1&q=80&w=400'; }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Dr. Julian Vane, MD</h3>
              <p style={{ fontSize: '0.75rem', color: '#004A3A', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Endocrinology Specialist</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.75, lineHeight: '1.4', margin: 0 }}>
                "Auditing bioactivity levels ensures that Form6 adaptogens promote healthy adrenal feedback loops and hormonal homeostasis."
              </p>
            </div>

            {/* Board member 2 */}
            <div style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '3rem 2rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)'; }}
            >
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                backgroundColor: '#EBE5DF',
                margin: '0 auto 2rem auto',
                overflow: 'hidden',
                border: '4px solid white',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
              }}>
                <img src="/adviser2.png" alt="Dr. Amara Thorne" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1594824813573-246434de83fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZG9jdG9yfHx8fHx8MTY0NjIyMDcxNg&ixlib=rb-1.2.1&q=80&w=400'; }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Dr. Amara Thorne, PhD</h3>
              <p style={{ fontSize: '0.75rem', color: '#004A3A', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Nutritional Physiology Professor</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.75, lineHeight: '1.4', margin: 0 }}>
                "The integration of chelated mineral carriers resolves the absorption blockages commonly encountered in daily multi-vitamins."
              </p>
            </div>

            {/* Board member 3 */}
            <div style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '3rem 2rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)'; }}
            >
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                backgroundColor: '#EBE5DF',
                margin: '0 auto 2rem auto',
                overflow: 'hidden',
                border: '4px solid white',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
              }}>
                <img src="/adviser3.png" alt="Coach Marcus Sterling" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXRobGV0ZXx8fHx8fDE2NDYyMjA3MTY&ixlib=rb-1.2.1&q=80&w=400'; }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Marcus Sterling, MS</h3>
              <p style={{ fontSize: '0.75rem', color: '#004A3A', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Athletic Human Performance Coach</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.75, lineHeight: '1.4', margin: 0 }}>
                "Form6 CORE is formulated precisely with the electrolyte balances necessary to delay lactate thresholds in endurance athletes."
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Science;
