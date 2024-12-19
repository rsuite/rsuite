import React, { useContext } from 'react';
import { useClassNames } from '@/internals/hooks';
import { ModalContext } from './ModalContext';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
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
    const { getBodyStyles, closeButton, onModalClose } = context || {};
    const bodyStyles = getBodyStyles?.();
    let buttonElement: React.ReactNode = null;

    if (closeButton) {
      buttonElement =
        typeof closeButton === 'boolean' ? (
          <IconButton
            icon={<Close />}
            appearance="subtle"
            size="sm"
            className={prefix('close')}
            onClick={onModalClose}
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

export default ModalBody;
