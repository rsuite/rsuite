// @flow

import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'rsuite-intl';

import { getUnhandledProps, defaultProps, prefix } from './utils';

type Props = {
  name?: string,
  multiple?: boolean,
  disabled?: boolean,
  accept?: string,
  onChange?: (event: SyntheticInputEvent<*>) => void,
  classPrefix?: string,
  className?: string,
  children?: React.Element<any>
};

const Button = props => <button {...props} type="button" />;

class UploadTrigger extends React.Component<Props> {
  setValue(value: string) {
    this.input.value = value;
  }

  input = {};

  handleClick = () => {
    !this.props.disabled && this.input.click();
  };

  bindInputRef = (ref: React.ElementRef<*>) => {
    this.input = ref;
  };

  render() {
    const {
      name,
      accept,
      multiple,
      disabled,
      onChange,
      children,
      classPrefix,
      className,
      ...rest
    } = this.props;

    const unhandled = getUnhandledProps(UploadTrigger, rest);
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('disabled')]: disabled
    });

    const buttonProps = {
      ...unhandled,
      className: addPrefix('btn'),
      onClick: this.handleClick
    };

    const trigger = children ? (
      React.cloneElement(React.Children.only(children), buttonProps)
    ) : (
      <Button {...buttonProps}>
        <FormattedMessage id="upload" />
      </Button>
    );

    return (
      <div className={classes}>
        <input
          type="file"
          name={name}
          multiple={multiple}
          disabled={disabled}
          accept={accept}
          ref={this.bindInputRef}
          onChange={onChange}
        />
        {trigger}
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'uploader-trigger'
})(UploadTrigger);
