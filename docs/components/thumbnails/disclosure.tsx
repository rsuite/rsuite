import React from 'react';

/**
 * Accordion component thumbnail
 * Note: This is a duplicate of the one in dataDisplay.tsx,
 * but included here for organizational purposes
 */
export const DisclosureAccordion: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* First panel - expanded */}
    <rect
      x="15"
      y="15"
      width="50"
      height="15"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="25"
      y1="22.5"
      x2="40"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Indicator for expanded panel */}
    <circle
      cx="53"
      cy="22.5"
      r="3"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />

    {/* Second panel - collapsed */}
    <rect
      x="15"
      y="32.5"
      width="50"
      height="15"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="25"
      y1="40"
      x2="40"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Indicator for collapsed panel */}
    <circle
      cx="53"
      cy="40"
      r="3"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />

    {/* Third panel - collapsed */}
    <rect
      x="15"
      y="50"
      width="50"
      height="15"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="25"
      y1="57.5"
      x2="40"
      y2="57.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Indicator for collapsed panel */}
    <circle
      cx="53"
      cy="57.5"
      r="3"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
  </svg>
);

/**
 * Tabs component thumbnail
 */
export const Tabs: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="25"
      width="50"
      height="40"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="15"
      y="15"
      width="15"
      height="10"
      rx="4 4 0 0"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="30"
      y="15"
      width="15"
      height="10"
      rx="4 4 0 0"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="45"
      y="15"
      width="15"
      height="10"
      rx="4 4 0 0"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="22.5"
      y1="20"
      x2="22.5"
      y2="20"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="37.5"
      y1="20"
      x2="37.5"
      y2="20"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="52.5"
      y1="20"
      x2="52.5"
      y2="20"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="25"
      y1="40"
      x2="55"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="25"
      y1="50"
      x2="45"
      y2="50"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * VisuallyHidden component thumbnail
 */
export const VisuallyHidden: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="30"
      width="50"
      height="20"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeDasharray="3 2"
    />
    <circle
      cx="40"
      cy="40"
      r="10"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeDasharray="3 2"
    />
    <path
      d="M30 40L50 40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="3 2"
    />
    <path
      d="M40 30L40 50"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="3 2"
    />
    <path
      d="M30 30L50 50"
      stroke="var(--rs-thumbnail-color-high)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M50 30L30 50"
      stroke="var(--rs-thumbnail-color-high)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
