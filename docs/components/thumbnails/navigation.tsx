import React from 'react';

/**
 * Affix component thumbnail
 */
export const Affix: React.FC = () => (
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
      width="48"
      height="14"
      rx="2"
      fill="var(--rs-thumbnail-color-primary)"
    />
    <path d="M16 40H64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeDasharray="2 2" />
    <path d="M16 50H64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeDasharray="2 2" />
    <path d="M16 60H64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeDasharray="2 2" />
  </svg>
);

/**
 * Breadcrumb component thumbnail
 */
export const Breadcrumb: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="34" width="16" height="12" rx="2" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M30 36L34 40L30 44" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

    <rect x="38" y="34" width="16" height="12" rx="2" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M58 36L62 40L58 44" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

    <rect x="66" y="34" width="12" height="12" rx="2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * Dropdown component thumbnail
 */
export const Dropdown: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="16"
      y="16"
      width="48"
      height="20"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M54 24L50 28L46 24" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

    <rect
      x="16"
      y="40"
      width="48"
      height="28"
      rx="4"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="22" y="46" width="36" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="22" y="56" width="28" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
  </svg>
);

/**
 * Link component thumbnail
 */
export const Link: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="38" width="40" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M20 48H60" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
  </svg>
);

/**
 * Menu component thumbnail
 */
export const Menu: React.FC = () => (
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
    <rect x="18" y="22" width="24" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M62 24L58 28L62 32" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

    <rect x="18" y="38" width="44" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
    <rect x="18" y="54" width="36" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
  </svg>
);

/**
 * Nav component thumbnail
 */
export const Nav: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 32H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" opacity="0.3" />

    <rect x="16" y="24" width="16" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M16 32H32" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />

    <rect x="40" y="24" width="12" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
    <rect x="60" y="24" width="14" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />

    <rect
      x="10"
      y="38"
      width="60"
      height="28"
      rx="4"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeDasharray="4 4"
    />
  </svg>
);

/**
 * Navbar component thumbnail
 */
export const Navbar: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="16"
      width="60"
      height="16"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="16" y="22" width="12" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="48" y="22" width="8" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
    <rect x="60" y="22" width="4" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />

    <rect
      x="10"
      y="38"
      width="60"
      height="28"
      rx="4"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeDasharray="4 4"
    />
  </svg>
);

/**
 * Sidenav component thumbnail
 */
export const Sidenav: React.FC = () => (
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
    />
    <path d="M30 10V70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />

    <rect x="16" y="20" width="8" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="16" y="30" width="8" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
    <rect x="16" y="40" width="8" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
    <rect x="16" y="60" width="8" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
  </svg>
);

/**
 * Steps component thumbnail
 */
export const Steps: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="40" r="10" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M16 40L19 43L24 37" stroke="var(--rs-thumbnail-bg-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    <path d="M30 40H40" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />

    <circle cx="50" cy="40" r="9" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M50 36V44M46 40H54" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinecap="round" />

    <path d="M60 40H70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeDasharray="2 2" />
  </svg>
);

/**
 * Pagination component thumbnail
 */
export const Pagination: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="28" width="12" height="24" rx="2" fill="none" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M17 36L13 40L17 44" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

    <rect x="26" y="28" width="12" height="24" rx="2" fill="var(--rs-thumbnail-color-primary)" />

    <rect x="42" y="28" width="12" height="24" rx="2" fill="none" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />

    <rect x="58" y="28" width="12" height="24" rx="2" fill="none" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M63 36L67 40L63 44" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
