import React from 'react';
import { useStyles } from '@/internals/hooks';
import { forwardRef, kebabPlace } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import type { PlacementCorners, WithAsProps } from '@/internals/types';

export interface FormErrorMessageProps extends WithAsProps {
  /** Show error messages */
  show?: boolean;

  /** The placement of error messages */
  placement?: PlacementCorners;
}

/**
 * The `<Form.ErrorMessage>` component is used to display error messages in the form.
 * @see https://rsuitejs.com/components/form/
 */
const FormErrorMessage = forwardRef<'div', FormErrorMessageProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('FormErrorMessage', props);
  const {
    as: Component = 'div',
    classPrefix = 'form-error-message',
    className,
    show,
    children,
    placement,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, prefix, merge } = useStyles(classPrefix);
  const classes = withPrefix('show');
  const wrapperClasses = merge(className, prefix('wrapper'));

  return show ? (
    <Component
      ref={ref}
      data-placement={kebabPlace(placement)}
      className={wrapperClasses}
      {...rest}
    >
      <span className={classes}>
        <span className={prefix`arrow`} />
        <span className={prefix`inner`}>{children}</span>
      </span>
    </Component>
  ) : null;
});

FormErrorMessage.displayName = 'FormErrorMessage';

export default FormErrorMessage;
