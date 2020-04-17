import * as React from 'react';
import classNames from 'classnames';
import Transition from './Transition';
import { SlideProps } from './Animation.d';

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
