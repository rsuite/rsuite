import * as React from 'react';

import { StandardProps } from './index';

export interface HelpBlockProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Attribute of the html label tag, defaults to the controlId of the FormGroup */
  htmlFor?: string;

  /** Whether to show through the Tooltip component */
  tooltip?: boolean;
}

declare const HelpBlock: React.ComponentType<HelpBlockProps>;

export default HelpBlock;
