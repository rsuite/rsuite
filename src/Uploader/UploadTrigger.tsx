import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Ripple from '../Ripple';
import FormattedMessage from '../IntlProvider/FormattedMessage';
import { getUnhandledProps, defaultProps, prefix } from '../utils';

export interface UploadTriggerProps {
  name?: string;
  multiple?: boolean;
  disabled?: boolean;
  accept?: string;
  classPrefix?: string;
  className?: string;
  children?: React.FunctionComponentElement<any>;
  componentClass: React.ElementType;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Button = props => <button {...props} type="button" />;

class UploadTrigger extends React.Component<UploadTriggerProps> {
  static propTypes = {
    name: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    accept: PropTypes.string,
    onChange: PropTypes.func,
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    componentClass: PropTypes.elementType
  };
  inputRef: React.RefObject<HTMLInputElement>;
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  getInputInstance() {
    return this.inputRef.current;
  }

  handleClick = () => {
    !this.props.disabled && this.inputRef.current.click();
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
      React.cloneElement<any>(React.Children.only(children), buttonProps)
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
          ref={this.inputRef}
          onChange={onChange}
        />
        {trigger}
      </div>
    );
  }
}

export default defaultProps<UploadTriggerProps>({
  componentClass: Button,
  classPrefix: 'uploader-trigger'
})(UploadTrigger);
