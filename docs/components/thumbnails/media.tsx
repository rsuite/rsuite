import React from 'react';

/**
 * Avatar component thumbnail
 */
export const Avatar: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="40"
      cy="40"
      r="20"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <circle cx="40" cy="35" r="7" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M25 55C30 45 50 45 55 55" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
  </svg>
);

/**
 * Icon component thumbnail
 */
export const Icon: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="15"
      width="20"
      height="20"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M20 25H30M25 20V30"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <rect
      x="45"
      y="15"
      width="20"
      height="20"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <circle cx="55" cy="25" r="5" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />

    <rect
      x="15"
      y="45"
      width="20"
      height="20"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M20 55L30 55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <rect
      x="45"
      y="45"
      width="20"
      height="20"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M50 50L60 60M60 50L50 60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Image component thumbnail
 */
export const Image: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="20"
      width="50"
      height="40"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <circle cx="30" cy="35" r="5" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M15 50L30 40L40 50L65 35" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M40 50L50 45L65 55" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
  </svg>
);
