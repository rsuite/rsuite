import React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import { useClassNames } from '@/internals/hooks';
import { placementPolyfill } from '@/internals/utils';
import { oneOf } from '@/internals/propTypes';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import { useCustom } from '../CustomProvider';

export interface FormErrorMessageProps extends WithAsProps {
  /** Show error messages */
  show?: boolean;

  /** The placement of error messages */
  placement?: TypeAttributes.Placement8;
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
FormErrorMessage.propTypes = {
  show: PropTypes.bool,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  placement: oneOf([
    'bottomStart',
    'bottomEnd',
    'topStart',
    'topEnd',
    'leftStart',
    'rightStart',
    'leftEnd',
    'rightEnd'
  ])
};

export default FormErrorMessage;
