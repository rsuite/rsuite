import React from 'react';
export declare function useFocus<E extends HTMLElement>(elementRef: React.RefObject<E>): {
    grab: () => void;
    release: (options?: FocusOptions) => void;
};
export default useFocus;
