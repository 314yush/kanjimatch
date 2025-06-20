import React from 'react';

const GemIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 2 7 12 22 22 7 12 2" fill="#38bdf8" stroke="#0ea5e9" />
    <polyline points="2 7 12 12 22 7" stroke="#0ea5e9" />
  </svg>
);

export default GemIcon; 