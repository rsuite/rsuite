import React from 'react';

/**
 * Box 组件缩略图
 */
export const Box: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="15"
      width="50"
      height="50"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect
      x="25"
      y="25"
      width="30"
      height="30"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * Center 组件缩略图
 */
export const Center: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="10"
      width="60"
      height="60"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeDasharray="4 2"
    />
    <rect
      x="25"
      y="25"
      width="30"
      height="30"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="40"
      y1="10"
      x2="40"
      y2="25"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="40"
      y1="55"
      x2="40"
      y2="70"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="10"
      y1="40"
      x2="25"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="55"
      y1="40"
      x2="70"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
  </svg>
);

/**
 * Divider 组件缩略图
 */
export const Divider: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="20"
      width="50"
      height="10"
      rx="2"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="15"
      y1="40"
      x2="65"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect
      x="15"
      y="50"
      width="50"
      height="10"
      rx="2"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
  </svg>
);

/**
 * Frame 组件缩略图
 */
export const Frame: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="10"
      width="60"
      height="60"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect
      x="10"
      y="10"
      width="60"
      height="12"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="10"
      y="58"
      width="60"
      height="12"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="10"
      y="22"
      width="15"
      height="36"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * Grid 组件缩略图
 */
export const Grid: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="10"
      width="60"
      height="60"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeDasharray="4 2"
    />
    <rect
      x="15"
      y="15"
      width="25"
      height="25"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="45"
      y="15"
      width="20"
      height="25"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="15"
      y="45"
      width="15"
      height="20"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="35"
      y="45"
      width="30"
      height="20"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * Stack 组件缩略图
 */
export const Stack: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="10"
      width="60"
      height="60"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeDasharray="4 2"
    />
    <rect
      x="20"
      y="15"
      width="40"
      height="15"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="20"
      y="35"
      width="40"
      height="10"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="20"
      y="50"
      width="40"
      height="15"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
  </svg>
);
