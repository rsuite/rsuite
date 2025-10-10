import React from 'react';
export interface ToastContextProps {
    usedToaster?: boolean;
    duration?: number;
    mouseReset?: boolean;
}
declare const ToastContext: React.Context<ToastContextProps>;
export default ToastContext;
