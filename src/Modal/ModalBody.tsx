import React, { useContext } from 'react';
import IconButton from '../IconButton';
import Close from '@rsuite/icons/Close';
import { useStyles } from '@/internals/hooks';
import { ModalContext } from './ModalContext';
import { forwardRef, mergeStyles } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';

export type ModalBodyProps = WithAsProps;

const ModalBody = forwardRef<'div', ModalBodyProps>((props, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'modal-body',
    className,
    style,
    children,
    ...rest
  } = props;
  const { withPrefix, merge, prefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

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
    <Component {...rest} ref={ref} style={mergeStyles(bodyStyles, style)} className={classes}>
      {buttonElement}
      {children}
    </Component>
  );
});

ModalBody.displayName = 'ModalBody';

export default ModalBody;
