export interface UseTimeoutFnReturn {
    clear: () => void;
    reset: () => void;
}
/**
 * A timer hook
 * @param fn Timer callback function
 * @param ms Milliseconds of the timer
 * @param enabled Whether to open the timer
 */
export declare function useTimeout(fn: (() => void) | undefined, ms?: number, enabled?: boolean): UseTimeoutFnReturn;
export default useTimeout;
