import React from 'react';
import Transition, { TransitionProps } from './Transition';
import { useClassNames } from '../utils';

export type FadeProps = TransitionProps;

const Fade = React.forwardRef(
  ({ timeout = 300, className, ...props }: FadeProps, ref: React.Ref<any>) => {
    const { withClassPrefix, prefix, merge } = useClassNames('anim');

    return (
      <Transition
        {...props}
        ref={ref}
        timeout={timeout}
        className={merge(className, withClassPrefix('fade'))}
        enteredClassName={prefix('in')}
        enteringClassName={prefix('in')}
      />
    );
  }
);

Fade.displayName = 'Fade';

export default Fade;
