import React from 'react';

/**
 * CheckPicker component thumbnail
 */
export const CheckPicker: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Toggle button */}
    <rect
      x="15"
      y="15"
      width="50"
      height="15"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M55 22.5L53 19.5L57 19.5"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="20"
      y1="22.5"
      x2="45"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Dropdown menu */}
    <rect
      x="15"
      y="30"
      width="50"
      height="40"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Menu items with checkboxes */}
    <rect
      x="20"
      y="37"
      width="5"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <path
      d="M21 39L22 40L24 38"
      stroke="white"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="30"
      y1="39.5"
      x2="55"
      y2="39.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <rect
      x="20"
      y="47"
      width="5"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <path
      d="M21 49L22 50L24 48"
      stroke="white"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="30"
      y1="49.5"
      x2="50"
      y2="49.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <rect
      x="20"
      y="57"
      width="5"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <line
      x1="30"
      y1="59.5"
      x2="45"
      y2="59.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * CheckTreePicker component thumbnail
 */
export const CheckTreePicker: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Toggle button */}
    <rect
      x="15"
      y="15"
      width="50"
      height="15"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M55 22.5L53 19.5L57 19.5"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="20"
      y1="22.5"
      x2="45"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* CheckTree dropdown */}
    <rect
      x="15"
      y="30"
      width="50"
      height="40"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Root node with checkbox */}
    <rect
      x="20"
      y="35"
      width="5"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <path
      d="M21 37L22 38L24 36"
      stroke="white"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="30"
      y1="37.5"
      x2="45"
      y2="37.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* First child level with checkbox */}
    <rect
      x="25"
      y="45"
      width="5"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <path
      d="M26 47L27 48L29 46"
      stroke="white"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="35"
      y1="47.5"
      x2="50"
      y2="47.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Second child with unchecked box */}
    <rect
      x="25"
      y="55"
      width="5"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <line
      x1="35"
      y1="57.5"
      x2="50"
      y2="57.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Grandchild with unchecked box */}
    <rect
      x="30"
      y="65"
      width="5"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <line
      x1="40"
      y1="67.5"
      x2="55"
      y2="67.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Connection lines */}
    <line
      x1="22.5"
      y1="40"
      x2="22.5"
      y2="67.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="22.5"
      y1="47.5"
      x2="25"
      y2="47.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="22.5"
      y1="57.5"
      x2="25"
      y2="57.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="27.5"
      y1="60"
      x2="27.5"
      y2="67.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="27.5"
      y1="67.5"
      x2="30"
      y2="67.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
  </svg>
);

/**
 * InputPicker component thumbnail
 */
export const InputPicker: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Toggle button */}
    <rect
      x="15"
      y="15"
      width="50"
      height="15"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M55 22.5L53 19.5L57 19.5"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="20"
      y1="22.5"
      x2="35"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Dropdown menu */}
    <rect
      x="15"
      y="30"
      width="50"
      height="40"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Menu items */}
    <rect
      x="20"
      y="37"
      width="40"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />

    <rect
      x="20"
      y="47"
      width="35"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />

    <rect
      x="20"
      y="57"
      width="30"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
  </svg>
);

/**
 * SelectPicker component thumbnail
 */
export const SelectPicker: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Toggle button */}
    <rect
      x="15"
      y="15"
      width="50"
      height="15"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M55 22.5L53 19.5L57 19.5"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="20"
      y1="22.5"
      x2="40"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Dropdown menu */}
    <rect
      x="15"
      y="30"
      width="50"
      height="40"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Menu items - highlighted item */}
    <rect
      x="20"
      y="37"
      width="40"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <line
      x1="25"
      y1="39.5"
      x2="55"
      y2="39.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Regular items */}
    <line
      x1="20"
      y1="47.5"
      x2="50"
      y2="47.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="57.5"
      x2="45"
      y2="57.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * TagPicker component thumbnail
 */
export const TagPicker: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Toggle button */}
    <rect
      x="15"
      y="15"
      width="50"
      height="15"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M55 22.5L53 19.5L57 19.5"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="20"
      y="20"
      width="15"
      height="5"
      rx="2.5"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />

    {/* Dropdown menu */}
    <rect
      x="15"
      y="30"
      width="50"
      height="40"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Menu items */}
    <rect
      x="20"
      y="37"
      width="40"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />

    <rect
      x="20"
      y="47"
      width="35"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />

    <rect
      x="20"
      y="57"
      width="30"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
  </svg>
);

/**
 * TreePicker component thumbnail
 */
export const TreePicker: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Toggle button */}
    <rect
      x="15"
      y="15"
      width="50"
      height="15"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M55 22.5L53 19.5L57 19.5"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="20"
      y1="22.5"
      x2="40"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Tree dropdown */}
    <rect
      x="15"
      y="30"
      width="50"
      height="40"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Root node */}
    <circle cx="22.5" cy="37.5" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="30"
      y1="37.5"
      x2="45"
      y2="37.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* First child level */}
    <circle cx="27.5" cy="47.5" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="35"
      y1="47.5"
      x2="50"
      y2="47.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Second child */}
    <circle cx="27.5" cy="57.5" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="35"
      y1="57.5"
      x2="50"
      y2="57.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Grandchild */}
    <circle cx="32.5" cy="67.5" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="40"
      y1="67.5"
      x2="55"
      y2="67.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Connection lines */}
    <line
      x1="22.5"
      y1="40"
      x2="22.5"
      y2="67.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="22.5"
      y1="47.5"
      x2="25.5"
      y2="47.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="22.5"
      y1="57.5"
      x2="25.5"
      y2="57.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="27.5"
      y1="60"
      x2="27.5"
      y2="67.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="27.5"
      y1="67.5"
      x2="30.5"
      y2="67.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
  </svg>
);

/**
 * MultiCascader component thumbnail
 */
export const MultiCascader: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Toggle button */}
    <rect
      x="15"
      y="15"
      width="50"
      height="15"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M55 22.5L53 19.5L57 19.5"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="20"
      y1="22.5"
      x2="45"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Dropdown menu - single container */}
    <rect
      x="15"
      y="30"
      width="50"
      height="40"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Vertical divider line */}
    <line
      x1="40"
      y1="30"
      x2="40"
      y2="70"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />

    {/* Left side items with checkboxes */}
    <rect
      x="20"
      y="37"
      width="5"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <path
      d="M21 39L22 40L24 38"
      stroke="white"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="30"
      y1="39.5"
      x2="35"
      y2="39.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <rect
      x="20"
      y="47"
      width="5"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <line
      x1="30"
      y1="49.5"
      x2="35"
      y2="49.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <rect
      x="20"
      y="57"
      width="5"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <path
      d="M21 59L22 60L24 58"
      stroke="white"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="30"
      y1="59.5"
      x2="35"
      y2="59.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Right side items with checkboxes (second level) */}
    <rect
      x="45"
      y="37"
      width="5"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <path
      d="M46 39L47 40L49 38"
      stroke="white"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="55"
      y1="39.5"
      x2="60"
      y2="39.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <rect
      x="45"
      y="47"
      width="5"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <path
      d="M46 49L47 50L49 48"
      stroke="white"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="55"
      y1="49.5"
      x2="60"
      y2="49.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <rect
      x="45"
      y="57"
      width="5"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <line
      x1="55"
      y1="59.5"
      x2="60"
      y2="59.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Cascader component thumbnail
 */
export const Cascader: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Toggle button */}
    <rect
      x="15"
      y="15"
      width="50"
      height="15"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M55 22.5L53 19.5L57 19.5"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="20"
      y1="22.5"
      x2="45"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Dropdown menu - single container */}
    <rect
      x="15"
      y="30"
      width="50"
      height="40"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Vertical divider line */}
    <line
      x1="40"
      y1="30"
      x2="40"
      y2="70"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />

    {/* Left side items */}
    <line
      x1="20"
      y1="40"
      x2="35"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <rect
      x="20"
      y="45"
      width="15"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <line
      x1="20"
      y1="55"
      x2="30"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="65"
      x2="25"
      y2="65"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Right side items (second level) */}
    <line
      x1="45"
      y1="40"
      x2="60"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="45"
      y1="50"
      x2="55"
      y2="50"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <rect
      x="45"
      y="55"
      width="15"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <line
      x1="45"
      y1="65"
      x2="50"
      y2="65"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
