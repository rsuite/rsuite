import React from 'react';
import Transition, { TransitionProps } from './Transition';

export type BounceProps = TransitionProps;

const Bounce = React.forwardRef(({ timeout = 300, ...props }: BounceProps, ref: React.Ref<any>) => (
  <Transition
    {...props}
    ref={ref}
    animation
    timeout={timeout}
    enteringClassName="bounce-in animated"
    enteredClassName="bounce-in animated"
    exitingClassName="bounce-out animated"
    exitedClassName="bounce-out animated"
  />
));

Bounce.displayName = 'Bounce';

export default Bounce;
