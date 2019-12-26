import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface LoaderProps extends StandardProps {
  /** Centered in the container */
  center?: boolean;

  /** Whether the background is displayed */
  backdrop?: boolean;

  /** An alternative dark visual style for the Loader */
  inverse?: boolean;

  /** The icon is displayed vertically with the text */
  vertical?: boolean;

  /** Custom descriptive text */
  content?: React.ReactNode;

  /** The speed at which the loader rotates */
  speed?: 'normal' | 'fast' | 'slow';
}

declare const Loader: React.ComponentType<LoaderProps>;

export default Loader;
