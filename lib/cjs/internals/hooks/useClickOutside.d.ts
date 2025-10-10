export interface UseClickOutsideOptions {
    enabled?: boolean;
    isOutside: (event: MouseEvent) => boolean;
    handle: (event: MouseEvent) => void;
}
export declare function useClickOutside({ enabled, isOutside, handle }: UseClickOutsideOptions): void;
export default useClickOutside;
