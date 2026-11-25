import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles } from '@/internals/hooks';
import { forwardRef, mergeStyles } from '@/internals/utils';
import type { Size } from '@/internals/types';

export interface ModalDialogProps extends BoxProps {
  /** A modal can have different sizes */
  size?: Size;
  dialogClassName?: string;
  dialogStyle?: React.CSSProperties;
}

const ModalDialog = forwardRef<'div', ModalDialogProps>((props: ModalDialogProps, ref) => {
  const {
    as,
    style,
    children,
    dialogClassName,
    dialogStyle,
    classPrefix = 'modal',
    className,
    size,
    ...rest
  } = props;

  const { merge, withPrefix, prefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix(size));
  const dialogClasses = merge(dialogClassName, prefix('dialog'));
  const modalStyle = mergeStyles({ display: 'block' }, style);

  return (
    <Box
      as={as}
      role="dialog"
      aria-modal
      ref={ref}
      className={classes}
      style={modalStyle}
      {...rest}
    >
      <div role="document" className={dialogClasses} style={dialogStyle}>
        {children}
      </div>
    </Box>
  );
});

ModalDialog.displayName = 'ModalDialog';

export default ModalDialog;
