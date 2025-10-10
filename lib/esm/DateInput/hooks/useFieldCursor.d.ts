export declare function useFieldCursor<V = Date | null>(format: string, value?: V): {
    increment: () => void;
    reset: () => void;
    isMoveCursor: (value: number, pattern: string) => boolean;
    isResetValue: () => boolean;
};
export default useFieldCursor;
