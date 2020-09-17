import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface AffixProps extends StandardProps {
  /** The content of the wrapped */
  children?: React.ReactNode;

  /** Distance from top */
  top?: number;

  /** Callback after the state changes. */
  onChange?: (fixed: boolean) => void;

  /** Specify the container. */
  container?: HTMLElement | (() => HTMLElement);
}

declare const Affix: React.ComponentType<AffixProps>;

export default Affix;
