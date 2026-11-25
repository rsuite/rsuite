import React from 'react';

/**
 * Avatar component thumbnail
 */
export const Avatar: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="16"
      width="60"
      height="48"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <circle cx="40" cy="34" r="8" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M26 54C26 46 32 46 40 46C48 46 54 46 54 54" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * Icon component thumbnail
 */
export const Icon: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="16" width="20" height="20" rx="4" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M22 26H30M26 22V30" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinecap="round" />

    <rect x="44" y="16" width="20" height="20" rx="4" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <circle cx="54" cy="26" r="4" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />

    <rect x="16" y="44" width="20" height="20" rx="4" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M22 54H30" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinecap="round" />

    <rect x="44" y="44" width="20" height="20" rx="4" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M49 49L59 59M59 49L49 59" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * Image component thumbnail
 */
export const Image: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="16"
      width="60"
      height="48"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <circle cx="30" cy="32" r="6" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M10 52L26 40L40 50L60 36L70 42" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M40 64L50 56L70 64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
