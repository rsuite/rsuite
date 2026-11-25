import React from 'react';

/**
 * Drawer component thumbnail
 */
export const Drawer: React.FC = () => (
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
      strokeDasharray="4 4"
    />
    <rect
      x="40"
      y="16"
      width="30"
      height="48"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="46" y="24" width="18" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="46" y="34" width="12" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
    <rect x="46" y="44" width="14" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
  </svg>
);

/**
 * Modal component thumbnail
 */
export const Modal: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="16" width="60" height="48" rx="4" fill="var(--rs-thumbnail-color-primary)" opacity="0.1" />

    <rect
      x="20"
      y="26"
      width="40"
      height="28"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M20 36H60" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
    <rect x="26" y="30" width="12" height="3" rx="1.5" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="26" y="42" width="28" height="3" rx="1.5" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
  </svg>
);

/**
 * Popover component thumbnail
 */
export const Popover: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="14"
      y="22"
      width="52"
      height="30"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M36 52L40 56L44 52" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M37 52H43" stroke="var(--rs-thumbnail-bg-secondary)" strokeWidth="2" />

    <rect x="22" y="30" width="36" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="22" y="38" width="24" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
  </svg>
);

/**
 * Tooltip component thumbnail
 */
export const Tooltip: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="18"
      y="28"
      width="44"
      height="20"
      rx="4"
      fill="var(--rs-thumbnail-color-primary)"
    />
    <path d="M36 48L40 52L44 48" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="26" y="36" width="28" height="4" rx="2" fill="var(--rs-thumbnail-bg)" />
  </svg>
);

/**
 * Whisper component thumbnail
 */
export const Whisper: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="22" width="44" height="20" rx="4" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M36 42L40 46L44 42" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M37 42H43" stroke="var(--rs-thumbnail-bg-secondary)" strokeWidth="2" />

    <rect x="26" y="30" width="28" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />

    <circle cx="40" cy="56" r="6" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * ModalIntegrations component thumbnail
 */
export const ModalIntegrations: React.FC = () => (
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
      strokeDasharray="4 4"
    />

    <rect
      x="24"
      y="28"
      width="32"
      height="24"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M24 36H56" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />
  </svg>
);
