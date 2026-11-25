import React from 'react';
import Button, { ButtonProps } from '../../Button';

export type ToggleButtonProps = Omit<ButtonProps, 'color'>;

const ToggleButton = React.forwardRef<HTMLDivElement, ToggleButtonProps>((props, ref) => {
  return <Button {...props} ref={ref} as="div" ripple={false} />;
});

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
