import React from 'react';

/**
 * Accordion component thumbnail
 * Note: This is a duplicate of the one in dataDisplay.tsx,
 * but included here for organizational purposes
 */
export const DisclosureAccordion: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="16"
      width="60"
      height="14"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path
      d="M60 19L64 23L60 27"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="10"
      y="34"
      width="60"
      height="14"
      rx="2"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path
      d="M60 37L64 41L60 45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="10"
      y="52"
      width="60"
      height="14"
      rx="2"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path
      d="M60 55L64 59L60 63"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="16" y="21" width="24" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="16" y="39" width="24" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
    <rect x="16" y="57" width="24" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
  </svg>
);

/**
 * Tabs component thumbnail
 */
export const Tabs: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="28"
      width="60"
      height="36"
      rx="4"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M10 28H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M10 40H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    <path d="M10 28V20C10 17.7909 11.7909 16 14 16H26C28.2091 16 30 17.7909 30 20V28" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M30 28V22C30 19.7909 31.7909 18 34 18H46C48.2091 18 50 19.7909 50 22V28" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" opacity="0.5" />
    <path d="M50 28V22C50 19.7909 51.7909 18 54 18H66C68.2091 18 70 19.7909 70 22V28" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" opacity="0.5" />

    <rect x="16" y="46" width="32" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="16" y="54" width="24" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
  </svg>
);

/**
 * VisuallyHidden component thumbnail
 */
export const VisuallyHidden: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="28"
      width="60"
      height="24"
      rx="4"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeDasharray="4 4"
    />
    <path d="M25 40L35 40" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <circle cx="40" cy="40" r="8" fill="none" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M45 40L55 40" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M34 34L46 46" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
  </svg>
);
