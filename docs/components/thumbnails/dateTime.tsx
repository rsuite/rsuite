import React from 'react';

/**
 * Calendar component thumbnail
 */
export const Calendar: React.FC = () => (
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
    <rect
      x="10"
      y="16"
      width="60"
      height="12"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />

    <circle cx="26" cy="38" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="40" cy="38" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="54" cy="38" r="2" fill="var(--rs-thumbnail-color-primary)" />

    <circle cx="26" cy="48" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="40" cy="48" r="2" fill="var(--rs-thumbnail-bg)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <circle cx="54" cy="48" r="2" fill="var(--rs-thumbnail-color-primary)" />

    <circle cx="26" cy="58" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="40" cy="58" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="54" cy="58" r="2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * DateInput component thumbnail
 */
export const DateInput: React.FC = () => (
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

    {/* YYYY-MM-DD abstract */}
    <rect x="16" y="38" width="16" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M34 36L36 44" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="38" y="38" width="8" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M48 36L50 44" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="52" y="38" width="8" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * DatePicker component thumbnail
 */
export const DatePicker: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="16"
      width="60"
      height="14"
      rx="2"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="14" y="21" width="16" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />

    <rect
      x="10"
      y="34"
      width="60"
      height="36"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="10" y="34" width="60" height="8" rx="4" fill="var(--rs-thumbnail-color-primary)" opacity="0.1" />

    <circle cx="26" cy="50" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="40" cy="50" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="54" cy="50" r="2" fill="var(--rs-thumbnail-color-primary)" />

    <circle cx="26" cy="60" r="2" fill="var(--rs-thumbnail-color-primary)" />
    <circle cx="40" cy="60" r="2" fill="var(--rs-thumbnail-bg)" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="2" />
    <circle cx="54" cy="60" r="2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * DateRangeInput component thumbnail
 */
export const DateRangeInput: React.FC = () => (
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
    <rect x="14" y="38" width="16" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
    <path d="M34 40H46" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="50" y="38" width="16" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * DateTimeRangePicker component thumbnail
 */
export const DateTimeRangePicker: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="16"
      width="60"
      height="14"
      rx="2"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="14" y="21" width="16" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />

    <rect
      x="10"
      y="34"
      width="60"
      height="36"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M40 34V70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    <rect x="14" y="44" width="22" height="16" rx="2" fill="none" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeDasharray="2 2" />
    <rect x="44" y="44" width="22" height="16" rx="2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * TimeRangePicker component thumbnail
 */
export const TimeRangePicker: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="16"
      width="60"
      height="14"
      rx="2"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="14" y="21" width="16" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />

    <rect
      x="10"
      y="34"
      width="60"
      height="32"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M40 34V66" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    <rect x="14" y="44" width="22" height="12" rx="2" fill="none" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" strokeDasharray="2 2" />
    <rect x="44" y="44" width="22" height="12" rx="2" fill="var(--rs-thumbnail-color-primary)" />
  </svg>
);

/**
 * DateRangePicker component thumbnail
 */
export const DateRangePicker: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="16"
      width="60"
      height="14"
      rx="2"
      fill="none"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <rect x="14" y="21" width="16" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" />

    <rect
      x="10"
      y="34"
      width="60"
      height="36"
      rx="4"
      fill="var(--rs-thumbnail-bg-secondary)"
      stroke="var(--rs-thumbnail-color-primary)"
      strokeWidth="2"
    />
    <path d="M40 34V70" stroke="var(--rs-thumbnail-color-primary)" strokeWidth="1.5" />

    {/* Left Calendar */}
    <rect x="14" y="44" width="22" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
    <rect x="14" y="52" width="22" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
    <rect x="14" y="60" width="22" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />

    {/* Right Calendar */}
    <rect x="44" y="44" width="22" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
    <rect x="44" y="52" width="22" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
    <rect x="44" y="60" width="22" height="4" rx="2" fill="var(--rs-thumbnail-color-primary)" opacity="0.5" />
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
      stroke="var(--rs-thumbnail-color-high)"
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
      stroke="var(--rs-thumbnail-color-high)"
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
      stroke="var(--rs-thumbnail-color-high)"
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
