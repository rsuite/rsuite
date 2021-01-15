import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';

import { withStyleProps, defaultProps, prefix, refType } from '../utils';
import { ModalDialogProps } from './ModalDialog.d';
import mergeRefs from '../utils/mergeRefs';

export const modalDialogPropTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  dialogClassName: PropTypes.string,
  style: PropTypes.object,
  dialogStyle: PropTypes.object,
  children: PropTypes.node,
  dialogRef: refType,
  id: PropTypes.string,
  'aria-labelledby': PropTypes.string
};

class ModalDialog extends React.Component<ModalDialogProps> {
  static propTypes = modalDialogPropTypes;

  htmlElement: HTMLDivElement = null;
  getHTMLElement() {
    return this.htmlElement;
  }
  bindHtmlRef = ref => {
    this.htmlElement = ref;
  };
  render() {
    const {
      style,
      children,
      dialogClassName,
      dialogStyle,
      classPrefix,
      className,
      dialogRef,
      ...props
    } = this.props;

    const modalStyle = {
      display: 'block',
      ...style
    };

    const addPrefix = prefix(classPrefix);
    const dialogClasses = classNames(addPrefix('dialog'), dialogClassName);

    return (
      <div
        {...props}
        title={null}
        role="dialog"
        ref={mergeRefs(this.bindHtmlRef, dialogRef)}
        className={classNames(classPrefix, className)}
        style={modalStyle}
      >
        <div className={dialogClasses} style={dialogStyle}>
          <div className={addPrefix('content')}>{children}</div>
        </div>
      </div>
    );
  }
}

export default compose<any, ModalDialogProps>(
  withStyleProps<ModalDialogProps>({
    hasSize: true
  }),
  defaultProps<ModalDialogProps>({
    classPrefix: 'modal'
  })
)(ModalDialog);
