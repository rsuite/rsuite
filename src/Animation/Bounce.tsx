import React from 'react';
import Transition, { TransitionProps } from './Transition';
import { useClassNames } from '../utils';

export type BounceProps = TransitionProps;

const Bounce = React.forwardRef(({ timeout = 300, ...props }: BounceProps, ref: React.Ref<any>) => {
  const { rootPrefix } = useClassNames('bounce');

  return (
    <Transition
      {...props}
      ref={ref}
      animation
      timeout={timeout}
      enteringClassName={rootPrefix('bounce-in', 'animated')}
      enteredClassName={rootPrefix('bounce-in', 'animated')}
      exitingClassName={rootPrefix('bounce-out', 'animated')}
      exitedClassName={rootPrefix('bounce-out', 'animated')}
    />
  );
});

Bounce.displayName = 'Bounce';

export default Bounce;
