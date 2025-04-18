import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LandingPage.css';
import '../App.css';
import { 
  Link as LinkIcon, 
  Eye,
  Code,
  FileText,
  ChevronRight,
  Menu,
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.key !== 'default') {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  // animation state
  const [animatedItems, setAnimatedItems] = useState({
    hero: false,
    features: false,
    cards: false
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // features
  const features = [
    {
      title: "Interactive Visualizations",
      description: "Control the speed, step backward and forward to understand each Data Structure",
      icon: <Eye size={32} />
    },
    {
      title: "Code Synchronization",
      description: "See the code execute in perfect sync with the visual representation",
      icon: <Code size={32} />
    },
    {
      title: "Detailed Explanations",
      description: "Every visualization includes detailed explanations and time complexity information",
      icon: <FileText size={32} />
    }
  ];

 // loading 
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    // animation
    setTimeout(() => {
      setAnimatedItems(prev => ({ ...prev, hero: true }));
    }, 1800);

    setTimeout(() => {
      setAnimatedItems(prev => ({ ...prev, features: true }));
    }, 2000);

    setTimeout(() => {
      setAnimatedItems(prev => ({ ...prev, cards: true }));
    }, 2200);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-animation">
          <div className="loading-circle"></div>
          <div className="loading-bar"></div>
          <div className="loading-text">Loading VisuaLogic</div>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo">VisuaLogic</div>
        <nav className={`main-nav ${mobileMenuOpen
            ? 
            'mobile-open' 
            : ''}`}>
          <a href="#features">Features</a>
          <a href="#data-structures">Data Structures</a>
          <a href="#about">About</a>
        </nav>
        <div className="header-right">
          <button className="cta-button secondary">Get Started</button>
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <section className={`hero-section ${animatedItems.hero ? 'animated' : ''}`}>
        <div className="hero-content">
          <h1>Visualize. Understand. Master.</h1>
          <p className="hero-tagline">
            Transform abstract data structures into intuitive visual experiences
          </p>
          <div className="hero-buttons">
            <button className="cta-button primary" onClick={() => navigate('/data-structures', { replace: true })}>
              Explore Data Structures
            </button>
            <button className="cta-button outline" onClick={() => navigate('/tutorials')}>
              Explore Algorithims
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="animated-visual">
            <div className="node-animation n1"></div>
            <div className="node-animation n2"></div>
            <div className="node-animation n3"></div>
            <div className="connecting-line l1"></div>
            <div className="connecting-line l2"></div>
          </div>
        </div>
      </section>

      {/* features section */}
      <section id="features" className={`features-section ${animatedItems.features ? 'animated' : ''}`}>
        <h2 className="section-title">Why VisuaLogic?</h2>
        <div className="features-container">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

     
      {/* learning section */}
      <section id="about" className="learning-section">
        <div className="learning-content">
          <h2 className="section-title">Built for Learning</h2>
          <p>
            Every visualization includes detailed explanations, time complexity information, 
            and practical use cases to enhance your understanding.
          </p>
          <ul className="learning-features">
            <li>
              <ChevronRight size={18} className="list-icon" />
              Step-by-step visual explanations
            </li>
            <li>
              <ChevronRight size={18} className="list-icon" />
              Time and space complexity analysis
            </li>
            <li>
              <ChevronRight size={18} className="list-icon" />
              Real-world applications
            </li>
            <li>
              <ChevronRight size={18} className="list-icon" />
              Interactive code execution
            </li>
          </ul>
          <button className="cta-button primary" onClick={() => navigate('/methodology')}>
            Learn About Our Approach
          </button>
        </div>
      </section>



      {/* footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">VisuaLogic</div>
            <p>Making Data Structures visual and understandable</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Company</h4>
              <a href="/about">About Us</a>
              <a href="/contact">Contact</a>
              <a href="/careers">Careers</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} VisuaLogic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;