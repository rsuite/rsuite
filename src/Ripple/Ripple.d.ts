import * as React from 'react';

export interface RippleProps {
  classPrefix?: string;
  className?: string;
  onMouseDown?: (position: Object, event: React.MouseEvent) => void;
}

declare const Ripple: React.ComponentType<RippleProps>;

export default Ripple;
