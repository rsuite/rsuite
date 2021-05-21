import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { createChainedFunction, useClassNames } from '../utils';
import { ModalContext } from './Modal';
import CloseButton from '../CloseButton';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import Close from '@rsuite/icons/Close';
import IconButton from '../IconButton';

export interface ModalHeaderProps extends WithAsProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Display close button */
  closeButton?: boolean;

  /** Called when Modal is hidden */
  onClose?: (event: React.MouseEvent) => void;
}

const defaultProps: Partial<ModalHeaderProps> = {
  as: 'div',
  closeButton: true,
  classPrefix: 'modal-header'
};

const ModalHeader: RsRefForwardingComponent<'div', ModalHeaderProps> = React.forwardRef(
  (props: ModalHeaderProps, ref) => {
    const {
      as: Component,
      classPrefix,
      className,
      closeButton,
      children,
      onClose,
      ...rest
    } = props;
    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    const context = useContext(ModalContext);

    const buttonElement = !context?.isDrawer ? (
      <CloseButton
        className={prefix('close')}
        onClick={createChainedFunction(onClose, context?.onModalClose)}
      />
    ) : (
      <IconButton
        icon={<Close />}
        appearance="subtle"
        size="sm"
        className={prefix('close')}
        onClick={createChainedFunction(onClose, context?.onModalClose)}
      />
    );

    return (
      <Component {...rest} ref={ref} className={classes}>
        {closeButton && buttonElement}
        {children}
      </Component>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';
ModalHeader.defaultProps = defaultProps;
ModalHeader.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  closeButton: PropTypes.bool,
  children: PropTypes.node,
  onHide: PropTypes.func
};

export default ModalHeader;
