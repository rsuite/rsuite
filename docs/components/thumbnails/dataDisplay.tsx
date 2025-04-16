import React from 'react';

/**
 * Accordion component thumbnail
 */
export const Accordion: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <path
      d="M55 22.5L50 17.5L45 22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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
    <path
      d="M45 40L50 45L55 40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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
    <path
      d="M45 57.5L50 62.5L55 57.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Carousel component thumbnail
 */
export const Carousel: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="20"
      width="60"
      height="40"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect
      x="20"
      y="30"
      width="40"
      height="20"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <circle cx="35" cy="55" r="2" fill="var(--rs-primary-300)" />
    <circle cx="40" cy="55" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="45" cy="55" r="2" fill="var(--rs-primary-300)" />
    <path
      d="M15 40L5 40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M65 40L75 40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * List component thumbnail
 */
export const List: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="15"
      width="50"
      height="50"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="30"
      x2="65"
      y2="30"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <line
      x1="15"
      y1="45"
      x2="65"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <line
      x1="15"
      y1="60"
      x2="65"
      y2="60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <circle cx="25" cy="22.5" r="3" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="35"
      y1="22.5"
      x2="55"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <circle cx="25" cy="37.5" r="3" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="35"
      y1="37.5"
      x2="55"
      y2="37.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <circle cx="25" cy="52.5" r="3" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="35"
      y1="52.5"
      x2="55"
      y2="52.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * Timeline component thumbnail
 */
export const Timeline: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="30" y1="15" x2="30" y2="65" stroke="var(--rs-primary-300)" strokeWidth="2" />
    <circle cx="30" cy="20" r="5" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="35"
      y1="20"
      x2="60"
      y2="20"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <circle cx="30" cy="40" r="5" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="35"
      y1="40"
      x2="55"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <circle cx="30" cy="60" r="5" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="35"
      y1="60"
      x2="50"
      y2="60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * Panel component thumbnail
 */
export const Panel: React.FC = () => (
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
      x2="55"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line x1="25" y1="40" x2="55" y2="40" stroke="var(--rs-primary-300)" strokeWidth="1.5" />
    <line x1="25" y1="50" x2="45" y2="50" stroke="var(--rs-primary-300)" strokeWidth="1.5" />
  </svg>
);

/**
 * Card component thumbnail
 */
export const Card: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Simple card without header/footer */}
    <rect
      x="15"
      y="15"
      width="50"
      height="50"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Card content */}
    <line
      x1="25"
      y1="25"
      x2="55"
      y2="25"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line x1="25" y1="35" x2="45" y2="35" stroke="var(--rs-primary-300)" strokeWidth="1.5" />

    {/* Card image/content area */}
    <rect
      x="25"
      y="42"
      width="30"
      height="15"
      rx="2"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
  </svg>
);

/**
 * Stat component thumbnail
 */
export const Stat: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stat card container */}
    <rect
      x="15"
      y="20"
      width="50"
      height="40"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Title */}
    <line
      x1="20"
      y1="30"
      x2="40"
      y2="30"
      stroke="var(--rs-primary-300)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Main statistic area - represented by a bold line */}
    <line
      x1="20"
      y1="42"
      x2="35"
      y2="42"
      stroke="var(--rs-thumbnail-color-high)"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* Secondary info */}
    <line
      x1="40"
      y1="42"
      x2="55"
      y2="42"
      stroke="var(--rs-primary-300)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Divider */}
    <line
      x1="20"
      y1="50"
      x2="55"
      y2="50"
      stroke="var(--rs-thumbnail-bg-secondary)"
      strokeWidth="1"
      strokeLinecap="round"
    />

    {/* Bottom content */}
    <line
      x1="20"
      y1="55"
      x2="50"
      y2="55"
      stroke="var(--rs-primary-300)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Tag component thumbnail
 */
export const Tag: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="20"
      y="30"
      width="40"
      height="20"
      rx="10"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="30"
      y1="40"
      x2="45"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle
      cx="55"
      cy="40"
      r="3"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M53 38L57 42M57 38L53 42"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);
