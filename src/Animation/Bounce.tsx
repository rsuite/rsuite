import * as React from 'react';
import Transition from './Transition';
import { TransitionProps } from './Animation.d';

const Bounce = React.forwardRef(
  ({ timeout = 300, ...props }: TransitionProps, ref: React.Ref<any>) => (
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
  )
);

Bounce.displayName = 'Bounce';

export default Bounce;
