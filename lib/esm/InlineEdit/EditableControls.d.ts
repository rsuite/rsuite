import React from 'react';
import { type StackProps } from '../Stack';
interface EditableControlsProps extends StackProps {
    onSave: () => void;
    onCancel: () => void;
}
declare const EditableControls: React.ForwardRefExoticComponent<EditableControlsProps & React.RefAttributes<HTMLDivElement>>;
export default EditableControls;
