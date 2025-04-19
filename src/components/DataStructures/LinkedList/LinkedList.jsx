import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as LinkIcon, ExternalLink, Code, Database, Server, Brain, ChevronRight } from 'lucide-react';
import './LinkedList.css';

const LinkedList = () => {
  const navigate = useNavigate();
  const [animatedItems, setAnimatedItems] = useState({
    hero: false,
    info: false,
    applications: false,
    facts: false,
    features: false
  });

  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimatedItems(prev => ({ ...prev, hero: true })), 100),
      setTimeout(() => setAnimatedItems(prev => ({ ...prev, info: true })), 400),
      setTimeout(() => setAnimatedItems(prev => ({ ...prev, features: true })), 550),
      setTimeout(() => setAnimatedItems(prev => ({ ...prev, applications: true })), 700),
      setTimeout(() => setAnimatedItems(prev => ({ ...prev, facts: true })), 1000)
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const realWorldExamples = [
    {
      title: "Music Players",
      description: "Streaming services like Spotify use linked lists to create playlists, allowing for easy insertion and removal of songs.",
      icon: <Server size={28} />
    },
    {
      title: "Web Browsing",
      description: "The back and forward buttons in browsers use linked lists to track your browsing history.",
      icon: <ExternalLink size={28} />
    },
    {
      title: "Memory Management",
      description: "Operating systems use linked lists to track blocks of free memory for allocation.",
      icon: <Database size={28} />
    },
    {
      title: "Symbol Tables",
      description: "Compilers use linked lists to manage symbol tables during program compilation.",
      icon: <Code size={28} />
    },
  ];

  const features = [
    {
      title: "Dynamic Size",
      description: "Linked lists can grow or shrink during execution without pre-allocation of memory."
    },
    {
      title: "Efficient Insertions",
      description: "Insert elements at the beginning in O(1) time, much faster than arrays."
    },
    {
      title: "No Waste",
      description: "Memory is allocated only when needed, avoiding the unused space common in arrays."
    },
    {
      title: "Flexible Deletion",
      description: "Remove elements efficiently from any position without shifting other elements, unlike arrays."
    }
    
  ];

  return (
    <div className="linked-list-home">
      <section className={`hero-section ${animatedItems.hero ? 'animated' : ''}`}>
        <div className="hero-content">
          <div className="hero-badge">Data Structures</div>
          <h1>Linked Lists</h1>
          <p className="hero-description">
            Discover the power of nodes and pointers in one of computer science's most fundamental data structures
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => navigate('/linked-list/visualizer')}>
              Interactive Visualizer <ChevronRight size={16} className="btn-icon" />
            </button>
            <button className="secondary-btn" onClick={() => navigate('/linked-list/operations')}>
              Solve Problems
            </button>
          </div>
        </div>
        <div className="hero-visual">

    {/* animation */}

          <svg width="100%" height="140" viewBox="0 0 500 140">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feOffset dx="0" dy="2" result="offsetBlur"/>
                <feFlood floodColor="var(--primary-color)" floodOpacity="0.3" result="glowColor"/>
                <feComposite in="glowColor" in2="offsetBlur" operator="in" result="softGlow"/>
                <feMerge>
                  <feMergeNode in="softGlow"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <g className="node-group">
              <rect x="20" y="50" width="90" height="50" rx="8" className="node-rect" filter="url(#glow)" />
              <text x="65" y="80" className="node-text">Head</text>
              <line x1="110" y1="75" x2="140" y2="75" className="node-line" strokeWidth="2" />
              <polygon points="140,75 130,70 130,80" className="node-arrow" />
            </g>
            <g className="node-group">
              <rect x="150" y="50" width="90" height="50" rx="8" className="node-rect" filter="url(#glow)" />
              <text x="195" y="80" className="node-text">Node 1</text>
              <line x1="240" y1="75" x2="270" y2="75" className="node-line" strokeWidth="2" />
              <polygon points="270,75 260,70 260,80" className="node-arrow" />
            </g>
            <g className="node-group">
              <rect x="280" y="50" width="90" height="50" rx="8" className="node-rect" filter="url(#glow)" />
              <text x="325" y="80" className="node-text">Node 2</text>
              <line x1="370" y1="75" x2="400" y2="75" className="node-line" strokeWidth="2" />
              <polygon points="400,75 390,70 390,80" className="node-arrow" />
            </g>
            <g className="node-group">
              <rect x="410" y="50" width="60" height="50" rx="8" className="node-rect final-node" filter="url(#glow)" />
              <text x="440" y="80" className="node-text">NULL</text>
            </g>
          </svg>
        </div>
      </section>

      {/* features */}

      <section className={`features-section ${animatedItems.features ? 'animated' : ''}`}>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-number">{index + 1}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* info */}

      <section className={`info-section ${animatedItems.info ? 'animated' : ''}`}>
        <div className="section-header">
          <h2>What is a Linked List?</h2>
          <div className="section-divider"></div>
        </div>
        <div className="info-content">
          <div className="info-text">
            <p>
              A linked list is a linear data structure where elements are stored in nodes that point to the next node in the sequence. 
              Unlike arrays, linked lists don't require contiguous memory allocation, making them more flexible for dynamic data.
            </p>
            <p>
              Each node in a linked list contains two key components:
            </p>
            <ul className="feature-list">
              <li><span className="list-icon">🔹</span><strong>Data:</strong> The value or information stored in the node</li>
              <li><span className="list-icon">🔹</span><strong>Next Pointer:</strong> A reference to the next node in the sequence</li>
            </ul>
            <p>
              Linked lists come in several varieties:
            </p>
            <ul className="feature-list">
              <li><span className="list-icon">🔹</span><strong>Singly Linked:</strong> Each node points to the next node</li>
              <li><span className="list-icon">🔹</span><strong>Doubly Linked:</strong> Each node points to both the next and previous nodes</li>
              <li><span className="list-icon">🔹</span><strong>Circular:</strong> The last node points back to the first node</li>
            </ul>
          </div>
          <div className="info-card">
            <div className="card-header">
              <LinkIcon size={24} className="card-icon" />
              <h3>Performance Characteristics</h3>
            </div>
            <table className="info-table">
              <tbody>
                <tr>
                  <td>Access Time</td>
                  <td><span className="complexity">O(n)</span></td>
                </tr>
                <tr>
                  <td>Insert/Delete at beginning</td>
                  <td><span className="complexity good">O(1)</span></td>
                </tr>
                <tr>
                  <td>Insert/Delete at end</td>
                  <td><span className="complexity">O(n)</span> or <span className="complexity good">O(1)</span> with tail pointer</td>
                </tr>
                <tr>
                  <td>Memory Usage</td>
                  <td>Higher than arrays (extra pointer storage)</td>
                </tr>
                <tr>
                  <td>Memory Allocation</td>
                  <td><span className="highlight">Dynamic (as needed)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* applications */}
      <section className={`applications-section ${animatedItems.applications ? 'animated' : ''}`}>
        <div className="section-header">
          <h2>Real-World Applications</h2>
          <div className="section-divider"></div>
        </div>
        <p className="section-intro">
          Linked lists are foundational in software development and power many everyday technologies:
        </p>
        <div className="applications-grid">
          {realWorldExamples.map((example, index) => (
            <div className="application-card" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="application-icon">
                {example.icon}
              </div>
              <h3>{example.title}</h3>
              <p>{example.description}</p>
            </div>
          ))}
        </div>
      </section>



          
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Explore Linked Lists?</h2>
          <p>Dive into our interactive visualizations and learn by doing!</p>
          <button className="cta-button" onClick={() => navigate('/linked-list/visualizer')}>
            Start Learning <ChevronRight size={16} className="btn-icon" />
          </button>
        </div>
        <div className="cta-decoration">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="blob-decoration">
            <path fill="var(--primary-light)" fillOpacity="0.2" d="M45.9,-69.2C59.5,-62.3,70.8,-49,77.2,-33.8C83.6,-18.6,85,-1.4,81.9,14.5C78.8,30.4,71.2,45,59.9,56.1C48.6,67.2,33.6,74.8,17.7,77.9C1.9,81,-14.8,79.7,-29.4,73.6C-44,67.5,-56.5,56.5,-65.2,43C-73.9,29.5,-78.8,13.7,-77.7,-1.1C-76.7,-15.9,-69.8,-29.9,-59.7,-39.6C-49.6,-49.4,-36.3,-54.9,-23.8,-61.6C-11.3,-68.3,0.4,-76.2,13.7,-77.8C27.1,-79.5,42.2,-74.9,45.9,-69.2Z" transform="translate(100 100)" />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default LinkedList;