import React from 'react';

const Logo = ({ size = 32, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="64" height="64" rx="16" fill="#9b4dca"/>
      <rect x="8" y="8" width="48" height="48" rx="8" fill="white"/>
      <circle cx="20" cy="20" r="4" fill="#9b4dca"/>
      <circle cx="44" cy="20" r="4" fill="#9b4dca"/>
      <circle cx="32" cy="44" r="4" fill="#9b4dca"/>
      <path 
        d="M16 36L28 48L48 28" 
        stroke="#9b4dca" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logo;
