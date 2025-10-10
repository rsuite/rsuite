import React from 'react';
type TargetType = React.RefObject<Element> | Element | null | undefined;
interface Options {
    disabled: boolean;
    triggerTarget: TargetType;
    overlayTarget: TargetType;
    /**
     * Whether close on Escape keyup.
     * Defaults to true.
     */
    listenEscape?: boolean;
}
/**
 * A hook that listens to the document click event and closes the overlay.
 * @param onRootClose
 * @param param1
 * @todo Allow different behaviors based on whether clicked element is focusable
 */
export declare function useRootClose(onRootClose: React.ReactEventHandler | undefined, { disabled, triggerTarget, overlayTarget, listenEscape }: Options): void;
export default useRootClose;
