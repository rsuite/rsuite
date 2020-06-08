import * as React from 'react';
import IntlContext from './IntlContext';
import format from 'date-fns/format';

interface FormattedDateProps {
  date: Date;
  formatStr: string;
}

function FormattedDate({ date, formatStr }: FormattedDateProps) {
  return (
    <IntlContext.Consumer>
      {options => {
        const formatDate = options?.formatDate;
        console.log('date: ', date, typeof date);
        return formatDate ? formatDate(date, formatStr) : format(date, formatStr);
      }}
    </IntlContext.Consumer>
  );
}

export default FormattedDate;
