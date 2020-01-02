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
  dragable?: boolean;
  accept?: string;
  classPrefix?: string;
  className?: string;
  children?: React.FunctionComponentElement<any>;
  componentClass: React.ElementType;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDragEnter?: (event: React.DragEvent<HTMLInputElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLInputElement>) => void;
  onDragOver?: (event: React.DragEvent<HTMLInputElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLInputElement>) => void;
}

interface UploaderTriggerState {
  dragOver: boolean;
}

const Button = props => <button {...props} type="button" />;

class UploadTrigger extends React.Component<UploadTriggerProps, UploaderTriggerState> {
  static propTypes = {
    name: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    accept: PropTypes.string,
    onChange: PropTypes.func,
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    componentClass: PropTypes.elementType,
    dragable: PropTypes.bool,
    onDragEnter: PropTypes.func,
    onDragLeave: PropTypes.func,
    onDragOver: PropTypes.func,
    onDrop: PropTypes.func
  };
  inputRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      dragOver: false
    };
  }

  getInputInstance() {
    return this.inputRef.current;
  }

  handleClick = () => {
    !this.props.disabled && this.inputRef.current.click();
  };

  handleDragEnter = event => {
    if (this.props.dragable) {
      event.preventDefault();
      this.setState({
        dragOver: true
      });
    }
    this.props.onDragEnter?.(event);
  };

  handleDragLeave = event => {
    if (this.props.dragable) {
      event.preventDefault();
      this.setState({
        dragOver: false
      });
    }
    this.props.onDragLeave?.(event);
  };

  handleDragOver = event => {
    this.props.dragable && event.preventDefault();
    this.props.onDragOver?.(event);
  };

  handleDrop = event => {
    if (this.props.dragable) {
      event.preventDefault();
      this.setState({
        dragOver: false
      });
      this.props.onChange?.(event);
    }
    this.props.onDrop?.(event);
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
      [addPrefix('disabled')]: disabled,
      [addPrefix('customize')]: children,
      [addPrefix('drag-over')]: this.state.dragOver
    });

    const buttonProps = {
      ...unhandled,
      className: addPrefix('btn'),
      onClick: this.handleClick,
      onDragEnter: this.handleDragEnter,
      onDragLeave: this.handleDragLeave,
      onDragOver: this.handleDragOver,
      onDrop: this.handleDrop
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
