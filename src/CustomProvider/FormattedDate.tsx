import React from 'react';
import { useCustom } from '../utils';

interface FormattedDateProps {
  date: Date;
  formatStr: string;
}

function FormattedDate({ date, formatStr }: FormattedDateProps) {
  const { formatDate } = useCustom('Calendar');

  return <React.Fragment>{formatDate(date, formatStr)}</React.Fragment>;
}

export default FormattedDate;
