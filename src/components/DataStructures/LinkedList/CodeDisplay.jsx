import React from 'react';
import './CodeDisplay.css';

const CodeDisplay = ({ codeLines }) => {
  if (!codeLines || codeLines.length === 0) {
    return null;
  }

  return (
    <div className="code-display">
      <pre className="code-block">
        {codeLines.map((line, index) => (
          <code key={index} className="code-line">
            {line}
          </code>
        ))}
      </pre>
    </div>
  );
};

export default CodeDisplay;