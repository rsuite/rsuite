import React from 'react';

/**
 * Button 组件缩略图
 */
export const Button: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="28"
      width="60"
      height="24"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="25" y="38" width="30" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * IconButton 组件缩略图
 */
export const IconButton: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="40"
      cy="40"
      r="16"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path
      d="M40 32V48M32 40H48"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * ButtonGroup 组件缩略图
 */
export const ButtonGroup: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 30H65V50H15V30Z"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      fill="none"
      rx="4"
    />
    <path
      d="M16 30H32V50H16C16 50 16 30 16 30Z"
      fill="var(--rs-thumbnail-bg-secondary)"
    />
    <path
      d="M32 30H48V50H32V30Z"
      fill="var(--rs-thumbnail-color-primary)"
    />
    <path
      d="M48 30H64C64 30 64 50 64 50H48V30Z"
      fill="var(--rs-thumbnail-bg-secondary)"
    />
    <path d="M32 30V50" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <path d="M48 30V50" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />

    <rect
      x="15"
      y="30"
      width="50"
      height="20"
      rx="4"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);
