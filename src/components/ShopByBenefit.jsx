import React from 'react';

const ShopByBenefit = () => {
  return (
    <section className="benefit-panels-section">
      <div className="benefit-panel" style={{ backgroundImage: 'url(/panel_greens_1780485758182.png)' }}>
        <div className="panel-overlay"></div>
        <span className="panel-micro-header">• CORE</span>
        <h3 className="panel-rotated-text">recovery</h3>
      </div>
      <div className="benefit-panel" style={{ backgroundImage: 'url(/panel_blues_1780485771549.png)' }}>
        <div className="panel-overlay"></div>
        <span className="panel-micro-header">• CORE</span>
        <h3 className="panel-rotated-text">energy</h3>
      </div>
      <div className="benefit-panel" style={{ backgroundImage: 'url(/panel_corals_1780485782838.png)' }}>
        <div className="panel-overlay"></div>
        <span className="panel-micro-header">• PRIME</span>
        <h3 className="panel-rotated-text">sleep</h3>
      </div>
      <div className="benefit-panel" style={{ backgroundImage: 'url(/panel_pinks_1780485796348.png)' }}>
        <div className="panel-overlay"></div>
        <span className="panel-micro-header">• PRIME</span>
        <h3 className="panel-rotated-text">immunity</h3>
      </div>
      <div className="benefit-panel" style={{ backgroundImage: 'url(/panel_oranges_1780485809148.png)' }}>
        <div className="panel-overlay"></div>
        <span className="panel-micro-header">• PRIME</span>
        <h3 className="panel-rotated-text">digestion</h3>
      </div>
    </section>
  );
};

export default ShopByBenefit;