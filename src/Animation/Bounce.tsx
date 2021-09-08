import React from 'react';
import Transition, { TransitionProps } from './Transition';
import { useClassNames } from '../utils';

export type BounceProps = TransitionProps;

const Bounce = React.forwardRef(({ timeout = 300, ...props }: BounceProps, ref: React.Ref<any>) => {
  const { prefix } = useClassNames('anim');

  return (
    <Transition
      {...props}
      ref={ref}
      animation
      timeout={timeout}
      enteringClassName={prefix('bounce-in')}
      enteredClassName={prefix('bounce-in')}
      exitingClassName={prefix('bounce-out')}
      exitedClassName={prefix('bounce-out')}
    />
  );
});

Bounce.displayName = 'Bounce';

export default Bounce;
