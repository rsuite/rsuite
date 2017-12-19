// @flow

import * as React from 'react';
import classNames from 'classnames';
import withStyleProps from './utils/withStyleProps';
import prefix, { globalKey } from './utils/prefix';


type Props = {
  className?: string,
  classPrefix: string,
  dialogClassName?: string,
  style?: Object,
  dialogStyle?: Object,
  children?: React.Node
}

class ModalDialog extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}modal`
  }

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
        <div
          className={dialogClasses}
          style={dialogStyle}
        >
          <div className={addPrefix('content')} role="document">
            {children}
          </div>
        </div>
      </div>
    );
  }
}


export default withStyleProps({
  hasSize: true
})(ModalDialog);
