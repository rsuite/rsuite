import * as React from 'react';
import IntlContext from './IntlContext';
import format from 'date-fns/format';
import { legacyParse } from '@date-fns/upgrade/v2';

interface FormattedDateProps {
  date: Date;
  formatStr: string;
}

function FormattedDate({ date, formatStr }: FormattedDateProps) {
  return (
    <IntlContext.Consumer>
      {options => {
        const formatDate = options?.formatDate;
        return formatDate ? formatDate(date, formatStr) : format(legacyParse(date), formatStr);
      }}
    </IntlContext.Consumer>
  );
}

export default FormattedDate;
