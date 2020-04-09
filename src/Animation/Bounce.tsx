import * as React from 'react';
import Transition from './Transition';
import { TransitionProps } from './Animation.d';

const Bounce = ({ timeout = 300, ...props }: TransitionProps) => (
  <Transition
    {...props}
    animation
    timeout={timeout}
    enteringClassName="bounce-in animated"
    enteredClassName="bounce-in animated"
    exitingClassName="bounce-out animated"
    exitedClassName="bounce-out animated"
  />
);

export default Bounce;
