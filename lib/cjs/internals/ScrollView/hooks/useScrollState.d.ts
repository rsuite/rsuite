/// <reference types="react" />
export declare function useScrollState(scrollShadow?: boolean): {
    scrollState: "top" | "bottom" | "middle" | null;
    handleScroll: ((...args: any[]) => any) | undefined;
    bodyRef: import("react").RefObject<HTMLDivElement>;
};
