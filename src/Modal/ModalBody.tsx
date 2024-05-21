import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '@/internals/hooks';
import { ModalContext } from './ModalContext';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import IconButton from '../IconButton';
import Close from '@rsuite/icons/Close';
import DrawerContext from '../Drawer/DrawerContext';

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
    const closeButton = useContext(DrawerContext)?.closeButton;
    let buttonElement: React.ReactNode = null;

    if (closeButton) {
      buttonElement =
        typeof closeButton === 'boolean' ? (
          <IconButton
            icon={<Close />}
            appearance="subtle"
            size="sm"
            className={prefix('close')}
            onClick={context?.onModalClose}
          />
        ) : (
          closeButton
        );
    }

    return (
      <Component {...rest} ref={ref} style={{ ...bodyStyles, ...style }} className={classes}>
        {buttonElement}
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
