import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface FooterProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;
}

declare const Footer: React.ComponentType<FooterProps>;

export default Footer;
