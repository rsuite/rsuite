import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '@/internals/hooks';
import { createChainedFunction } from '@/internals/utils';
import { ModalContext } from './ModalContext';
import CloseButton from '@/internals/CloseButton';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import Close from '@rsuite/icons/Close';
import IconButton from '../IconButton';
import DrawerContext from '../Drawer/DrawerContext';

export interface ModalHeaderProps extends WithAsProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Display close button */
  closeButton?: boolean;

  /** Called when Modal is hidden */
  onClose?: (event: React.MouseEvent) => void;
}

const ModalHeader: RsRefForwardingComponent<'div', ModalHeaderProps> = React.forwardRef(
  (props: ModalHeaderProps, ref) => {
    const {
      as: Component = 'div',
      classPrefix = 'modal-header',
      className,
      closeButton = true,
      children,
      onClose,
      ...rest
    } = props;
    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    const onModalClose = useContext(ModalContext)?.onModalClose;
    const isDrawer = useContext(DrawerContext)?.isDrawer;

    const buttonElement = isDrawer ? (
      <IconButton
        icon={<Close />}
        appearance="subtle"
        size="sm"
        className={prefix('close')}
        onClick={createChainedFunction(onClose, onModalClose)}
      />
    ) : (
      <CloseButton
        className={prefix('close')}
        onClick={createChainedFunction(onClose, onModalClose)}
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
ModalHeader.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  closeButton: PropTypes.bool,
  children: PropTypes.node
};

export default ModalHeader;
