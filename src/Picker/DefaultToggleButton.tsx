import * as React from 'react';
import Button from '../Button';
import { ButtonProps } from '../Button/Button.d';

const DefaultToggleButton = React.forwardRef<ButtonProps>(
  (props: ButtonProps, ref: React.RefObject<any>) => (
    <Button componentClass="a" ripple={false} {...props} ref={ref} />
  )
);
DefaultToggleButton.displayName = 'DefaultToggleButton';

export default DefaultToggleButton;
