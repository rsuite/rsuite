import React from 'react';
interface AccordionButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    expanded?: boolean;
    controlId?: string;
    classPrefix?: string;
    caretAs?: React.ElementType;
    disabled?: boolean;
}
declare const AccordionButton: (props: AccordionButtonProps) => React.JSX.Element;
export default AccordionButton;
