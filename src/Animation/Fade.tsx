import React from 'react';
import Transition, { TransitionProps } from './Transition';
import { useClassNames } from '../utils';

export type FadeProps = TransitionProps;

const Fade = React.forwardRef(
  ({ timeout = 300, className, ...props }: FadeProps, ref: React.Ref<any>) => {
    const { withClassPrefix, rootPrefix, merge } = useClassNames('fade');

    return (
      <Transition
        {...props}
        ref={ref}
        timeout={timeout}
        className={merge(className, withClassPrefix())}
        enteredClassName={rootPrefix('in')}
        enteringClassName={rootPrefix('in')}
      />
    );
  }
);

Fade.displayName = 'Fade';

export default Fade;
