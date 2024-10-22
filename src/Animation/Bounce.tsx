import React from 'react';
import Transition, { TransitionProps } from './Transition';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';

export type BounceProps = TransitionProps;

/**
 * Bounce animation component
 * @see https://rsuitejs.com/components/animation/#bounce
 */
const Bounce = React.forwardRef(({ timeout = 300, ...props }: BounceProps, ref: React.Ref<any>) => {
  const { prefix } = useClassNames('anim');
  const { propsWithDefaults } = useCustom('Bounce', props);

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
