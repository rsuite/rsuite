import React from 'react';

export interface ToastContextProps {
  usedToaster?: boolean;
  duration?: number;
  mouseReset?: boolean;
}

const ToastContext = React.createContext<ToastContextProps>({ usedToaster: false });

ToastContext.displayName = 'ToastContext';

export default ToastContext;
