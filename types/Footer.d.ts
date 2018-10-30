import * as React from 'react';

export interface FooterProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;
}

declare const Footer: React.ComponentType<FooterProps>;

export default Footer;
