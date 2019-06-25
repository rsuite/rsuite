

import * as React from 'react';
import classNames from 'classnames';
import Ripple from './Ripple';
import FormattedMessage from './IntlProvider/FormattedMessage';
import { getUnhandledProps, createChainedFunction, defaultProps, prefix } from './utils';

type Props = {
  name?: string,
  multiple?: boolean,
  disabled?: boolean,
  accept?: string,
  onChange?: (event: SyntheticInputEvent<*>) => void,
  classPrefix?: string,
  className?: string,
  children?: React.Element<any>,
  innerRef?: React.ElementRef<*>,
  componentClass: React.ElementType
};

const Button = props => <button {...props} type="button" />;

class UploadTrigger extends React.Component<Props> {
  input;
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
      innerRef,
      componentClass: Component,
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
      <Component {...buttonProps}>
        <FormattedMessage id="upload" />
        <Ripple />
      </Component>
    );

    return (
      <div className={classes}>
        <input
          type="file"
          name={name}
          multiple={multiple}
          disabled={disabled}
          accept={accept}
          ref={createChainedFunction(this.bindInputRef, innerRef)}
          onChange={onChange}
        />
        {trigger}
      </div>
    );
  }
}

export default defaultProps({
  componentClass: Button,
  classPrefix: 'uploader-trigger'
})(UploadTrigger);
