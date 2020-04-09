import * as React from 'react';
import classNames from 'classnames';
import Transition from './Transition';
import { SlideProps } from './Animation.d';

const Slide = ({ timeout = 300, placement = 'right', ...props }: SlideProps) => {
  const enterClassName = classNames('slide-in', placement, 'animated');
  const exitClassName = classNames('slide-out', placement, 'animated');

  return (
    <Transition
      {...props}
      animation
      timeout={timeout}
      enteringClassName={enterClassName}
      enteredClassName={enterClassName}
      exitingClassName={exitClassName}
      exitedClassName={exitClassName}
    />
  );
};

export default Slide;
