import React from 'react';

export interface DrawerContextProps {
  /** Custom close button */
  closeButton?: React.ReactNode | boolean;

  /** Render Modal as Drawer */
  isDrawer: boolean;
}

const DrawerContext = React.createContext<DrawerContextProps | null>(null);

export default DrawerContext;
