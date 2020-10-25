import React from 'react';
import classNames from 'classnames';
import Transition, { TransitionProps } from './Transition';

export type FadeProps = TransitionProps;

const Fade = React.forwardRef(
  ({ timeout = 300, className, ...props }: FadeProps, ref: React.Ref<any>) => (
    <Transition
      {...props}
      ref={ref}
      timeout={timeout}
      className={classNames(className, 'fade')}
      enteredClassName="in"
      enteringClassName="in"
    />
  )
);

Fade.displayName = 'Fade';

export default Fade;
