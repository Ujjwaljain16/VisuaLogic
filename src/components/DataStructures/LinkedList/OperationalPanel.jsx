import React from 'react';
import { useLinkedList } from '../../../../context/LinkedListContext';
import CodeDisplay from './CodeDisplay';
import StepControls from './StepControls';
import './OperationPanel.css';

const OperationPanel = () => {
  const { state } = useLinkedList();
  const { operations, currentStep } = state;

  const currentOperation = currentStep >= 0 && currentStep < operations.length 
    ? operations[currentStep] 
    : null;

  return (
    <div className="operation-panel">
      <div className="panel-content">
        <div className="operation-description">
          <h3 className="panel-title">Current Operation</h3>
          {currentOperation ? (
            <p className="description-text">{currentOperation.description}</p>
          ) : (
            <p className="description-text empty-state">
              No operation is being performed. Select an operation to visualize.
            </p>
          )}
        </div>

        {currentOperation && (
          <CodeDisplay codeLines={currentOperation.codeLines} />
        )}
      </div>
      
      <StepControls />
    </div>
  );
};

export default OperationPanel;