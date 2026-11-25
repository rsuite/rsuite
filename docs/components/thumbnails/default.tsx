import React from 'react';

/**
 * 默认缩略图组件，当没有找到对应组件的缩略图时使用
 */
export const Default: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="10"
      width="60"
      height="60"
      rx="4"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeDasharray="4 4"
    />
    <path
      d="M30 40H50M40 30V50"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
