import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { ModalContext } from './ModalContext';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import IconButton from '../IconButton';
import Close from '@rsuite/icons/Close';

export type ModalBodyProps = WithAsProps;

const ModalBody: RsRefForwardingComponent<'div', ModalBodyProps> = React.forwardRef(
  (props: ModalBodyProps, ref) => {
    const {
      as: Component = 'div',
      classPrefix = 'modal-body',
      className,
      style,
      children,
      ...rest
    } = props;
    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    const context = useContext(ModalContext);

    const bodyStyles = context?.getBodyStyles?.();
    return (
      <Component {...rest} ref={ref} style={{ ...bodyStyles, ...style }} className={classes}>
        {context?.isDrawer && (
          <IconButton
            icon={<Close />}
            appearance="subtle"
            size="sm"
            className={prefix('close')}
            onClick={context?.onModalClose}
          />
        )}
        {children}
      </Component>
    );
  }
);

ModalBody.displayName = 'ModalBody';
ModalBody.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  className: PropTypes.string
};

export default ModalBody;
