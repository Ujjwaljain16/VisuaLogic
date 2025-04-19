import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart2, Link as LinkIcon, Layers, GitMerge,
  Share2, Search, ArrowRight
} from 'lucide-react';
import './DataStructures.css';

const dataStructures = [
  {
    title: "Linked Lists",
    description: "See node connections and modifications in real-time",
    icon: <LinkIcon size={32} />,
    path: "/linked-list",
    available: true
  },
  {
    title: "Arrays",
    description: "Visualize basic operations and sorting algorithms",
    icon: <BarChart2 size={32} />,
    path: "/arrays",
    available: false
  },
  {
    title: "Stacks & Queues",
    description: "Watch LIFO and FIFO principles in action",
    icon: <Layers size={32} />,
    path: "/stacks-queues",
    available: false
  },
  {
    title: "Trees",
    description: "Explore hierarchical structures with animated traversals",
    icon: <GitMerge size={32} />,
    path: "/trees",
    available: false
  },
  {
    title: "Graphs",
    description: "Discover pathfinding and network algorithms visually",
    icon: <Share2 size={32} />,
    path: "/graphs",
    available: false
  },
  {
    title: "Hash Tables",
    description: "Understand collision resolution and efficient lookups",
    icon: <Search size={32} />,
    path: "/hash-tables",
    available: false
  }
];

const DataStructures = () => {
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
  
  const handleCardClick = (ds) => {
    const { icon, ...rest } = ds; 
    if (ds.available) {
      navigate(ds.path);
    } else {
      navigate('/coming-soon', { state: { dataStructure: rest } });
    }
  };


  return (
    <div className="data-structures-page">
      <section id="data-structures" className="data-structures-section">
        <h2 className="section-title">Explore Data Structures</h2>
        <p className="section-description">
          Select a data structure to begin your journey into the VisuaLogic!
        </p>
        <div className={`cards-grid ${animatedItems.cards ? 'animated' : ''}`}>
          {dataStructures.map((ds, index) => (
            <div
              className={`ds-card ${!ds.available ? 'coming-soon' : ''}`}
              key={index}
              onClick={() => handleCardClick(ds)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="ds-card-icon">
                {ds.icon}
              </div>
              <h3 className="ds-card-title">{ds.title}</h3>
              <p className="ds-card-description">{ds.description}</p>
              <div className="ds-card-action">
                {ds.available ? (
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

export default DataStructures;