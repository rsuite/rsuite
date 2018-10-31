import * as React from 'react';

import { StandardProps } from './index';

export interface ModalTitleProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;
}

declare const ModalTitle: React.ComponentType<ModalTitleProps>;

export default ModalTitle;
