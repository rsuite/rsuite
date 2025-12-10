import React from 'react';

/**
 * Heading component thumbnail
 */
export const Heading: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="24" width="48" height="8" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="16" y="38" width="36" height="6" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.8" />
    <rect x="16" y="50" width="24" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.6" />
  </svg>
);

/**
 * Highlight component thumbnail
 */
export const Highlight: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="14"
      y="32"
      width="52"
      height="16"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="20" y="38" width="40" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * Kbd component thumbnail
 */
export const Kbd: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="14"
      y="24"
      width="32"
      height="32"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M24 46L30 34L36 46" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M26 42H34" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinecap="round" />

    <rect
      x="54"
      y="24"
      width="12"
      height="32"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
  </svg>
);

/**
 * Text component thumbnail
 */
export const Text: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="24" width="48" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="16" y="34" width="40" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.8" />
    <rect x="16" y="44" width="44" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.6" />
    <rect x="16" y="54" width="24" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.4" />
  </svg>
);
