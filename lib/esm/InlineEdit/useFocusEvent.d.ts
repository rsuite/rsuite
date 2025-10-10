/// <reference types="react" />
import { PickerHandle } from '../internals/Picker/types';
interface FocusEventProps {
    isEditing: boolean;
    stateOnBlur?: 'save' | 'cancel';
    onSave?: (event?: React.FocusEvent | null) => void;
    onCancel?: (event?: React.FocusEvent | null) => void;
}
declare const useFocusEvent: ({ isEditing, stateOnBlur, onSave, onCancel }: FocusEventProps) => {
    target: import("react").RefObject<HTMLInputElement | PickerHandle>;
    root: import("react").RefObject<HTMLDivElement>;
    onBlur: (...args: any[]) => any;
};
export default useFocusEvent;
