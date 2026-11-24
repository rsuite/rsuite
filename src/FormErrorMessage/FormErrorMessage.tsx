/* @jsxRuntime classic */
import React, { useContext } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { CustomContext } from '@/internals/Provider/CustomContext';
import { useStyles, useCustom } from '@/internals/hooks';
import { forwardRef, kebabPlace } from '@/internals/utils';
import type { ErrorMessagePlacement } from '@/internals/types';

export interface FormErrorMessageProps extends BoxProps {
  /** Show error messages */
  show?: boolean;

  /** The placement of error messages */
  placement?: ErrorMessagePlacement;
}

/**
 * The `<Form.ErrorMessage>` component is used to display error messages in the form.
 * @see https://rsuitejs.com/components/form/
 */
const FormErrorMessage = forwardRef<'div', FormErrorMessageProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('FormErrorMessage', props);
  const { reduceMotion } = useContext(CustomContext);
  const {
    as,
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
    <Box
      as={as}
      ref={ref}
      data-placement={kebabPlace(placement)}
      className={wrapperClasses}
      {...rest}
      data-rs-motion={reduceMotion === undefined ? 'auto' : reduceMotion ? 'reduce' : 'allow'}
    >
      <span className={classes}>
        <span className={prefix`arrow`} />
        <span className={prefix`inner`}>{children}</span>
      </span>
    </Box>
  ) : null;
});

FormErrorMessage.displayName = 'FormErrorMessage';

export default FormErrorMessage;
