import React from 'react';
import { useStyles } from '@/internals/hooks';
import Button, { ButtonProps } from '../Button';

export type InputGroupButtonProps = ButtonProps;

/**
 * The `InputGroup.Button` component is used to specify an input field with an add-on.
 * @see https://rsuitejs.com/components/input/#input-group
 */
const InputGroupButton = React.forwardRef((props: ButtonProps, ref: React.Ref<any>) => {
  const { classPrefix = 'input-group-btn', className, ...rest } = props;
  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  return <Button {...rest} ref={ref} className={classes} />;
});

InputGroupButton.displayName = 'InputGroupButton';

export default InputGroupButton;
