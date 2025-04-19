import React from 'react';
import './Node.css';

const Node = ({ node, listType, isLast = false }) => {
  const {
    id,
    data,
    isFirst,
    isHighlighted,
    isCircular
  } = node;

  const getNodeClass = () => {
    let baseClass = 'node';
    
    if (isHighlighted) {
      return `${baseClass} node-highlighted`;
    }
    
    if (isFirst) {
      return `${baseClass} node-head`;
    }
    
    return baseClass;
  };

  return (
    <div className="node-container">
      <div className={getNodeClass()}>
        <div className="node-data">{data}</div>
        <div className="node-id">ID: {id.substring(0, 4)}</div>
      </div>
      
    
      {(!isLast || isCircular || listType === 'circular') && (
        <div className="node-arrow">
          <div className="arrow-shaft"></div>
          <div className="arrow-point"></div>
        </div>
      )}
      
      {isLast && !isCircular && listType !== 'circular' && (
        <div className="null-terminator">NULL</div>
      )}
      
      {listType === 'doubly' && !isFirst && (
        <div className="node-back-arrow">
          <div className="back-arrow-shaft"></div>
          <div className="back-arrow-point"></div>
        </div>
      )}
      
      {(isLast && (isCircular || listType === 'circular')) && (
        <div className="circular-arrow">
          <svg viewBox="0 0 100 50" className="circular-svg">
            <path 
              d="M 0,25 C 25,50 75,50 100,25" 
              className="circular-path"
            />
            <polygon 
              points="5,28 0,25 5,22" 
              className="circular-head"
              transform="rotate(30, 0, 25)"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Node;