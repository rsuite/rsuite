import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';

import { withStyleProps, defaultProps, prefix } from '../utils';
import { ModalDialogProps } from './ModalDialog.d';

class ModalDialog extends React.Component<ModalDialogProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    dialogClassName: PropTypes.string,
    style: PropTypes.object,
    dialogStyle: PropTypes.object,
    children: PropTypes.node,
    innerRef: PropTypes.func
  };
  render() {
    const {
      style,
      children,
      dialogClassName,
      dialogStyle,
      classPrefix,
      className,
      innerRef,
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
        ref={innerRef}
        className={classNames(classPrefix, className)}
        style={modalStyle}
      >
        <div className={dialogClasses} style={dialogStyle}>
          <div className={addPrefix('content')} role="document">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyleProps({
    hasSize: true
  }),
  defaultProps({
    classPrefix: 'modal'
  })
)(ModalDialog);
