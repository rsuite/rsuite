import React from 'react';

/**
 * Calendar component thumbnail
 */
export const Calendar: React.FC = () => (
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
    <line
      x1="25"
      y1="35"
      x2="25"
      y2="35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="35"
      y1="35"
      x2="35"
      y2="35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="45"
      y1="35"
      x2="45"
      y2="35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="55"
      y1="35"
      x2="55"
      y2="35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="25"
      y1="45"
      x2="25"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="35"
      y1="45"
      x2="35"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="45" cy="45" r="3" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="55"
      y1="45"
      x2="55"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="25"
      y1="55"
      x2="25"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="35"
      y1="55"
      x2="35"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="45"
      y1="55"
      x2="45"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * DateInput component thumbnail
 */
export const DateInput: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Input container */}
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

    {/* Date format: --/--/---- using lines */}
    {/* First -- */}
    <line
      x1="22"
      y1="40"
      x2="25"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="27"
      y1="40"
      x2="30"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* First / */}
    <path
      d="M32 38L34 42"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />

    {/* Second -- */}
    <line
      x1="36"
      y1="40"
      x2="39"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="41"
      y1="40"
      x2="44"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Second / */}
    <path
      d="M46 38L48 42"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />

    {/* Year ---- */}
    <line
      x1="50"
      y1="40"
      x2="53"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Calendar icon - centered vertically */}
    <rect
      x="55"
      y="37.5"
      width="5"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
    />
    <line
      x1="56"
      y1="35.5"
      x2="56"
      y2="39.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
    <line
      x1="59"
      y1="35.5"
      x2="59"
      y2="39.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
    <line
      x1="55"
      y1="40.5"
      x2="60"
      y2="40.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * DatePicker component thumbnail
 */
export const DatePicker: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Toggle button part (similar to DateInput) */}
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

    {/* Date format: --/--/---- using lines */}
    <line
      x1="22"
      y1="22.5"
      x2="25"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="27"
      y1="22.5"
      x2="30"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* First / */}
    <path
      d="M32 20.5L34 24.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />

    {/* Second -- */}
    <line
      x1="36"
      y1="22.5"
      x2="39"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="41"
      y1="22.5"
      x2="44"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Calendar icon */}
    <rect
      x="55"
      y="20"
      width="5"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
    />
    <line
      x1="56"
      y1="18"
      x2="56"
      y2="22"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
    <line
      x1="59"
      y1="18"
      x2="59"
      y2="22"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
    <line
      x1="55"
      y1="23"
      x2="60"
      y2="23"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
    />

    {/* Calendar panel part (similar to Calendar) */}
    <rect
      x="15"
      y="30"
      width="50"
      height="35"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="15"
      y="30"
      width="50"
      height="8"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Calendar days */}
    <line
      x1="22"
      y1="45"
      x2="22"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="30"
      y1="45"
      x2="30"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="38"
      y1="45"
      x2="38"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="46"
      y1="45"
      x2="46"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="54"
      y1="45"
      x2="54"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <line
      x1="22"
      y1="52"
      x2="22"
      y2="52"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="30"
      y1="52"
      x2="30"
      y2="52"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="38" cy="52" r="3" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="46"
      y1="52"
      x2="46"
      y2="52"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="54"
      y1="52"
      x2="54"
      y2="52"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <line
      x1="22"
      y1="59"
      x2="22"
      y2="59"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="30"
      y1="59"
      x2="30"
      y2="59"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="38"
      y1="59"
      x2="38"
      y2="59"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="46"
      y1="59"
      x2="46"
      y2="59"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * DateRangeInput component thumbnail
 */
export const DateRangeInput: React.FC = () => (
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
    <path
      d="M20 40H25"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M28 40H30"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M33 40H35"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M40 40H40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M45 40H50"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M53 40H55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M58 40H60"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="40"
      y1="35"
      x2="40"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
  </svg>
);

/**
 * DateTimeRangePicker component thumbnail
 */
export const DateTimeRangePicker: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="15"
      y="20"
      width="50"
      height="15"
      rx="4"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <path
      d="M55 27.5L50 32.5L45 27.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25 27.5H40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <rect
      x="15"
      y="35"
      width="50"
      height="30"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="17"
      y="37"
      width="23"
      height="26"
      rx="2"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <rect
      x="40"
      y="37"
      width="23"
      height="26"
      rx="2"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <rect
      x="17"
      y="37"
      width="23"
      height="6"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <rect
      x="40"
      y="37"
      width="23"
      height="6"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
    />
    <line
      x1="20"
      y1="47"
      x2="20"
      y2="47"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="25"
      y1="47"
      x2="25"
      y2="47"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="30"
      y1="47"
      x2="30"
      y2="47"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="35"
      y1="47"
      x2="35"
      y2="47"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="52"
      x2="20"
      y2="52"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="25"
      y1="52"
      x2="25"
      y2="52"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="30" cy="52" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="35"
      y1="52"
      x2="35"
      y2="52"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="57"
      x2="20"
      y2="57"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="25"
      y1="57"
      x2="25"
      y2="57"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="30"
      y1="57"
      x2="30"
      y2="57"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="35"
      y1="57"
      x2="35"
      y2="57"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="43"
      y1="47"
      x2="43"
      y2="47"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="48"
      y1="47"
      x2="48"
      y2="47"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="53"
      y1="47"
      x2="53"
      y2="47"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="58"
      y1="47"
      x2="58"
      y2="47"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="43"
      y1="52"
      x2="43"
      y2="52"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="48"
      y1="52"
      x2="48"
      y2="52"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="53"
      y1="52"
      x2="53"
      y2="52"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="58" cy="52" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="43"
      y1="57"
      x2="43"
      y2="57"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="48"
      y1="57"
      x2="48"
      y2="57"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="53"
      y1="57"
      x2="53"
      y2="57"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="58"
      y1="57"
      x2="58"
      y2="57"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * TimeRangePicker component thumbnail
 */
export const TimeRangePicker: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Toggle button part */}
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

    {/* Time format: --:-- to --:-- */}
    <line
      x1="20"
      y1="22.5"
      x2="23"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="25"
      y1="22.5"
      x2="28"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* First colon : */}
    <circle cx="30" cy="20.5" r="1" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="30" cy="24.5" r="1" fill="var(--rs-thumbnail-color-primary)" />

    {/* First time minutes */}
    <line
      x1="32"
      y1="22.5"
      x2="35"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* To symbol */}
    <line
      x1="37"
      y1="22.5"
      x2="39"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Second time hours */}
    <line
      x1="41"
      y1="22.5"
      x2="44"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Second colon : */}
    <circle cx="46" cy="20.5" r="1" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="46" cy="24.5" r="1" fill="var(--rs-thumbnail-color-primary)" />

    {/* Second time minutes */}
    <line
      x1="48"
      y1="22.5"
      x2="51"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Clock icon */}
    <circle
      cx="58"
      cy="22.5"
      r="3"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
    />
    <line
      x1="58"
      y1="22.5"
      x2="60"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
    <line
      x1="58"
      y1="22.5"
      x2="58"
      y2="20.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
    />

    {/* Time panel */}
    <rect
      x="15"
      y="30"
      width="50"
      height="35"
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
      y2="65"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />

    {/* Left side - start time */}
    {/* Hours column */}
    <rect
      x="18"
      y="35"
      width="8"
      height="25"
      rx="2"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
    />
    <line
      x1="20"
      y1="40"
      x2="24"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <rect
      x="20"
      y="45"
      width="4"
      height="4"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <text x="22" y="48" fontSize="4" textAnchor="middle" fill="transparent" fontWeight="bold">
      9
    </text>
    <line
      x1="20"
      y1="55"
      x2="24"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />

    {/* Minutes column */}
    <rect
      x="28"
      y="35"
      width="8"
      height="25"
      rx="2"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
    />
    <line
      x1="30"
      y1="40"
      x2="34"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <rect
      x="30"
      y="45"
      width="4"
      height="4"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <text x="32" y="48" fontSize="4" textAnchor="middle" fill="transparent" fontWeight="bold">
      00
    </text>
    <line
      x1="30"
      y1="55"
      x2="34"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />

    {/* Right side - end time */}
    {/* Hours column */}
    <rect
      x="44"
      y="35"
      width="8"
      height="25"
      rx="2"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
    />
    <line
      x1="46"
      y1="40"
      x2="50"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <rect
      x="46"
      y="45"
      width="4"
      height="4"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <text x="48" y="48" fontSize="4" textAnchor="middle" fill="transparent" fontWeight="bold">
      5
    </text>
    <line
      x1="46"
      y1="55"
      x2="50"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />

    {/* Minutes column */}
    <rect
      x="54"
      y="35"
      width="8"
      height="25"
      rx="2"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
    />
    <line
      x1="56"
      y1="40"
      x2="60"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <rect
      x="56"
      y="45"
      width="4"
      height="4"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <text x="58" y="48" fontSize="4" textAnchor="middle" fill="transparent" fontWeight="bold">
      30
    </text>
    <line
      x1="56"
      y1="55"
      x2="60"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * DateRangePicker component thumbnail
 */
export const DateRangePicker: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Toggle button part */}
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

    {/* Date format: --/--/---- to --/--/---- */}
    <line
      x1="20"
      y1="22.5"
      x2="23"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M25 20.5L27 24.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <line
      x1="29"
      y1="22.5"
      x2="32"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* To symbol */}
    <line
      x1="35"
      y1="22.5"
      x2="37"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Second date */}
    <line
      x1="40"
      y1="22.5"
      x2="43"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M45 20.5L47 24.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <line
      x1="49"
      y1="22.5"
      x2="52"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Calendar icon */}
    <rect
      x="55"
      y="20"
      width="5"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
    />
    <line
      x1="56"
      y1="18"
      x2="56"
      y2="22"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
    <line
      x1="59"
      y1="18"
      x2="59"
      y2="22"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
    <line
      x1="55"
      y1="23"
      x2="60"
      y2="23"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
    />

    {/* Calendar panel part - single container with divider */}
    <rect
      x="15"
      y="30"
      width="50"
      height="35"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />
    <rect
      x="15"
      y="30"
      width="50"
      height="8"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Vertical divider line */}
    <line
      x1="40"
      y1="30"
      x2="40"
      y2="65"
      stroke="var(--rs-primary-300)"
      strokeWidth="1"
      strokeDasharray="2 1"
    />

    {/* Left calendar - start date */}
    <line
      x1="22"
      y1="45"
      x2="22"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="30"
      y1="45"
      x2="30"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="22" cy="52" r="3" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="30"
      y1="52"
      x2="30"
      y2="52"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="22"
      y1="59"
      x2="22"
      y2="59"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="30"
      y1="59"
      x2="30"
      y2="59"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Right calendar - end date */}
    <line
      x1="48"
      y1="45"
      x2="48"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="56"
      y1="45"
      x2="56"
      y2="45"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="48"
      y1="52"
      x2="48"
      y2="52"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="56"
      y1="52"
      x2="56"
      y2="52"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="56" cy="59" r="3" fill="var(--rs-thumbnail-color-primary)" />
    <line
      x1="48"
      y1="59"
      x2="48"
      y2="59"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Date range highlight */}
    <rect
      x="25"
      y="52"
      width="30"
      height="6"
      rx="2"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.5"
      strokeDasharray="1 1"
    />
  </svg>
);

/**
 * TimePicker component thumbnail
 */
export const TimePicker: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Toggle button part */}
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

    {/* Time format: --:-- */}
    <line
      x1="25"
      y1="22.5"
      x2="28"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="30"
      y1="22.5"
      x2="33"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Colon : */}
    <circle cx="35" cy="20.5" r="1" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="35" cy="24.5" r="1" fill="var(--rs-thumbnail-color-primary)" />

    {/* Minutes */}
    <line
      x1="37"
      y1="22.5"
      x2="40"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="42"
      y1="22.5"
      x2="45"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Clock icon */}
    <circle
      cx="55"
      cy="22.5"
      r="3"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
    />
    <line
      x1="55"
      y1="22.5"
      x2="57"
      y2="22.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
    <line
      x1="55"
      y1="22.5"
      x2="55"
      y2="20.5"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
      strokeLinecap="round"
    />

    {/* Time panel */}
    <rect
      x="15"
      y="30"
      width="50"
      height="35"
      rx="4"
      fill="var(--rs-thumbnail-bg)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1.5"
    />

    {/* Time columns */}
    <rect
      x="20"
      y="35"
      width="10"
      height="25"
      rx="2"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
    />
    <rect
      x="35"
      y="35"
      width="10"
      height="25"
      rx="2"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
    />
    <rect
      x="50"
      y="35"
      width="10"
      height="25"
      rx="2"
      fill="transparent"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="0.75"
    />

    {/* Hours column */}
    <line
      x1="22"
      y1="40"
      x2="28"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <rect
      x="22"
      y="45"
      width="6"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <text x="25" y="49" fontSize="5" textAnchor="middle" fill="transparent" fontWeight="bold">
      12
    </text>
    <line
      x1="22"
      y1="55"
      x2="28"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />

    {/* Minutes column */}
    <line
      x1="37"
      y1="40"
      x2="43"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <rect
      x="37"
      y="45"
      width="6"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <text x="40" y="49" fontSize="5" textAnchor="middle" fill="transparent" fontWeight="bold">
      30
    </text>
    <line
      x1="37"
      y1="55"
      x2="43"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />

    {/* AM/PM column */}
    <line
      x1="52"
      y1="40"
      x2="58"
      y2="40"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <rect
      x="52"
      y="45"
      width="6"
      height="5"
      rx="1"
      fill="var(--rs-thumbnail-color-primary)"
      stroke="var(--rs-primary-700)"
      strokeWidth="0.5"
    />
    <text x="55" y="49" fontSize="5" textAnchor="middle" fill="transparent" fontWeight="bold">
      PM
    </text>
    <line
      x1="52"
      y1="55"
      x2="58"
      y2="55"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);
