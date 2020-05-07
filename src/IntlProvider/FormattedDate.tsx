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
        const formatDate = options?.formatDate || format;
        return formatDate(date, formatStr);
      }}
    </IntlContext.Consumer>
  );
}

export default FormattedDate;
