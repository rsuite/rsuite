'use client';
export var formatWithLeadingZero = function formatWithLeadingZero(number) {
  return String(number).padStart(2, '0');
};