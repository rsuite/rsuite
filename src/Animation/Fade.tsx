import * as React from 'react';
import classNames from 'classnames';
import Transition from './Transition';
import { TransitionProps } from './Animation.d';

const Fade = ({ timeout = 300, className, ...props }: TransitionProps) => (
  <Transition
    {...props}
    timeout={timeout}
    className={classNames(className, 'fade')}
    enteredClassName="in"
    enteringClassName="in"
  />
);

export default Fade;
