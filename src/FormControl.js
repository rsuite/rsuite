import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import elementType from 'rsuite-utils/lib/propTypes/elementType';

const propTypes = {
  componentClass: elementType,
  type: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  inputRef: PropTypes.func
};

const defaultProps = {
  componentClass: 'input',
  type: undefined,
  id: undefined,
  onChange: undefined,
  inputRef: undefined
};

const contextTypes = {
  formGroup: PropTypes.object
};

class FormControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const { onChange } = this.props;
    onChange && onChange(target.value, event);
  }

  render() {

    const { formGroup = {} } = this.context;
    const {
      type,
      className,
      inputRef,
      componentClass: Component,
      id = formGroup.controlId,
      ...props,
    } = this.props;


    let classes = classNames({
      // input[type="file"] should not have .form-control.
      'form-control': type !== 'file'
    }, className);

    return (
      <Component
        {...props}
        type={type}
        id={id}
        className={classes}
        ref={inputRef}
        onChange={this.handleChange}
      />
    );
  }
}

FormControl.propTypes = propTypes;
FormControl.defaultProps = defaultProps;
FormControl.contextTypes = contextTypes;

export default FormControl;
