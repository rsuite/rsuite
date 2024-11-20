import React from 'react';
import { useCustom } from './useCustom';
import { Locale } from '@/locales';

interface FormattedDateProps {
  date: Date;
  formatStr: string;
  // Custom locale object
  dateLocale?: Locale;
}

export function FormattedDate({ date, formatStr, dateLocale }: FormattedDateProps) {
  const { formatDate } = useCustom('Calendar');

  return <React.Fragment>{formatDate(date, formatStr, { locale: dateLocale })}</React.Fragment>;
}

export default FormattedDate;
