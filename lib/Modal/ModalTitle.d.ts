import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface ModalTitleProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;
}

declare const ModalTitle: React.ComponentType<ModalTitleProps>;

export default ModalTitle;
