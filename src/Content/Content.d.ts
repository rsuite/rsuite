import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface ContentProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;
}

declare const Content: React.ComponentType<ContentProps>;

export default Content;
