import React from 'react';

export interface OverlayContextProps {
  overlayContainer?: () => HTMLElement | null;
}

const OverlayContext = React.createContext<OverlayContextProps>({});

OverlayContext.displayName = 'OverlayContext';

export default OverlayContext;
