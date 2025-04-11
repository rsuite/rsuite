import React from 'react';

/**
 * Drawer component thumbnail
 */
export const Drawer: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
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

    {/* Drawer panel - left side */}
    <rect
      x="10"
      y="10"
      width="30"
      height="60"
      rx="4 0 0 4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Drawer header */}
    <rect
      x="10"
      y="10"
      width="30"
      height="10"
      rx="4 0 0 0"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="15"
      x2="25"
      y2="15"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Drawer content */}
    <line
      x1="15"
      y1="30"
      x2="35"
      y2="30"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="15"
      y1="40"
      x2="35"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="15"
      y1="50"
      x2="30"
      y2="50"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Main content area indicators */}
    <line
      x1="50"
      y1="25"
      x2="60"
      y2="25"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="45"
      y1="35"
      x2="65"
      y2="35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="50"
      y1="45"
      x2="60"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="45"
      y1="55"
      x2="55"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Modal component thumbnail
 */
export const Modal: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background overlay */}
    <rect x="5" y="5" width="70" height="70" rx="4" fill="var(--rs-gray-300)" fillOpacity="0.5" />

    {/* Modal dialog */}
    <rect
      x="15"
      y="15"
      width="50"
      height="50"
      rx="8"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Modal header */}
    <rect
      x="15"
      y="15"
      width="50"
      height="10"
      rx="8 8 0 0"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="20"
      y1="20"
      x2="40"
      y2="20"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Close button */}
    <circle
      cx="55"
      cy="20"
      r="2.5"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M53.5 18.5L56.5 21.5M56.5 18.5L53.5 21.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Modal body */}
    <line
      x1="25"
      y1="35"
      x2="55"
      y2="35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="25"
      y1="45"
      x2="45"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Modal footer */}
    <rect
      x="15"
      y="55"
      width="50"
      height="10"
      rx="0 0 8 8"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="45"
      y="58"
      width="15"
      height="4"
      rx="2"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
  </svg>
);

/**
 * Popover component thumbnail
 */
export const Popover: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Popover content */}
    <rect
      x="10"
      y="15"
      width="60"
      height="35"
      rx="8"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Content lines */}
    <line
      x1="20"
      y1="30"
      x2="60"
      y2="30"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="40"
      x2="50"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Arrow - pointing down */}
    <polygon
      points="40,55 35,50 45,50"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * Tooltip component thumbnail
 */
export const Tooltip: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Tooltip */}
    <rect
      x="10"
      y="20"
      width="60"
      height="25"
      rx="4"
      fill="var(--rs-gray-800)"
      stroke="var(--rs-gray-900)"
      strokeWidth="1.5"
    />

    {/* Tooltip text */}
    <circle cx="25" cy="32.5" r="2.5" fill="transparent" />
    <line
      x1="30"
      y1="32.5"
      x2="55"
      y2="32.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Arrow - pointing down */}
    <polygon
      points="40,50 35,45 45,45"
      fill="var(--rs-gray-800)"
      stroke="var(--rs-gray-900)"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * Whisper component thumbnail
 */
export const Whisper: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="25"
      y="25"
      width="30"
      height="15"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="15"
      y="45"
      width="50"
      height="20"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeDasharray="2 1"
    />
    <path
      d="M40 45L35 40L45 40L40 45Z"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeDasharray="2 1"
    />
    <line
      x1="25"
      y1="55"
      x2="55"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="2 1"
    />
  </svg>
);

/**
 * ModalIntegrations component thumbnail
 */
export const ModalIntegrations: React.FC = () => (
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
    <rect
      x="20"
      y="30"
      width="20"
      height="15"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <rect
      x="45"
      y="30"
      width="15"
      height="15"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <rect
      x="20"
      y="50"
      width="15"
      height="10"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <rect
      x="40"
      y="50"
      width="20"
      height="10"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
  </svg>
);
