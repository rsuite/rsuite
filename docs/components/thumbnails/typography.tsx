import React from 'react';

/**
 * Heading 组件缩略图
 */
export const Heading: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="20" y="30" fontSize="16" fill="var(--rs-thumbnail-color-high)" fontWeight="bold">
      H1
    </text>
    <text x="20" y="45" fontSize="14" fill="var(--rs-thumbnail-color-high)" fontWeight="bold">
      H2
    </text>
    <text x="20" y="58" fontSize="12" fill="var(--rs-thumbnail-color-high)" fontWeight="bold">
      H3
    </text>
    <line
      x1="40"
      y1="30"
      x2="60"
      y2="30"
      stroke="var(--rs-primary-300)"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="40"
      y1="45"
      x2="55"
      y2="45"
      stroke="var(--rs-primary-300)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="40"
      y1="58"
      x2="50"
      y2="58"
      stroke="var(--rs-primary-300)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Highlight 组件缩略图
 */
export const Highlight: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="20"
      y="30"
      width="40"
      height="20"
      rx="2"
      fill="var(--rs-yellow-100)"
      stroke="var(--rs-yellow-500)"
      strokeWidth="1.5"
    />
    <text
      x="40"
      y="45"
      fontSize="12"
      textAnchor="middle"
      fill="var(--rs-yellow-700)"
      fontWeight="bold"
    >
      Text
    </text>
  </svg>
);

/**
 * Kbd 组件缩略图
 */
export const Kbd: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* First key with padding */}
    <rect
      x="15"
      y="25"
      width="22"
      height="22"
      rx="4"
      fill="var(--rs-gray-100)"
      stroke="var(--rs-gray-500)"
      strokeWidth="1.5"
    />
    <text
      x="26"
      y="39"
      fontSize="12"
      textAnchor="middle"
      fill="var(--rs-gray-700)"
      fontWeight="bold"
    >
      A
    </text>

    {/* Second key with padding */}
    <rect
      x="45"
      y="25"
      width="22"
      height="22"
      rx="4"
      fill="var(--rs-gray-100)"
      stroke="var(--rs-gray-500)"
      strokeWidth="1.5"
    />
    <text
      x="56"
      y="39"
      fontSize="10"
      textAnchor="middle"
      fill="var(--rs-gray-700)"
      fontWeight="bold"
    >
      Ctrl
    </text>
  </svg>
);

/**
 * Text 组件缩略图
 */
export const Text: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line
      x1="20"
      y1="25"
      x2="60"
      y2="25"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="35"
      x2="55"
      y2="35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="45"
      x2="50"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="55"
      x2="40"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
