import React from 'react';
interface EditStateProps {
    value?: any;
    defaultValue?: any;
    disabled?: boolean;
    onChange?: (value: any, event: React.ChangeEvent) => void;
    onEdit?: (event: React.SyntheticEvent) => void;
    onCancel?: (event?: React.MouseEvent) => void;
    onSave?: (event?: React.MouseEvent) => void;
    onClick?: (event: React.SyntheticEvent) => void;
    onFocus?: (event?: React.FocusEvent) => void;
}
declare const useEditState: (props: EditStateProps) => {
    isEditing: boolean;
    value: any;
    onClick: (...args: any[]) => any;
    onChange: (...args: any[]) => any;
    onFocus: (...args: any[]) => any;
    onCancel: (...args: any[]) => any;
    onSave: (...args: any[]) => any;
    onKeyDown: (...args: any[]) => any;
    htmlProps: {};
};
export default useEditState;
