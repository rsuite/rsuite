import * as React from 'react';

export interface HelpBlockProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** Attribute of the html label tag, defaults to the controlId of the FormGroup */
  htmlFor?: string;

  /** Whether to show through the Tooltip component */
  tooltip?: boolean;
}

declare const HelpBlock: React.ComponentType<HelpBlockProps>;

export default HelpBlock;
