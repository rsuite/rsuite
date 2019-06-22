import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface ModalHeaderProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Display close button */
  closeButton?: boolean;

  /** Called when Modal is hidden */
  onHide?: (event: React.MouseEvent) => void;
}

declare const ModalHeader: React.ComponentType<ModalHeaderProps>;

export default ModalHeader;
