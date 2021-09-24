import React from 'react';
import Button, { ButtonProps } from '../Button';

export type ToggleButtonProps = ButtonProps;

const ToggleButton = React.forwardRef(
  (props: ToggleButtonProps, ref: React.RefObject<HTMLDivElement>) => {
    return <Button {...props} ref={ref} as="div" ripple={false} />;
  }
);

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
