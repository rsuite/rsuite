import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  inputRef: PropTypes.func
};

const defaultProps = {
  title: null,
  inline: false,
  disabled: false,
  checked: undefined,
  defaultChecked: undefined,
  onChange: undefined,
  inputRef: undefined
};

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }
  handleChange(event) {
    const { onChange, disabled, value } = this.props;
    const target = event.target;
    const checked = !this.state.checked;

    if (disabled) {
      return;
    }

    this.setState({
      checked
    }, () => {
      if (onChange) {
        onChange(value ? target.value : checked, event);
      }
    });
  }

  render() {

    const {
      inline,
      disabled,
      className,
      onChange,
      children,
      title,
      inputRef,
      style,
      ...props
    } = this.props;

    const { checked } = this.state;
    const classes = classNames({
      'checkbox-inline': inline
    }, 'checkbox', className);

    const checkboxClasses = classNames({
      checker: true,
      disabled
    });

    const input = (
      <span className={classNames({ checked })}>
        <input
          {...props}
          type="checkbox"
          ref={inputRef}
          disabled={disabled}
          onChange={this.handleChange}
        />
      </span>
    );

    return (
      <div
        className={classes}
        style={style}
      >
        <div
          className={checkboxClasses}
          role="button"
        >
          <label title={title}>
            {input}
            {children}
          </label>
        </div>
      </div>
    );
  }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
