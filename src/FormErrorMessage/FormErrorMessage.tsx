import React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import { placementPolyfill, useClassNames } from '../utils';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface FormErrorMessageProps extends WithAsProps {
  /** Show error messages */
  show?: boolean;

  /** The placement of error messages */
  placement?: TypeAttributes.Placement8;
}

const FormErrorMessage: RsRefForwardingComponent<'div', FormErrorMessageProps> = React.forwardRef(
  (props: FormErrorMessageProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      as: Component = 'div',
      classPrefix = 'form-error-message',
      className,
      show,
      children,
      placement,
      ...rest
    } = props;

    const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
    const classes = withClassPrefix('show');
    const wrapperClasses = merge(
      className,
      prefix('wrapper', {
        [`placement-${kebabCase(placementPolyfill(placement))}`]: placement
      })
    );

    if (!show) {
      return null;
    }

    return (
      <Component {...rest} ref={ref} className={wrapperClasses}>
        <span className={classes}>
          <span className={prefix`arrow`} />
          <span className={prefix`inner`}>{children}</span>
        </span>
      </Component>
    );
  }
);

FormErrorMessage.displayName = 'FormErrorMessage';
FormErrorMessage.propTypes = {
  show: PropTypes.bool,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  placement: PropTypes.oneOf([
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
