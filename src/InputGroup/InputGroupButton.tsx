import React from 'react';
import { useClassNames } from '@/internals/hooks';
import Button, { ButtonProps } from '../Button';

export type InputGroupButtonProps = ButtonProps;

/**
 * The `InputGroup.Button` component is used to specify an input field with an add-on.
 * @see https://rsuitejs.com/components/input/#input-group
 */
const InputGroupButton = React.forwardRef((props: ButtonProps, ref: React.Ref<any>) => {
  const { classPrefix = 'input-group-btn', className, ...rest } = props;
  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const { withClassPrefix: withAddOnClassPrefix } = useClassNames('input-group-addon');
  const classes = merge(withAddOnClassPrefix(), className, withClassPrefix());

  return <Button {...rest} ref={ref} className={classes} />;
});

InputGroupButton.displayName = 'InputGroupButton';

export default InputGroupButton;
