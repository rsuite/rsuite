import React from 'react';

export interface ModalContextProps {
  /** ID of the dialog element */
  dialogId: string;

  /** Pass the close event callback to the header close button. */
  onModalClose?: (event: React.MouseEvent<Element, MouseEvent>) => void;

  /** Pass the latest style to body. */
  getBodyStyles?: () => React.CSSProperties;
}

export const ModalContext = React.createContext<ModalContextProps | null>(null);
