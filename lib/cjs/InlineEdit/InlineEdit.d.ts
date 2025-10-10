import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
import { type ChildrenProps } from './renderChildren';
export interface InlineEditProps extends Omit<WithAsProps, 'children'> {
    /**
     * If true, the InlineEdit will be disabled.
     */
    disabled?: boolean;
    /**
     * The initial value of the InlineEdit when it is not controlled.
     */
    defaultValue?: any;
    /**
     * The value of the InlineEdit.
     */
    value?: any;
    /**
     * show the control buttons when editing.
     * @default true
     */
    showControls?: boolean;
    /**
     * The placeholder of the InlineEdit.
     */
    placeholder?: string;
    /**
     * The size of the InlineEdit.
     */
    size?: 'lg' | 'md' | 'sm' | 'xs';
    /**
     * The state of the InlineEdit when it is blurred.
     */
    stateOnBlur?: 'save' | 'cancel';
    /**
     * The callback function that is called when the value of the InlineEdit is changed.
     */
    onChange?: (value: any, event: React.ChangeEvent) => void;
    /**
     * The callback function that is called when the InlineEdit is canceled.
     */
    onCancel?: (event?: React.SyntheticEvent) => void;
    /**
     * The callback function that is called when the InlineEdit is saved.
     */
    onSave?: (event?: React.SyntheticEvent) => void;
    /**
     * The callback function that is called when the InlineEdit is clicked.
     */
    onEdit?: (event: React.SyntheticEvent) => void;
    /**
     * The render function of the InlineEdit.
     */
    children?: ((props: ChildrenProps, ref: React.Ref<any>) => React.ReactElement) | React.ReactElement;
}
declare const InlineEdit: RsRefForwardingComponent<'div', InlineEditProps>;
export default InlineEdit;
