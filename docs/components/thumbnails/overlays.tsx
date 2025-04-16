import React from 'react';

/**
 * Drawer component thumbnail
 */
export const Drawer: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="14"
      y="14"
      width="52"
      height="52"
      rx="6"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M14 20
         Q14 14 20 14
         L36 14
         L36 66
         L20 66
         Q14 66 14 60
         Z"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M14 20
         Q14 14 20 14
         L36 14
         Q36 14 36 20
         L36 24
         L14 24
         Z"
      fill="var(--rs-thumbnail-color-primary)"
      fillOpacity="0.07"
      stroke="none"
    />
    <rect
      x="18"
      y="18"
      width="14"
      height="2.5"
      rx="1.25"
      fill="var(--rs-thumbnail-color-primary)"
      fillOpacity="0.5"
    />
    <rect
      x="18"
      y="28"
      width="14"
      height="2"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      fillOpacity="0.15"
    />
    <rect
      x="18"
      y="36"
      width="10"
      height="2"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      fillOpacity="0.15"
    />
    <line
      x1="38"
      y1="24"
      x2="60"
      y2="24"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.2"
      strokeDasharray="3 2"
      opacity="0.5"
    />
    <line
      x1="38"
      y1="34"
      x2="60"
      y2="34"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.2"
      strokeDasharray="3 2"
      opacity="0.5"
    />
    <line
      x1="38"
      y1="44"
      x2="60"
      y2="44"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.2"
      strokeDasharray="3 2"
      opacity="0.5"
    />
  </svg>
);

/**
 * Modal component thumbnail
 */
export const Modal: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Overlay */}
    <rect x="6" y="6" width="68" height="68" rx="8" fill="var(--rs-gray-300)" fillOpacity="0.55" />

    {/* Dialog shadow */}
    <rect x="18" y="19" width="44" height="38" rx="8" fill="black" opacity="0.10" />

    {/* Dialog */}
    <rect
      x="16"
      y="16"
      width="48"
      height="40"
      rx="8"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Header */}
    <rect
      x="16"
      y="16"
      width="48"
      height="10"
      rx="8 8 0 0"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.2"
    />
    {/* Title bar */}
    <rect
      x="22"
      y="20"
      width="20"
      height="3"
      rx="1.5"
      fill="var(--rs-thumbnail-color-primary)"
      fillOpacity="0.4"
    />
    {/* Close button */}
    <circle
      cx="56"
      cy="21"
      r="2.2"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.2"
    />
    <path
      d="M55 20L57 22M57 20L55 22"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* Body content lines */}
    <rect
      x="22"
      y="28"
      width="28"
      height="2.2"
      rx="1.1"
      fill="var(--rs-thumbnail-color-primary)"
      fillOpacity="0.13"
    />
    <rect
      x="22"
      y="33"
      width="24"
      height="2"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      fillOpacity="0.13"
    />
    <rect
      x="22"
      y="38"
      width="18"
      height="2"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      fillOpacity="0.13"
    />

    {/* Footer */}
    <rect
      x="16"
      y="46"
      width="48"
      height="10"
      rx="0 0 8 8"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.2"
    />
    {/* Footer button */}
    <rect
      x="46"
      y="49"
      width="14"
      height="4"
      rx="2"
      fill="var(--rs-thumbnail-color-primary)"
      fillOpacity="0.14"
      stroke="none"
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
    {/* Popover shadow */}
    <rect x="20" y="23" width="40" height="18" rx="9" fill="black" opacity="0.13" />
    {/* Popover bubble */}
    <rect
      x="18"
      y="17"
      width="44"
      height="20"
      rx="9"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    {/* Popover arrow */}
    <polygon
      points="40,37 46,47 34,47"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    {/* Title line */}
    <rect
      x="26"
      y="24"
      width="20"
      height="3"
      rx="1.5"
      fill="var(--rs-thumbnail-color-primary)"
      fillOpacity="0.18"
    />
    {/* Content lines */}
    <rect
      x="26"
      y="29"
      width="14"
      height="2"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      fillOpacity="0.13"
    />
    <rect
      x="26"
      y="33"
      width="10"
      height="2"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      fillOpacity="0.13"
    />
    {/* Trigger button with icon */}
    <circle
      cx="40"
      cy="58"
      r="8"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="37"
      y="55"
      width="6"
      height="6"
      rx="3"
      fill="var(--rs-thumbnail-color-primary)"
      fillOpacity="0.35"
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
