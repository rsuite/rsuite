import * as React from 'react';

import { StandardProps } from './index';

export interface ContainerProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;
}

declare const Container: React.ComponentType<ContainerProps>;

export default Container;
