import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, BellRing, Link as LinkIcon } from 'lucide-react';
import './ComingSoon.css';

const ComingSoon = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dataStructure = location.state?.dataStructure || {
    title: "This Feature",
    description: "This visualization is currently under development"
  };
  
  useEffect(() => {
    // Initialize any animations
    const timer = setTimeout(() => {
      document.querySelector('.coming-soon-container').classList.add('visible');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="coming-soon-page">
      <div className="coming-soon-container">
        <div className="coming-soon-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            <span>Back to Data Structures</span>
          </button>
        </div>
        
        <div className="coming-soon-content">
          <div className="feature-icon">
            {dataStructure.icon || <Calendar size={64} />}
          </div>
          
          <h1 className="feature-title">{dataStructure.title}</h1>
          <h2 className="coming-soon-title">Coming Soon</h2>
          
          <p className="feature-description">
            {dataStructure.description}
          </p>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-indicator"></div>
            </div>
            <p className="progress-text">Development in progress</p>
          </div>
          
          <div className="notify-container">
            <BellRing size={20} />
            <span>Stay tuned for updates!</span>
          </div>
          
          <div className="available-features">
            <h3>Currently Available:</h3>
            <button 
              className="feature-button"
              onClick={() => navigate('/linked-list')}
            >
              <LinkIcon size={20} />
              <span>Linked Lists</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;