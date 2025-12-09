import React from 'react';

/**
 * Animation component thumbnail
 */
export const Animation: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="25"
      width="20"
      height="30"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect
      x="45"
      y="25"
      width="20"
      height="30"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      opacity="0.5"
    />
    <path
      d="M38 35L42 40L38 45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 60C15 60 20 55 25 60C30 65 35 60 35 60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M45 60C45 60 50 55 55 60C60 65 65 60 65 60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

/**
 * CustomProvider component thumbnail
 */
export const CustomProvider: React.FC = () => (
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
    <rect x="16" y="24" width="48" height="8" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <rect x="16" y="38" width="20" height="12" rx="2" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <rect x="42" y="38" width="22" height="12" rx="2" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />

    <path d="M40 16V12" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinecap="round" />
    <path d="M40 68V64" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinecap="round" />
    <path d="M70 40H66" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 40H10" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * DOMHelper component thumbnail
 */
export const DOMHelper: React.FC = () => (
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
    <circle cx="26" cy="30" r="4" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M26 34V50" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M26 50L16 60" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M26 50L36 60" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />

    <circle cx="54" cy="30" r="4" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M54 34V50" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M54 50L44 60" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M54 50L64 60" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
  </svg>
);

/**
 * Hooks component thumbnail for useMediaQuery and useBreakpointValue
 */
export const Hooks: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M28 20C28 17.7909 29.7909 16 32 16H48C50.2091 16 52 17.7909 52 20V60C52 62.2091 50.2091 64 48 64H32C29.7909 64 28 62.2091 28 60V20Z"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="14" y="28" width="16" height="24" rx="2" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M22 36L26 40L22 44" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    <rect x="50" y="28" width="16" height="24" rx="2" fill="var(--rs-thumbnail-bg-secondary)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M58 36L54 40L58 44" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
