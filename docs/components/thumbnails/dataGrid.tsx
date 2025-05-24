import React from 'react';

/**
 * Basic Table component thumbnail
 */
export const BasicTable: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="20"
      width="50"
      height="40"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="15"
      y="20"
      width="50"
      height="10"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="30"
      x2="65"
      y2="30"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="40"
      x2="65"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="50"
      x2="65"
      y2="50"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="32"
      y1="20"
      x2="32"
      y2="60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="49"
      y1="20"
      x2="49"
      y2="60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * Virtual Table component thumbnail
 */
export const VirtualTable: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="20"
      width="50"
      height="40"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="15"
      y="20"
      width="50"
      height="10"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="30"
      x2="65"
      y2="30"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="36"
      x2="65"
      y2="36"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <line
      x1="15"
      y1="42"
      x2="65"
      y2="42"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <line
      x1="15"
      y1="48"
      x2="65"
      y2="48"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <line
      x1="15"
      y1="54"
      x2="65"
      y2="54"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <line
      x1="32"
      y1="20"
      x2="32"
      y2="60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="49"
      y1="20"
      x2="49"
      y2="60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect x="62" y="35" width="3" height="10" rx="1.5" fill="var(--rs-thumbnail-color-primary)" />
    <rect
      x="62"
      y="35"
      width="3"
      height="10"
      rx="1.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
  </svg>
);

/**
 * Tree Table component thumbnail
 */
export const TreeTable: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Table container */}
    <rect
      x="15"
      y="20"
      width="50"
      height="40"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Table header */}
    <rect
      x="15"
      y="20"
      width="50"
      height="10"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Horizontal lines */}
    <line
      x1="15"
      y1="30"
      x2="65"
      y2="30"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="40"
      x2="65"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <line
      x1="15"
      y1="50"
      x2="65"
      y2="50"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />

    {/* Vertical lines */}
    <line
      x1="32"
      y1="20"
      x2="32"
      y2="60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="49"
      y1="20"
      x2="49"
      y2="60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Tree structure - First level */}
    <circle
      cx="20"
      cy="35"
      r="1.5"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <path
      d="M22 35H26"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <rect
      x="26"
      y="33"
      width="3"
      height="3"
      rx="0.5"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />

    {/* Tree structure - Second level (expanded) */}
    <path
      d="M20 35V45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeDasharray="1 1"
    />
    <circle
      cx="20"
      cy="45"
      r="1.5"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <path
      d="M22 45H26"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <rect
      x="26"
      y="43"
      width="3"
      height="3"
      rx="0.5"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />

    {/* Tree structure - Third level */}
    <path
      d="M20 45V55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeDasharray="1 1"
    />
    <circle
      cx="20"
      cy="55"
      r="1.5"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
    />
    <path
      d="M22 55H26"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <rect
      x="26"
      y="53"
      width="3"
      height="3"
      rx="0.5"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />

    {/* Data in other columns */}
    <line
      x1="36"
      y1="35"
      x2="45"
      y2="35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="53"
      y1="35"
      x2="60"
      y2="35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <line
      x1="36"
      y1="45"
      x2="45"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="53"
      y1="45"
      x2="60"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <line
      x1="36"
      y1="55"
      x2="45"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="53"
      y1="55"
      x2="60"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Sticky Table component thumbnail
 */
export const StickyTable: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="20"
      width="50"
      height="40"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="15"
      y="20"
      width="50"
      height="10"
      rx="4"
      fill="var(--rs-thumbnail-color-high)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="15"
      y="30"
      width="17"
      height="30"
      rx="0"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="30"
      x2="65"
      y2="30"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="40"
      x2="65"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="50"
      x2="65"
      y2="50"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="32"
      y1="20"
      x2="32"
      y2="60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="49"
      y1="20"
      x2="49"
      y2="60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M15 15L15 20M65 15L65 20"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeDasharray="1 1"
    />
    <path
      d="M10 20L15 20M70 20L65 20"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeDasharray="1 1"
    />
  </svg>
);

/**
 * Editable Table component thumbnail
 */
export const EditableTable: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="20"
      width="50"
      height="40"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="15"
      y="20"
      width="50"
      height="10"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="30"
      x2="65"
      y2="30"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="40"
      x2="65"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="50"
      x2="65"
      y2="50"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="32"
      y1="20"
      x2="32"
      y2="60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="49"
      y1="20"
      x2="49"
      y2="60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="32"
      y="40"
      width="17"
      height="10"
      rx="2"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M36 45L40 45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M42 45L44 45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Filterable Table component thumbnail
 */
export const FilterableTable: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Table container */}
    <rect
      x="15"
      y="20"
      width="50"
      height="40"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Table header */}
    <rect
      x="15"
      y="20"
      width="50"
      height="10"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Horizontal lines */}
    <line
      x1="15"
      y1="30"
      x2="65"
      y2="30"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="15"
      y1="40"
      x2="65"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <line
      x1="15"
      y1="50"
      x2="65"
      y2="50"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />

    {/* Vertical lines */}
    <line
      x1="32"
      y1="20"
      x2="32"
      y2="60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <line
      x1="49"
      y1="20"
      x2="49"
      y2="60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Filter icons in header */}
    {/* First column filter */}
    <rect
      x="22"
      y="23"
      width="6"
      height="4"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
    />
    <path
      d="M24 23L26 26L28 23"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Second column filter */}
    <rect
      x="39"
      y="23"
      width="6"
      height="4"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
    />
    <path
      d="M41 23L43 26L45 23"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Third column filter */}
    <rect
      x="56"
      y="23"
      width="6"
      height="4"
      rx="1"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
    />
    <path
      d="M58 23L60 26L62 23"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Filter dropdown for first column (shown open) */}
    <rect
      x="18"
      y="30"
      width="12"
      height="8"
      rx="2"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      filter="url(#shadow)"
    />
    <line
      x1="20"
      y1="33"
      x2="28"
      y2="33"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="35"
      x2="28"
      y2="35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
    <circle cx="21" cy="33" r="0.75" fill="var(--rs-thumbnail-color-primary)" />

    {/* Table data */}
    <line
      x1="20"
      y1="45"
      x2="28"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <line
      x1="37"
      y1="45"
      x2="45"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <line
      x1="54"
      y1="45"
      x2="62"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />

    <line
      x1="20"
      y1="55"
      x2="28"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <line
      x1="37"
      y1="55"
      x2="45"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <line
      x1="54"
      y1="55"
      x2="62"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />

    {/* Shadow filter for dropdown */}
    <defs>
      <filter
        id="shadow"
        x="17"
        y="29"
        width="14"
        height="10"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="0.5" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);
