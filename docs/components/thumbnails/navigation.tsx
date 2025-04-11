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
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeDasharray="4 2"
    />
    <rect
      x="20"
      y="20"
      width="40"
      height="15"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="10"
      y1="20"
      x2="15"
      y2="20"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="10"
      y1="35"
      x2="15"
      y2="35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="65"
      y1="20"
      x2="70"
      y2="20"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="65"
      y1="35"
      x2="70"
      y2="35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M25 27.5L35 27.5M45 27.5L55 27.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Breadcrumb component thumbnail
 */
export const Breadcrumb: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* First item */}
    <rect
      x="5"
      y="25"
      width="18"
      height="25"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* First separator */}
    <text x="28" y="42" fontSize="16" textAnchor="middle" fill="var(--rs-gray-500)">
      ›
    </text>

    {/* Second item */}
    <rect
      x="32"
      y="25"
      width="18"
      height="25"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Second separator */}
    <text x="55" y="42" fontSize="16" textAnchor="middle" fill="var(--rs-gray-500)">
      ›
    </text>

    {/* Third item */}
    <rect
      x="59"
      y="25"
      width="18"
      height="25"
      rx="4"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * Dropdown component thumbnail
 */
export const Dropdown: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Dropdown button */}
    <rect
      x="20"
      y="15"
      width="40"
      height="15"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Dropdown arrow */}
    <path
      d="M52 22.5L50 19.5L54 19.5"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Dropdown menu */}
    <rect
      x="20"
      y="30"
      width="40"
      height="35"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Menu items */}
    <rect x="22" y="32" width="36" height="8" rx="2" fill="var(--rs-thumbnail-bg)" />
    <line
      x1="25"
      y1="36"
      x2="55"
      y2="36"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <line
      x1="25"
      y1="45"
      x2="55"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="25"
      y1="54"
      x2="45"
      y2="54"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Link component thumbnail
 */
export const Link: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Link text */}
    <text
      x="40"
      y="40"
      fontSize="12"
      textAnchor="middle"
      fill="var(--rs-thumbnail-color-primary)"
      textDecoration="underline"
    >
      Visit Page
    </text>

    {/* Underline */}
    <line
      x1="20"
      y1="42"
      x2="60"
      y2="42"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
  </svg>
);

/**
 * Menu component thumbnail
 */
export const Menu: React.FC = () => (
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
    <rect
      x="15"
      y="15"
      width="50"
      height="10"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="20"
      y1="35"
      x2="60"
      y2="35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="45"
      x2="60"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="55"
      x2="60"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <rect x="20" y="25" width="10" height="5" rx="1" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * Nav component thumbnail
 */
export const Nav: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="20"
      width="60"
      height="10"
      rx="2"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect x="15" y="20" width="15" height="10" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect
      x="35"
      y="20"
      width="15"
      height="10"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <rect
      x="55"
      y="20"
      width="10"
      height="10"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <rect
      x="10"
      y="35"
      width="60"
      height="25"
      rx="2"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeDasharray="2 1"
    />
    <line
      x1="20"
      y1="45"
      x2="60"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeDasharray="2 1"
    />
    <line
      x1="20"
      y1="55"
      x2="50"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeDasharray="2 1"
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
      y="15"
      width="60"
      height="15"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect x="15" y="17.5" width="15" height="10" rx="1" fill="var(--rs-thumbnail-color-primary)" />
    <rect
      x="35"
      y="17.5"
      width="10"
      height="10"
      rx="1"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <rect
      x="50"
      y="17.5"
      width="10"
      height="10"
      rx="1"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <rect
      x="10"
      y="35"
      width="60"
      height="30"
      rx="2"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeDasharray="2 1"
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
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="10"
      y="10"
      width="20"
      height="60"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect x="10" y="10" width="20" height="10" rx="4" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="15"
      y1="30"
      x2="25"
      y2="30"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="15"
      y1="40"
      x2="25"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="15"
      y1="50"
      x2="25"
      y2="50"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="40"
      y1="25"
      x2="60"
      y2="25"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="40"
      y1="35"
      x2="55"
      y2="35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="40"
      y1="45"
      x2="50"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Steps component thumbnail
 */
export const Steps: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="20"
      cy="40"
      r="10"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="1.5"
    />
    <text x="20" y="44" fontSize="12" textAnchor="middle" fill="transparent" fontWeight="bold">
      1
    </text>
    <line
      x1="30"
      y1="40"
      x2="40"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <circle
      cx="50"
      cy="40"
      r="10"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <text
      x="50"
      y="44"
      fontSize="12"
      textAnchor="middle"
      fill="var(--rs-thumbnail-color-primary)"
      fontWeight="bold"
    >
      2
    </text>
    <line
      x1="60"
      y1="40"
      x2="70"
      y2="40"
      stroke="var(--rs-primary-300)"
      strokeWidth="2"
      strokeDasharray="2 1"
    />
  </svg>
);

/**
 * Pagination component thumbnail
 */
export const Pagination: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left arrow button */}
    <rect
      x="10"
      y="30"
      width="10"
      height="20"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <polyline
      points="16,35 12,40 16,45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Page buttons */}
    <rect
      x="25"
      y="30"
      width="10"
      height="20"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <text
      x="30"
      y="44"
      fontSize="12"
      textAnchor="middle"
      fill="var(--rs-thumbnail-color-primary)"
      fontWeight="bold"
    >
      1
    </text>

    <rect
      x="40"
      y="30"
      width="10"
      height="20"
      rx="2"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="1.5"
    />
    <text x="45" y="44" fontSize="12" textAnchor="middle" fill="transparent" fontWeight="bold">
      2
    </text>

    <rect
      x="55"
      y="30"
      width="10"
      height="20"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <text
      x="60"
      y="44"
      fontSize="12"
      textAnchor="middle"
      fill="var(--rs-thumbnail-color-primary)"
      fontWeight="bold"
    >
      3
    </text>

    {/* Right arrow button */}
    <rect
      x="70"
      y="30"
      width="10"
      height="20"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <polyline
      points="74,35 78,40 74,45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
