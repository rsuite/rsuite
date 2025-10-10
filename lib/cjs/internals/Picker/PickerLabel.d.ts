import React from 'react';
interface PickerLabelProps {
    id?: string;
    className?: string;
    children?: React.ReactNode;
    as?: React.ElementType;
}
declare const PickerLabel: ({ children, className, as: Component, ...rest }: PickerLabelProps) => React.JSX.Element | null;
export default PickerLabel;
