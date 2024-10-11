import { format as formatDate } from '@/internals/utils/date';

/**
 * Get aria-label for the date.
 * @param date - The date.
 * @param formatStr - The format string.
 * @param format - The format function.
 */
export function getAriaLabel(
  date: Date,
  formatStr: string,
  format: (date: Date, formatStr: string) => string
) {
  return format ? format(date, formatStr) : formatDate(date, formatStr);
}
