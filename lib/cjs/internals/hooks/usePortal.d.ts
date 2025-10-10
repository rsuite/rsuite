import React from 'react';
interface PortalProps {
    container?: HTMLElement | (() => HTMLElement | null) | null;
    waitMount?: boolean;
}
export declare function usePortal(props?: PortalProps): {
    target: HTMLElement | null;
    Portal: ((props: any) => React.JSX.Element) | (({ children }: {
        children: React.ReactNode;
    }) => React.ReactPortal | null);
};
export default usePortal;
