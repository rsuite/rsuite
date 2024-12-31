import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { useClassNames } from '@/internals/hooks';
import { placementPolyfill } from '@/internals/utils';
import { PlacementCorners, WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import { useCustom } from '../CustomProvider';

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
const FormErrorMessage: RsRefForwardingComponent<'div', FormErrorMessageProps> = React.forwardRef(
  (props: FormErrorMessageProps, ref: React.Ref<HTMLDivElement>) => {
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
  }
);

FormErrorMessage.displayName = 'FormErrorMessage';

export default FormErrorMessage;
