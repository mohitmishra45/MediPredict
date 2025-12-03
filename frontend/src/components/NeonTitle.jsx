import React from 'react';
import './NeonTitle.css';

const NeonTitle = () => {
  const prefix = "YOUR";
  const mainText = "MEDICAL ASSISTANT";

  // Helper to render characters with delay
  const renderChars = (text, baseDelay = 0, className = "") => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={`neon-char ${className}`}
        style={{ animationDelay: `${baseDelay + (index * 0.05)}s` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div className="neon-title-container">
      <h2 className="neon-title-text">
        <span className="neon-title-prefix" style={{ marginRight: '0.5rem' }}>
          {renderChars(prefix, 0)}
        </span>
        <span className="neon-title-main">
          {renderChars(mainText, 0.5)} {/* Start after prefix finishes */}
        </span>
      </h2>
    </div>
  );
};

export default NeonTitle;
