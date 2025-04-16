import React from 'react';

/**
 * PasswordInput component thumbnail
 */
export const PasswordInput: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer input box */}
    <rect
      x="15"
      y="30"
      width="50"
      height="20"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    {/* Password dots */}
    <circle cx="26" cy="40" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="34" cy="40" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="42" cy="40" r="2" fill="var(--rs-thumbnail-color-primary)" />
    {/* Eye icon (simple) */}
    <ellipse
      cx="55"
      cy="40"
      rx="5"
      ry="3"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="55" cy="40" r="1.2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * Checkbox component thumbnail
 */
export const Checkbox: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="25"
      y="25"
      width="30"
      height="30"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path
      d="M32 40L38 46L50 34"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Radio component thumbnail
 */
export const Radio: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="40"
      cy="40"
      r="15"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <circle cx="40" cy="40" r="6" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * Input component thumbnail
 */
export const Input: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="30"
      width="50"
      height="20"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <line
      x1="20"
      y1="40"
      x2="30"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
  </svg>
);

/**
 * Textarea component thumbnail
 */
export const Textarea: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="20"
      width="50"
      height="40"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    {/* Simulate multiple lines of text */}
    <line
      x1="20"
      y1="32"
      x2="55"
      y2="32"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="20"
      y1="40"
      x2="55"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="20"
      y1="48"
      x2="45"
      y2="48"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * InputNumber component thumbnail
 */
export const InputNumber: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="30"
      width="50"
      height="20"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <text x="25" y="44" fill="var(--rs-thumbnail-color-primary)" fontSize="14" fontWeight="bold">
      123
    </text>

    {/* Up/Down arrows */}
    <rect
      x="55"
      y="30"
      width="10"
      height="20"
      rx="2"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <path
      d="M58 35L60 33L62 35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M58 45L60 47L62 45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="55"
      y1="40"
      x2="65"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
  </svg>
);

/**
 * Toggle component thumbnail
 */
export const Toggle: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="20"
      y="30"
      width="40"
      height="20"
      rx="10"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <circle
      cx="50"
      cy="40"
      r="8"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="white"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * AutoComplete component thumbnail
 */
export const AutoComplete: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="20"
      width="50"
      height="15"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect
      x="15"
      y="35"
      width="50"
      height="25"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="20"
      y1="45"
      x2="40"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="20"
      y1="55"
      x2="35"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * Slider component thumbnail
 */
export const Slider: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line
      x1="15"
      y1="40"
      x2="65"
      y2="40"
      stroke="var(--rs-primary-200)"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <line
      x1="15"
      y1="40"
      x2="35"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle
      cx="35"
      cy="40"
      r="8"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
  </svg>
);

/**
 * InlineEdit component thumbnail
 */
export const InlineEdit: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="30"
      width="50"
      height="20"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeDasharray="2 1"
    />
    <line
      x1="20"
      y1="40"
      x2="40"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M50 35L55 35L55 40L60 40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M50 45L55 45L55 40L60 40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Rate component thumbnail
 */
export const Rate: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 40L23 46L30 47L25 52L26 59L20 56L14 59L15 52L10 47L17 46L20 40Z"
      fill="var(--rs-yellow-500)"
      stroke="var(--rs-yellow-700)"
      strokeWidth="1"
    />
    <path
      d="M40 40L43 46L50 47L45 52L46 59L40 56L34 59L35 52L30 47L37 46L40 40Z"
      fill="var(--rs-yellow-500)"
      stroke="var(--rs-yellow-700)"
      strokeWidth="1"
    />
    <path
      d="M60 40L63 46L70 47L65 52L66 59L60 56L54 59L55 52L50 47L57 46L60 40Z"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
  </svg>
);

/**
 * TagInput component thumbnail
 */
export const TagInput: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="30"
      width="50"
      height="20"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="20"
      y="35"
      width="15"
      height="10"
      rx="5"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <rect
      x="40"
      y="35"
      width="15"
      height="10"
      rx="5"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <path
      d="M30 40L25 40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <path
      d="M50 40L45 40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Uploader component thumbnail
 */
export const Uploader: React.FC = () => (
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
    <path
      d="M40 25L40 45M30 35L40 25L50 35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25 55L55 55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * RadioTile component thumbnail
 */
export const RadioTile: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="25"
      width="20"
      height="30"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="45"
      y="25"
      width="20"
      height="30"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <circle cx="20" cy="30" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="50" cy="30" r="2" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1" />
    <line
      x1="20"
      y1="40"
      x2="30"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="45"
      x2="25"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="50"
      y1="40"
      x2="60"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="50"
      y1="45"
      x2="55"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * CascadeTree component thumbnail
 */
export const CascadeTree: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Single panel with divider */}
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

    {/* Vertical divider line */}
    <line
      x1="40"
      y1="15"
      x2="40"
      y2="65"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />

    {/* First level items (left side) */}
    <line
      x1="20"
      y1="25"
      x2="35"
      y2="25"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <rect
      x="20"
      y="32"
      width="15"
      height="8"
      rx="2"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-high)"
      strokeWidth="1"
    />
    <line
      x1="20"
      y1="45"
      x2="35"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
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

    {/* Second level items (right side) */}
    <line
      x1="45"
      y1="25"
      x2="60"
      y2="25"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <rect
      x="45"
      y="32"
      width="15"
      height="8"
      rx="2"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-high)"
      strokeWidth="1"
    />
    <line
      x1="45"
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
 * Tree component thumbnail
 */
export const Tree: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Tree container */}
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

    {/* Root node */}
    <circle cx="22.5" cy="24.5" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="30"
      y1="24.5"
      x2="45"
      y2="24.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* First child level */}
    <circle cx="27.5" cy="34.5" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="35"
      y1="34.5"
      x2="50"
      y2="34.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Second child */}
    <circle cx="27.5" cy="44.5" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="35"
      y1="44.5"
      x2="50"
      y2="44.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Grandchild */}
    <circle cx="32.5" cy="54.5" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="40"
      y1="54.5"
      x2="55"
      y2="54.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Connection lines */}
    <line
      x1="22.5"
      y1="27"
      x2="22.5"
      y2="54.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="22.5"
      y1="34.5"
      x2="25.5"
      y2="34.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="22.5"
      y1="44.5"
      x2="25.5"
      y2="44.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="27.5"
      y1="47"
      x2="27.5"
      y2="54.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="27.5"
      y1="54.5"
      x2="30.5"
      y2="54.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
  </svg>
);

/**
 * CheckTree component thumbnail
 */
export const CheckTree: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Tree container */}
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

    {/* Root node with checkbox */}
    <rect
      x="20"
      y="22"
      width="5"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-high)"
      strokeWidth="0.5"
    />
    <line
      x1="30"
      y1="24.5"
      x2="45"
      y2="24.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* First child level with checkboxes */}
    <rect
      x="25"
      y="32"
      width="5"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-high)"
      strokeWidth="0.5"
    />
    <line
      x1="35"
      y1="34.5"
      x2="50"
      y2="34.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Second child with unchecked box */}
    <rect
      x="25"
      y="42"
      width="5"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <line
      x1="35"
      y1="44.5"
      x2="50"
      y2="44.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Grandchild with unchecked box */}
    <rect
      x="30"
      y="52"
      width="5"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <line
      x1="40"
      y1="54.5"
      x2="55"
      y2="54.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Connection lines */}
    <line
      x1="22.5"
      y1="27"
      x2="22.5"
      y2="54.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="22.5"
      y1="34.5"
      x2="25"
      y2="34.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="22.5"
      y1="44.5"
      x2="25"
      y2="44.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="27.5"
      y1="47"
      x2="27.5"
      y2="54.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    <line
      x1="27.5"
      y1="54.5"
      x2="30"
      y2="54.5"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
  </svg>
);

/**
 * MultiCascadeTree component thumbnail
 */
export const MultiCascadeTree: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Single panel with divider */}
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

    {/* Vertical divider line */}
    <line
      x1="40"
      y1="15"
      x2="40"
      y2="65"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />

    {/* First level items with checkboxes (left side) */}
    <rect
      x="20"
      y="22"
      width="5"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <line
      x1="28"
      y1="24.5"
      x2="35"
      y2="24.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <rect
      x="20"
      y="32"
      width="5"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-high)"
      strokeWidth="0.5"
    />
    <path
      d="M21 34L22 35L24 33"
      stroke="white"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="28"
      y1="34.5"
      x2="35"
      y2="34.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <rect
      x="20"
      y="42"
      width="5"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <line
      x1="28"
      y1="44.5"
      x2="35"
      y2="44.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <rect
      x="20"
      y="52"
      width="5"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <line
      x1="28"
      y1="54.5"
      x2="35"
      y2="54.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Second level items with checkboxes (right side) */}
    <rect
      x="45"
      y="22"
      width="5"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <line
      x1="53"
      y1="24.5"
      x2="60"
      y2="24.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <rect
      x="45"
      y="32"
      width="5"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-high)"
      strokeWidth="0.5"
    />
    <path
      d="M46 34L47 35L49 33"
      stroke="white"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="53"
      y1="34.5"
      x2="60"
      y2="34.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <rect
      x="45"
      y="42"
      width="5"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <line
      x1="53"
      y1="44.5"
      x2="60"
      y2="44.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <rect
      x="45"
      y="52"
      width="5"
      height="5"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <line
      x1="53"
      y1="54.5"
      x2="60"
      y2="54.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
