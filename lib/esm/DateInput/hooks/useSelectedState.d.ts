/// <reference types="react" />
export declare function useSelectedState(): {
    selectedState: {
        selectedPattern: string;
        selectionStart: number;
        selectionEnd: number;
    };
    setSelectedState: import("react").Dispatch<import("react").SetStateAction<{
        selectedPattern: string;
        selectionStart: number;
        selectionEnd: number;
    }>>;
};
export default useSelectedState;
