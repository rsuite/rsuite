import React from 'react';
export interface OverlayContextProps {
    overlayContainer?: () => HTMLElement | null;
}
declare const OverlayContext: React.Context<OverlayContextProps>;
export default OverlayContext;
