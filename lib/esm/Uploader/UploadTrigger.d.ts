import React from 'react';
import { ButtonProps } from '../Button';
import type { UploaderLocale } from '../locales';
export interface UploadTriggerProps extends ButtonProps {
    as?: React.ElementType;
    name?: string;
    multiple?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    draggable?: boolean;
    accept?: string;
    classPrefix?: string;
    className?: string;
    children?: React.ReactElement;
    locale?: UploaderLocale;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onDragEnter?: React.DragEventHandler<HTMLInputElement>;
    onDragLeave?: React.DragEventHandler<HTMLInputElement>;
    onDragOver?: React.DragEventHandler<HTMLInputElement>;
    onDrop?: React.DragEventHandler<HTMLInputElement>;
}
export interface UploadTriggerInstance {
    clearInput: () => void;
}
declare const UploadTrigger: React.ForwardRefExoticComponent<UploadTriggerProps & React.RefAttributes<unknown>>;
export default UploadTrigger;
