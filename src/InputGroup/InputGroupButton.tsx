import React from 'react';
import { useClassNames } from '../utils';
import Button, { ButtonProps } from '../Button';

const InputGroupButton = React.forwardRef((props: ButtonProps, ref: React.Ref<any>) => {
  const { classPrefix = 'input-group-btn', className, ...rest } = props;
  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const { withClassPrefix: withAddOnClassPrefix } = useClassNames('input-group-addon');
  const classes = merge(withAddOnClassPrefix(), className, withClassPrefix());

  return <Button {...rest} ref={ref} className={classes} />;
});

InputGroupButton.displayName = 'InputGroupButton';

export default InputGroupButton;
