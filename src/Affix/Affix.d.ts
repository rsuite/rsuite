import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface AffixProps extends StandardProps {
  /** The content of the wrapped */
  children?: React.ReactNode;

  top?: number;

  onChange?: (fixed: boolean) => void;
}

declare const Affix: React.ComponentType<AffixProps>;

export default Affix;
