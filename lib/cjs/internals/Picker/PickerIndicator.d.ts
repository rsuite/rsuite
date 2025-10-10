import React from 'react';
interface PickerIndicatorProps {
    loading?: boolean;
    caretAs?: React.ElementType | null;
    onClose?: (event: React.MouseEvent<HTMLElement>) => void;
    showCleanButton?: boolean;
    disabled?: boolean;
    as?: React.ElementType;
}
declare const PickerIndicator: ({ loading, caretAs, onClose, showCleanButton, as: Component, disabled }: PickerIndicatorProps) => React.JSX.Element;
export default PickerIndicator;
