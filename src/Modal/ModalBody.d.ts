import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface ModalBodyProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;
}

declare const ModalBody: React.ComponentType<ModalBodyProps>;

export default ModalBody;
