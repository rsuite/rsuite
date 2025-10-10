'use client';
import { format as formatDate } from "../../internals/utils/date/index.js";

/**
 * Get aria-label for the date.
 * @param date - The date.
 * @param formatStr - The format string.
 * @param format - The format function.
 */
export function getAriaLabel(date, formatStr, format) {
  return format ? format(date, formatStr) : formatDate(date, formatStr);
}