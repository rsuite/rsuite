import React from 'react';
import useCustomConfig from '@/internals/hooks/useCustomConfig';
import Transition, { TransitionProps } from './Transition';
import { useStyles } from '@/internals/hooks';

export type BounceProps = TransitionProps;

/**
 * Bounce animation component
 * @see https://rsuitejs.com/components/animation/#bounce
 */
const Bounce = React.forwardRef(({ timeout = 300, ...props }: BounceProps, ref: React.Ref<any>) => {
  const { prefix } = useStyles('anim');
  const { propsWithDefaults } = useCustomConfig('Bounce', props);

  return (
    <Transition
      {...propsWithDefaults}
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
