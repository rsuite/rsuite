/// <reference types="react" />
interface ToggleKeyDownEventProps {
    toggle?: boolean;
    trigger: React.RefObject<any>;
    target: React.RefObject<any>;
    overlay?: React.RefObject<any>;
    searchInput?: React.RefObject<any>;
    active?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    loading?: boolean;
    onExit?: (event: any) => void;
    onKeyDown?: (event: any) => void;
    onMenuKeyDown?: (event: any) => void;
    onMenuPressEnter?: (event: any) => void;
    onMenuPressBackspace?: (event: any) => void;
}
/**
 * A hook to control the toggle keyboard operation
 * @param props
 */
declare const useToggleKeyDownEvent: (props: ToggleKeyDownEventProps) => (...args: any[]) => any;
export default useToggleKeyDownEvent;
