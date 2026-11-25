import React from 'react';

/**
 * Badge component thumbnail
 */
export const Badge: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="20"
      y="26"
      width="32"
      height="32"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <circle cx="54" cy="24" r="8" fill="var(--rs-red-500)" stroke="var(--rs-bg-card)" strokeWidth="2" />
  </svg>
);

/**
 * Loader component thumbnail
 */
export const Loader: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="20" stroke="var(--rs-thumbnail-bg-secondary)" strokeWidth="4" />
    <path
      d="M40 20C51.0457 20 60 28.9543 60 40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Message component thumbnail
 */
export const Message: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="24"
      width="60"
      height="32"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <circle cx="22" cy="40" r="6" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="34" y="34" width="28" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="34" y="42" width="20" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
  </svg>
);

/**
 * Notification component thumbnail
 */
export const Notification: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="14"
      y="16"
      width="52"
      height="48"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="20" y="24" width="28" height="6" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M20 38H58" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 46H58" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 54H48" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Progress component thumbnail
 */
export const Progress: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="36"
      width="60"
      height="8"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="14" y="38" width="30" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * Placeholder component thumbnail
 */
export const Placeholder: React.FC = () => (
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
    <rect x="16" y="24" width="48" height="8" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.3" />
    <rect x="16" y="38" width="48" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.2" />
    <rect x="16" y="46" width="36" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.2" />
    <rect x="16" y="54" width="24" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.2" />
  </svg>
);

/**
 * Toaster component thumbnail
 */
export const Toaster: React.FC = () => (
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
    <rect
      x="22"
      y="36"
      width="36"
      height="12"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      opacity="0.6"
    />
    <rect
      x="30"
      y="48"
      width="20"
      height="12"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      opacity="0.3"
    />
  </svg>
);

/**
 * ProgressCircle component thumbnail
 */
export const ProgressCircle: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="40"
      cy="40"
      r="20"
      stroke="var(--rs-thumbnail-bg-secondary)"
      strokeWidth="4"
      fill="transparent"
    />
    <path
      d="M40 20C51.0457 20 60 28.9543 60 40C60 51.0457 51.0457 60 40 60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="transparent"
    />
  </svg>
);
