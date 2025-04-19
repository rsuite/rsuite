import React from 'react';

/**
 * Button 组件缩略图
 */
export const Button: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="30"
      width="60"
      height="20"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <text
      x="40"
      y="45"
      fontSize="12"
      textAnchor="middle"
      fill="var(--rs-thumbnail-color-high)"
      fontWeight="bold"
    >
      Button
    </text>
  </svg>
);

/**
 * IconButton 组件缩略图
 */
export const IconButton: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="25"
      y="25"
      width="30"
      height="30"
      rx="15"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path
      d="M40 32V48M32 40H48"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * ButtonGroup 组件缩略图
 */
export const ButtonGroup: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left button */}
    <rect x="20" y="30" width="13.33" height="20" rx="4" fill="var(--rs-thumbnail-bg-secondary)" />

    {/* Middle button - Active */}
    <rect
      x="33.33"
      y="30"
      width="13.34"
      height="20"
      rx="0"
      fill="var(--rs-thumbnail-color-primary)"
    />

    {/* Right button */}
    <rect
      x="46.67"
      y="30"
      width="13.33"
      height="20"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
    />

    {/* Divider lines */}
    <line
      x1="33.33"
      y1="30"
      x2="33.33"
      y2="50"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <line
      x1="46.67"
      y1="30"
      x2="46.67"
      y2="50"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />

    {/* Simple ButtonGroup */}
    <rect
      x="20"
      y="30"
      width="40"
      height="20"
      rx="4"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
  </svg>
);
