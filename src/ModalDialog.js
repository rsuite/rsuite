// @flow

import * as React from 'react';
import classNames from 'classnames';
import compose from 'recompose/compose';

import { withStyleProps, defaultProps, prefix } from './utils';

type Props = {
  className?: string,
  classPrefix: string,
  dialogClassName?: string,
  style?: Object,
  dialogStyle?: Object,
  children?: React.Node
};

class ModalDialog extends React.Component<Props> {
  render() {
    const {
      style,
      children,
      dialogClassName,
      dialogStyle,
      classPrefix,
      className,
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
