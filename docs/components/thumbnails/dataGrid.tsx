import React from 'react';

/**
 * Basic Table component thumbnail
 */
export const BasicTable: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="16"
      width="60"
      height="48"
      rx="4"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M10 32H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M10 48H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M30 16V64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M50 16V64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    <rect x="14" y="22" width="12" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="34" y="22" width="12" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="54" y="22" width="12" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * Virtual Table component thumbnail
 */
export const VirtualTable: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="16"
      width="60"
      height="48"
      rx="4"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M10 28H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M10 40H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M10 52H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    <path d="M30 16V64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M50 16V64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    <rect x="66" y="24" width="4" height="32" rx="2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * Tree Table component thumbnail
 */
export const TreeTable: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="16"
      width="60"
      height="48"
      rx="4"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M10 32H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M10 48H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    <path d="M30 16V64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M50 16V64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    <circle cx="16" cy="24" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="20" y="23" width="8" height="2" rx="1" fill="var(--rs-thumbnail-color-primary)" />

    <circle cx="20" cy="40" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="24" y="39" width="4" height="2" rx="1" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M16 26V40H18" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" fill="none" />

    <circle cx="20" cy="56" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="24" y="55" width="4" height="2" rx="1" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M16 40V56H18" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" fill="none" />
  </svg>
);

/**
 * Sticky Table component thumbnail
 */
export const StickyTable: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="16"
      width="60"
      height="48"
      rx="4"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M10 32H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M10 48H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    <path d="M30 16V64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M50 16V64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    <rect x="10" y="16" width="60" height="16" rx="4" fill="var(--rs-thumbnail-bg-secondary)" opacity="0.3" />
    <rect x="10" y="16" width="20" height="48" rx="4" fill="var(--rs-thumbnail-bg-secondary)" opacity="0.3" />
  </svg>
);

/**
 * Editable Table component thumbnail
 */
export const EditableTable: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="16"
      width="60"
      height="48"
      rx="4"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M10 32H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M10 48H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    <path d="M30 16V64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M50 16V64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    <rect x="34" y="36" width="12" height="8" rx="1" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M36 40H44" stroke="var(--rs-thumbnail-bg)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Filterable Table component thumbnail
 */
export const FilterableTable: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="16"
      width="60"
      height="48"
      rx="4"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M10 32H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M10 48H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    <path d="M30 16V64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <path d="M50 16V64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    <path d="M22 22L24 26L26 22H22Z" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M42 22L44 26L46 22H42Z" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M62 22L64 26L66 22H62Z" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);
