import React from 'react';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '@/internals/types';

export interface ModalDialogProps extends WithAsProps {
  /** A modal can have different sizes */
  size?: TypeAttributes.Size;
  dialogClassName?: string;
  dialogStyle?: React.CSSProperties;
}

const ModalDialog: RsRefForwardingComponent<'div', ModalDialogProps> = React.forwardRef(
  (props: ModalDialogProps, ref) => {
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

    const modalStyle = {
      display: 'block',
      ...style
    };

    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix(size));
    const dialogClasses = merge(dialogClassName, prefix('dialog'));

    return (
      <Component
        role="dialog"
        aria-modal
        {...rest}
        ref={ref}
        className={classes}
        style={modalStyle}
      >
        <div role="document" className={dialogClasses} style={dialogStyle}>
          <div className={prefix`content`}>{children}</div>
        </div>
      </Component>
    );
  }
);

ModalDialog.displayName = 'ModalDialog';

export default ModalDialog;
