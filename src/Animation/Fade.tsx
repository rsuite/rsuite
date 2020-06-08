import * as React from 'react';
import classNames from 'classnames';
import Transition from './Transition';
import { TransitionProps } from './Animation.d';

const Fade = React.forwardRef(
  ({ timeout = 300, className, ...props }: TransitionProps, ref: React.Ref<any>) => (
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
