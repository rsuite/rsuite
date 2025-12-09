import React from 'react';

/**
 * Box component thumbnail
 */
export const Box: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="16"
      y="16"
      width="48"
      height="48"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
  </svg>
);

/**
 * Center component thumbnail
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
      strokeWidth="2"
      strokeDasharray="4 4"
    />
    <rect
      x="28"
      y="28"
      width="24"
      height="24"
      rx="4"
      fill="var(--rs-thumbnail-color-primary)"
    />
    <path d="M40 10V28" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeDasharray="2 2" />
    <path d="M40 52V70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeDasharray="2 2" />
    <path d="M10 40H28" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeDasharray="2 2" />
    <path d="M52 40H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeDasharray="2 2" />
  </svg>
);

/**
 * Divider component thumbnail
 */
export const Divider: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="24" width="40" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
    <path d="M10 40H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <rect x="20" y="52" width="40" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
  </svg>
);

/**
 * Frame component thumbnail
 */
export const Frame: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="12"
      width="60"
      height="56"
      rx="4"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M10 24H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M10 56H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M26 24V56" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <rect x="14" y="16" width="20" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="30" y="28" width="20" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="30" y="36" width="30" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
    <rect x="30" y="44" width="24" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
  </svg>
);

/**
 * Grid component thumbnail
 */
export const Grid: React.FC = () => (
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
    <rect
      x="16"
      y="16"
      width="20"
      height="20"
      rx="2"
      fill="var(--rs-thumbnail-color-primary)"
      opacity="0.8"
    />
    <rect
      x="44"
      y="16"
      width="20"
      height="20"
      rx="2"
      fill="var(--rs-thumbnail-color-primary)"
      opacity="0.6"
    />
    <rect
      x="16"
      y="44"
      width="20"
      height="20"
      rx="2"
      fill="var(--rs-thumbnail-color-primary)"
      opacity="0.4"
    />
    <rect
      x="44"
      y="44"
      width="20"
      height="20"
      rx="2"
      fill="var(--rs-thumbnail-color-primary)"
      opacity="0.2"
    />
  </svg>
);

/**
 * Stack component thumbnail
 */
export const Stack: React.FC = () => (
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
    <rect x="20" y="20" width="40" height="10" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="20" y="35" width="40" height="10" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.6" />
    <rect x="20" y="50" width="40" height="10" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.3" />
  </svg>
);
