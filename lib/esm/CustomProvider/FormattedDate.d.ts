import React from 'react';
interface FormattedDateProps {
    date: Date;
    formatStr: string;
}
export declare function FormattedDate({ date, formatStr }: FormattedDateProps): React.JSX.Element;
export default FormattedDate;
