import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface CarouselProps extends StandardProps {
  /** You can use a custom element for this component */
  componentClass?: React.ElementType;

  /** Autoplay element */
  autoplay?: boolean;

  /** Auto play interval */
  autoplayInterval?: number;

  /** Button placement */
  placement?: 'top' | 'bottom' | 'left' | 'right';

  /** Button shape */
  shape?: 'dot' | 'bar';

  /** Carousel elements */
  children: React.ReactNode;
}

declare const Col: React.ComponentType<CarouselProps>;

export default Col;
