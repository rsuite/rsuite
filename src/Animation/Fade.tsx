import React from 'react';
import useCustomConfig from '@/internals/hooks/useCustomConfig';
import Transition, { TransitionProps } from './Transition';
import { useStyles } from '@/internals/hooks';

export type FadeProps = TransitionProps;

/**
 * Fade animation component
 * @see https://rsuitejs.com/components/animation/#fade
 */
const Fade = React.forwardRef(
  ({ timeout = 300, className, ...props }: FadeProps, ref: React.Ref<any>) => {
    const { prefix, merge } = useStyles('anim');
    const { propsWithDefaults } = useCustomConfig('Fade', props);

    return (
      <Transition
        {...propsWithDefaults}
        ref={ref}
        timeout={timeout}
        className={merge(className, prefix('fade'))}
        enteredClassName={prefix('in')}
        enteringClassName={prefix('in')}
      />
    );
  }
);

Fade.displayName = 'Fade';

export default Fade;
