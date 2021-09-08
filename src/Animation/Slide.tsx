import React from 'react';
import Transition, { TransitionProps } from './Transition';
import { useClassNames } from '../utils';

export interface SlideProps extends TransitionProps {
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

const Slide = React.forwardRef(
  ({ timeout = 300, placement = 'right', ...props }: SlideProps, ref: React.Ref<any>) => {
    const { rootPrefix } = useClassNames('slide');
    const enterClassName = rootPrefix('slide-in', placement, 'animated');
    const exitClassName = rootPrefix('slide-out', placement, 'animated');

    return (
      <Transition
        {...props}
        ref={ref}
        animation
        timeout={timeout}
        enteringClassName={enterClassName}
        enteredClassName={enterClassName}
        exitingClassName={exitClassName}
        exitedClassName={exitClassName}
      />
    );
  }
);

Slide.displayName = 'Slide';

export default Slide;
