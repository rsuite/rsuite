/// <reference types="react" />
interface UseDelayedClosureProps {
    /**
     * Callback function to be called when the closure is triggered.
     */
    onClose?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * The duration (in milliseconds) after which the closure should be triggered.
     */
    duration: number;
    /**
     * Optional reference to the target element.
     */
    targetRef?: React.RefObject<HTMLElement>;
    /**
     * Reset the hide timer if the mouse moves over the target element.
     */
    mouseReset?: boolean;
}
/**
 * A hook that delays the closure of the message box.
 */
declare function useDelayedClosure(props: UseDelayedClosureProps): {
    clear: () => void;
    reset: () => void;
};
export default useDelayedClosure;
