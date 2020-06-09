import * as React from 'react';
import IntlContext from './IntlContext';
import format from 'date-fns/format';
import { formatNewDate } from '../utils/formatUtils';

interface FormattedDateProps {
  date: Date;
  formatStr: string;
}

function FormattedDate({ date, formatStr }: FormattedDateProps) {
  return (
    <IntlContext.Consumer>
      {options => {
        const formatDate = options?.formatDate;
        return formatDate
          ? formatDate(date, formatNewDate(formatStr))
          : format(date, formatNewDate(formatStr));
      }}
    </IntlContext.Consumer>
  );
}

export default FormattedDate;
