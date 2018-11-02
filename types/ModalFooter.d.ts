import * as React from 'react';

import { StandardProps } from './index';

export interface ModalFooterProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;
}

declare const ModalFooter: React.ComponentType<ModalFooterProps>;

export default ModalFooter;
