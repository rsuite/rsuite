import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Ripple from '../Ripple';
import FormattedMessage from '../IntlProvider/FormattedMessage';
import { getUnhandledProps, defaultProps, prefix, isIE11 } from '../utils';

export interface UploadTriggerProps {
  name?: string;
  multiple?: boolean;
  disabled?: boolean;
  draggable?: boolean;
  accept?: string;
  classPrefix?: string;
  className?: string;
  children?: React.FunctionComponentElement<any>;
  componentClass: React.ElementType;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onDragEnter?: React.DragEventHandler<HTMLInputElement>;
  onDragLeave?: React.DragEventHandler<HTMLInputElement>;
  onDragOver?: React.DragEventHandler<HTMLInputElement>;
  onDrop?: React.DragEventHandler<HTMLInputElement>;
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
    draggable: PropTypes.bool,
    onDragEnter: PropTypes.func,
    onDragLeave: PropTypes.func,
    onDragOver: PropTypes.func,
    onDrop: PropTypes.func
  };
  inputRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = { dragOver: false };
  }

  getInputInstance() {
    return this.inputRef.current;
  }

  handleClick = () => {
    !this.props.disabled && this.inputRef.current.click();
  };

  handleDragEnter = event => {
    if (this.props.draggable) {
      event.preventDefault();
      this.setState({ dragOver: true });
    }
    this.props.onDragEnter?.(event);
  };

  handleDragLeave = event => {
    if (this.props.draggable) {
      event.preventDefault();
      this.setState({ dragOver: false });
    }
    this.props.onDragLeave?.(event);
  };

  handleDragOver = event => {
    this.props.draggable && event.preventDefault();
    this.props.onDragOver?.(event);
  };

  handleDrop = event => {
    if (this.props.draggable) {
      event.preventDefault();
      this.setState({ dragOver: false });
      this.props.onChange?.(event);
    }
    this.props.onDrop?.(event);
  };

  handleChange = event => {
    if (isIE11()) {
      /**
       * IE11 triggers onChange event of file input when element.value is assigned
       * https://github.com/facebook/react/issues/8793
       */
      if (event.target?.files?.length > 0) {
        this.props.onChange?.(event);
      }
      return;
    }

    this.props.onChange?.(event);
  };

  render() {
    const {
      name,
      accept,
      multiple,
      disabled,
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
          onChange={this.handleChange}
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
