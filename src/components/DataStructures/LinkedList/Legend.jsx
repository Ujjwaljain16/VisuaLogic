import React from 'react';
import './Legend.css';

const Legend = () => {
  return (
    <div className="legend">
      <h3 className="legend-title">Legend</h3>
      <div className="legend-items">
        <div className="legend-item">
          <div className="legend-color head-node"></div>
          <span className="legend-text">Head Node</span>
        </div>
        <div className="legend-item">
          <div className="legend-color highlighted-node"></div>
          <span className="legend-text">Highlighted Node</span>
        </div>
        <div className="legend-item">
          <div className="legend-color regular-node"></div>
          <span className="legend-text">Regular Node</span>
        </div>
        <div className="legend-item">
          <div className="legend-arrow">
            <svg width="20" height="10" viewBox="0 0 24 10">
              <line x1="2" y1="5" x2="22" y2="5" stroke="currentColor" strokeWidth="2" />
              <polygon points="22,0 22,10 26,5" fill="currentColor" />
            </svg>
          </div>
          <span className="legend-text">Next Pointer</span>
        </div>
        {/* Only show for doubly linked list */}
        <div className="legend-item">
          <div className="legend-arrow reverse">
            <svg width="20" height="10" viewBox="0 0 24 10">
              <line x1="2" y1="5" x2="22" y2="5" stroke="currentColor" strokeWidth="2" />
              <polygon points="2,0 2,10 -2,5" fill="currentColor" />
            </svg>
          </div>
          <span className="legend-text">Previous Pointer</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;