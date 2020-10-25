import React from 'react';
import classNames from 'classnames';
import Transition, { TransitionProps } from './Transition';

export interface SlideProps extends TransitionProps {
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

const Slide = React.forwardRef(
  ({ timeout = 300, placement = 'right', ...props }: SlideProps, ref: React.Ref<any>) => {
    const enterClassName = classNames('slide-in', placement, 'animated');
    const exitClassName = classNames('slide-out', placement, 'animated');

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
