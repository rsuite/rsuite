import React from 'react';

/**
 * Form component thumbnail
 */
export const Form: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="10"
      width="60"
      height="60"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="18" y="18" width="44" height="8" rx="2" fill="none" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <rect x="18" y="32" width="44" height="8" rx="2" fill="none" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <rect x="18" y="46" width="44" height="8" rx="2" fill="none" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <rect x="42" y="58" width="20" height="6" rx="2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * FormValidation component thumbnail
 */
export const FormValidation: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="10"
      width="60"
      height="60"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="18" y="18" width="44" height="8" rx="2" fill="none" stroke="var(--rs-red-500)" strokeWidth="1.5" />
    <path d="M18 29H38" stroke="var(--rs-red-500)" strokeWidth="1.5" strokeLinecap="round" />

    <rect x="18" y="34" width="44" height="8" rx="2" fill="none" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <rect x="42" y="58" width="20" height="6" rx="2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * Schema component thumbnail
 */
export const Schema: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="10"
      width="60"
      height="60"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />

    <rect x="18" y="20" width="8" height="8" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M30 24H58" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" />

    <rect x="18" y="36" width="8" height="8" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M30 40H58" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" />

    <rect x="18" y="52" width="8" height="8" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M30 56H58" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
