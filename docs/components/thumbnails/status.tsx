import React from 'react';

/**
 * Badge
 */
export const Badge: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="20"
      y="25"
      width="30"
      height="30"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <circle cx="46" cy="25" r="10" fill="var(--rs-red-500)" stroke="white" strokeWidth="2" />
    <text x="46" y="29" fontSize="10" textAnchor="middle" fill="transparent" fontWeight="bold">
      5
    </text>
  </svg>
);

/**
 * Loader
 */
export const Loader: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="20" stroke="var(--rs-primary-200)" strokeWidth="4" />
    <path
      d="M40 20C51.0457 20 60 28.9543 60 40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Message
 */
export const Message: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="25"
      width="60"
      height="30"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <circle
      cx="25"
      cy="40"
      r="8"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="40"
      y1="35"
      x2="60"
      y2="35"
      stroke="var(--rs-primary-300)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="40"
      y1="45"
      x2="55"
      y2="45"
      stroke="var(--rs-primary-300)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Notification
 */
export const Notification: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="15"
      width="50"
      height="50"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect
      x="20"
      y="20"
      width="40"
      height="10"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="20"
      y1="40"
      x2="60"
      y2="40"
      stroke="var(--rs-primary-300)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="50"
      x2="50"
      y2="50"
      stroke="var(--rs-primary-300)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Progress
 */
export const Progress: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="35"
      width="50"
      height="10"
      rx="5"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect x="15" y="35" width="30" height="10" rx="5" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * Placeholder
 */
export const Placeholder: React.FC = () => (
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
      strokeDasharray="4 2"
    />
    <rect
      x="20"
      y="20"
      width="40"
      height="10"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <rect
      x="20"
      y="35"
      width="40"
      height="5"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <rect
      x="20"
      y="45"
      width="30"
      height="5"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <rect
      x="20"
      y="55"
      width="20"
      height="5"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
  </svg>
);

/**
 * Toaster
 */
export const Toaster: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="15"
      width="50"
      height="20"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="25"
      y="35"
      width="30"
      height="15"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeDasharray="2 1"
    />
    <rect
      x="35"
      y="50"
      width="10"
      height="15"
      rx="2"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeDasharray="2 1"
    />
  </svg>
);

export const ProgressCircle: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="40"
      cy="40"
      r="20"
      stroke="var(--rs-thumbnail-bg-secondary)"
      strokeWidth="5"
      fill="transparent"
    />

    <path
      d="M 40,40 m 0,-20 a 20,20 0 1 1 0,40 a 20,20 0 1 1 0,-40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="5"
      strokeLinecap="round"
      strokeDasharray="125.6 188.4"
      fill="transparent"
    />

    <circle cx="40" cy="40" r="12" fill="var(--rs-thumbnail-bg)" />
  </svg>
);
