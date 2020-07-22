import * as React from 'react';
import IntlContext from './IntlContext';
import { format } from '../utils/dateUtils';
import { format as timeZoneFormat } from '../utils/timeZone';

interface FormattedDateProps {
  date: Date;
  formatStr: string;
}

function FormattedDate({ date, formatStr }: FormattedDateProps) {
  return (
    <IntlContext.Consumer>
      {options => {
        if (options?.timeZone) {
          return timeZoneFormat(date, formatStr, options?.timeZone);
        }

        const formatDate = options?.formatDate || format;
        return formatDate(date, formatStr);
      }}
    </IntlContext.Consumer>
  );
}

export default FormattedDate;
