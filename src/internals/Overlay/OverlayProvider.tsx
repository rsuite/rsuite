import React, { useContext } from 'react';

export interface OverlayContextProps {
  overlayContainer?: () => HTMLElement | null;
}

const OverlayContext = React.createContext<OverlayContextProps>({});

interface OverlayProviderProps extends OverlayContextProps {
  children: React.ReactNode;
}

export const OverlayProvider = (props: OverlayProviderProps) => {
  const { overlayContainer, children } = props;

  return <OverlayContext.Provider value={{ overlayContainer }}>{children}</OverlayContext.Provider>;
};

export const useOverlay = () => useContext(OverlayContext);

OverlayProvider.displayName = 'OverlayProvider';
