import { TypeAttributes } from '../../types';
export interface PickerClassNameProps {
    name?: string;
    classPrefix: string;
    className?: string;
    placement?: TypeAttributes.Placement;
    appearance?: 'default' | 'subtle';
    cleanable?: boolean;
    block?: boolean;
    disabled?: boolean;
    countable?: boolean;
    readOnly?: boolean;
    plaintext?: boolean;
    hasValue?: boolean;
    classes?: any;
}
/**
 * The className of the assembled Toggle is on the Picker.
 */
declare function usePickerClassName(props: PickerClassNameProps): [string, string[]];
export default usePickerClassName;
