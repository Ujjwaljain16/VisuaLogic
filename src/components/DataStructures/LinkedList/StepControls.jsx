import React from 'react';
import { useLinkedList } from '../../../context/LinkedListContext';
import './StepControls.css';

const StepControls = () => {
  const { 
    state, 
    stepForward, 
    stepBackward, 
    resetVisualization, 
    playAnimation, 
    setAnimationSpeed 
  } = useLinkedList();
  
  const { currentStep, operations, isAnimating, animationSpeed } = state;
  
  const handleSpeedChange = (e) => {
    setAnimationSpeed(parseInt(e.target.value));
  };

  return (
    <div className="step-controls">
      <div className="controls-header">
        <h3 className="controls-title">Step Controls</h3>
        <div className="step-counter">
          Step {currentStep + 1} of {operations.length}
        </div>
      </div>

      <div className="controls-buttons">
        <button 
          className="control-button" 
          onClick={resetVisualization} 
          disabled={currentStep < 0 || isAnimating}
        >
          Reset
        </button>
        
        <button 
          className="control-button" 
          onClick={stepBackward} 
          disabled={currentStep < 0 || isAnimating}
        >
          Previous
        </button>
        
        <button 
          className="control-button play-button" 
          onClick={playAnimation} 
          disabled={isAnimating || currentStep >= operations.length - 1 || operations.length === 0}
        >
          Play
        </button>
        
        <button 
          className="control-button" 
          onClick={stepForward} 
          disabled={currentStep >= operations.length - 1 || isAnimating || operations.length === 0}
        >
          Next
        </button>
      </div>

      <div className="speed-control">
        <label htmlFor="animation-speed" className="speed-label">Animation Speed:</label>
        <input
          type="range"
          id="animation-speed"
          min="200"
          max="2000"
          step="200"
          value={animationSpeed}
          onChange={handleSpeedChange}
          className="speed-slider"
          disabled={isAnimating}
        />
        <span className="speed-value">{animationSpeed}ms</span>
      </div>
    </div>
  );
};

export default StepControls;