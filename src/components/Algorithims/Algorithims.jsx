import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart2, BookOpen, Code, Layers, GitMerge,
  Share2, Search, ArrowRight
} from 'lucide-react';
import './Algorithims.css';

const algorithims = [
  {
    title: "Sorting Algorithms",
    description: "Visualize and understand sorting algorithms step by step",
    icon: <BarChart2 size={32} />,
    path: "/sorting",
    available: false
  },
  {
    title: "Searching Algorithms",
    description: "Explore various searching algorithms and their efficiencies",
    icon: <Search size={32} />,
    path: "/searching",
    available: false
  },
  {
    title: "Graph Algorithms",
    description: "Dive into graph traversal and pathfinding algorithms",
    icon: <Share2 size={32} />,
    path: "/graphs",
    available: false
  },
  {
    title: "Dynamic Programming",
    description: "Learn dynamic programming with visual examples",
    icon: <BookOpen size={32} />,
    path: "/dynamic-programming",
    available: false
  },
  {
    title: "Greedy Algorithms",
    description: "Understand the principles of greedy algorithms",
    icon: <Layers size={32} />,
    path: "/greedy",
    available: false
  },
  {
    title: "Backtracking",
    description: "Explore backtracking techniques with interactive examples",
    icon: <GitMerge size={32} />,
    path: "/backtracking",
    available: false
  },
];

const Algorithims = () => {
  const navigate = useNavigate();
  const [animatedItems, setAnimatedItems] = useState({
    cards: false
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedItems({ cards: true });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (algo) => {
    const { icon, ...rest } = algo; 
    if (algo.available) {
      navigate(algo.path);
    } else {
      navigate('/coming-soon', { state: { algorithim: rest } });
    }
  };

  return (
    <div className="algorithims-page">
      <section id="algorithims" className="algorithims-section">
        <h2 className="section-title">Explore Algorithms</h2>
        <p className="section-description">
          Select an algorithm to start your learning experience with VisuaLogic!
        </p>
        <div className={`cards-grid ${animatedItems.cards ? 'animated' : ''}`}>
          {algorithims.map((algo, index) => (
            <div
              className={`algo-card ${!algo.available ? 'coming-soon' : ''}`}
              key={index}
              onClick={() => handleCardClick(algo)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="algo-card-icon">
                {algo.icon}
              </div>
              <h3 className="algo-card-title">{algo.title}</h3>
              <p className="algo-card-description">{algo.description}</p>
              <div className="algo-card-action">
                {algo.available ? (
                  <>Explore <ArrowRight size={16} className="arrow-icon" /></>
                ) : (
                  <>Coming Soon</>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Algorithims;

