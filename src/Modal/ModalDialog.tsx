import React from 'react';
import { useStyles } from '@/internals/hooks';
import { forwardRef, mergeStyles } from '@/internals/utils';
import type { WithAsProps, Size } from '@/internals/types';

export interface ModalDialogProps extends WithAsProps {
  /** A modal can have different sizes */
  size?: Size;
  dialogClassName?: string;
  dialogStyle?: React.CSSProperties;
}

const ModalDialog = forwardRef<'div', ModalDialogProps>((props: ModalDialogProps, ref) => {
  const {
    as: Component = 'div',
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
    <Component role="dialog" aria-modal ref={ref} className={classes} style={modalStyle} {...rest}>
      <div role="document" className={dialogClasses} style={dialogStyle}>
        {children}
      </div>
    </Component>
  );
});

ModalDialog.displayName = 'ModalDialog';

export default ModalDialog;
