/// <reference types="react" />
interface FocusStateProps {
    target: React.RefObject<HTMLElement>;
    value?: number | string | null | undefined;
    focusActiveNode: () => void;
    onEnter?: (node: HTMLElement) => void;
    onExit?: (node: HTMLElement) => void;
    onEntered?: (node: HTMLElement) => void;
}
declare function useFocusState(props: FocusStateProps): {
    active: boolean;
    focusItemValue: string | number | null | undefined;
    setFocusItemValue: import("react").Dispatch<import("react").SetStateAction<string | number | null | undefined>>;
    triggerProps: {
        onEnter: (...args: any[]) => any;
        onExit: (...args: any[]) => any;
        onEntered: (...args: any[]) => any;
    };
};
export default useFocusState;
