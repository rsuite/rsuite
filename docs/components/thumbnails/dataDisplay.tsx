import React from 'react';

/**
 * Accordion component thumbnail
 */
export const Accordion: React.FC = () => (
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
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <circle cx="34" cy="52" r="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.3" />
    <circle cx="40" cy="52" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="46" cy="52" r="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.3" />
    <path d="M16 40L20 36" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 40L20 44" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M64 40L60 36" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M64 40L60 44" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * List component thumbnail
 */
export const List: React.FC = () => (
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
    <path d="M10 30H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M10 50H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    <circle cx="20" cy="20" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="28" y="18" width="32" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />

    <circle cx="20" cy="40" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="28" y="38" width="32" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />

    <circle cx="20" cy="60" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="28" y="58" width="32" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * Timeline component thumbnail
 */
export const Timeline: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="28" y1="16" x2="28" y2="64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" opacity="0.3" />

    <circle cx="28" cy="20" r="4" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <rect x="40" y="18" width="32" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />

    <circle cx="28" cy="40" r="4" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="40" y="38" width="24" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />

    <circle cx="28" cy="60" r="4" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <rect x="40" y="58" width="20" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
  </svg>
);

/**
 * Panel component thumbnail
 */
export const Panel: React.FC = () => (
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
    <path d="M10 32H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <rect x="18" y="22" width="20" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="18" y="40" width="44" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
    <rect x="18" y="50" width="30" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
  </svg>
);

/**
 * Card component thumbnail
 */
export const Card: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="16"
      y="16"
      width="48"
      height="48"
      rx="4"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="22" y="46" width="36" height="12" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.1" />
    <rect x="22" y="22" width="24" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="22" y="30" width="16" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
  </svg>
);

/**
 * Stat component thumbnail
 */
export const Stat: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="20"
      width="60"
      height="40"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="18" y="28" width="20" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
    <rect x="18" y="38" width="28" height="6" rx="3" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="18" y="50" width="44" height="2" rx="1" fill="var(--rs-thumbnail-color-primary)" opacity="0.2" />
  </svg>
);

/**
 * Tag component thumbnail
 */
export const Tag: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="14"
      y="28"
      width="52"
      height="24"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="22" y="38" width="24" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M52 36L56 40L52 44" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
