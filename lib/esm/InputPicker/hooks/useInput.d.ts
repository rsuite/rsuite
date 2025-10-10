/// <reference types="react" />
import type { OverlayTriggerHandle } from '../../internals/Picker/PickerToggleTrigger';
interface InputProps {
    multi?: boolean;
    triggerRef: React.RefObject<OverlayTriggerHandle>;
}
declare function useInput(props: InputProps): {
    inputProps: {
        inputStyle: {
            maxWidth: number;
        };
        as: import("react").ForwardRefExoticComponent<import("../InputAutosize").InputAutosizeProps & import("react").RefAttributes<import("../InputAutosize").InputInstance>>;
    } | {
        as: string;
        inputStyle?: undefined;
    };
    inputRef: import("react").MutableRefObject<any>;
    focus: () => void;
    blur: () => void;
};
export default useInput;
