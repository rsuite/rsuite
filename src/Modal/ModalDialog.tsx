import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames, SIZE } from '../utils';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../@types/common';

export interface ModalDialogProps extends WithAsProps {
  /** A modal can have different sizes */
  size?: TypeAttributes.Size;
  dialogClassName?: string;
  dialogStyle?: React.CSSProperties;
}

export const modalDialogPropTypes = {
  size: PropTypes.oneOf(SIZE),
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  dialogClassName: PropTypes.string,
  style: PropTypes.object,
  dialogStyle: PropTypes.object,
  children: PropTypes.node
};

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
ModalDialog.propTypes = modalDialogPropTypes;

export default ModalDialog;
