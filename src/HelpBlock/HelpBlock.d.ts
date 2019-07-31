import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface HelpBlockProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Whether to show through the Tooltip component */
  tooltip?: boolean;
}

declare const HelpBlock: React.ComponentType<HelpBlockProps>;

export default HelpBlock;
