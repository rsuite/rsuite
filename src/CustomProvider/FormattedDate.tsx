import React, { useContext } from 'react';
import { CustomContext } from './CustomProvider';
import { format } from '../utils/dateUtils';

interface FormattedDateProps {
  date: Date;
  formatStr: string;
}

function FormattedDate({ date, formatStr }: FormattedDateProps) {
  const { formatDate = format } = useContext(CustomContext);

  return <React.Fragment>{formatDate(date, formatStr)}</React.Fragment>;
}

export default FormattedDate;
