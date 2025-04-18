import React from 'react';
import Transition, { TransitionProps } from './Transition';
import { useStyles, useCustom } from '@/internals/hooks';

export type FadeProps = TransitionProps;

/**
 * Fade animation component
 * @see https://rsuitejs.com/components/animation/#fade
 */
const Fade = React.forwardRef(
  ({ timeout = 300, className, ...props }: FadeProps, ref: React.Ref<any>) => {
    const { prefix, merge } = useStyles('anim');
    const { propsWithDefaults } = useCustom('Fade', props);

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
