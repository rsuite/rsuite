import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { useClassNames } from '@/internals/hooks';
import { forwardRef, placementPolyfill } from '@/internals/utils';
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

  const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
  const classes = withClassPrefix('show');
  const wrapperClasses = merge(
    className,
    prefix('wrapper', {
      [`placement-${kebabCase(placementPolyfill(placement))}`]: placement
    })
  );

  return show ? (
    <Component {...rest} ref={ref} className={wrapperClasses}>
      <span className={classes}>
        <span className={prefix`arrow`} />
        <span className={prefix`inner`}>{children}</span>
      </span>
    </Component>
  ) : null;
});

FormErrorMessage.displayName = 'FormErrorMessage';

export default FormErrorMessage;
