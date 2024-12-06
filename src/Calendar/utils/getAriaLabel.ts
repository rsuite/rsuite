import { format as formatDate } from '@/internals/utils/date';
import { Locale } from '@/locales';

/**
 * Get aria-label for the date.
 * @param date - The date.
 * @param formatStr - The format string.
 * @param format - The format function.
 * @param options - The format options.
 */
export function getAriaLabel(
  date: Date,
  formatStr: string,
  format: (date: Date, formatStr: string, options) => string,
  options: { locale?: Locale } = {}
) {
  return format ? format(date, formatStr, options) : formatDate(date, formatStr, options);
}
