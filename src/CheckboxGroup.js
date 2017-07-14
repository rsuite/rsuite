import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  name: PropTypes.string,
  inline: PropTypes.bool,
  value: PropTypes.array,
  defaultValue: PropTypes.array,
  onChange: PropTypes.func
};

class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.checkboxs = {};
    this.state = {
      value: props.defaultValue
    };
  }

  handleChange() {

    const value = [];
    const { onChange } = this.props;

    Object.values(this.checkboxs).forEach((checkbox) => {
      if (checkbox.state.checked) {
        value.push(checkbox.props.value);
      }
    });

    onChange && onChange(value);
  }
  render() {
    const {
      className,
      inline,
      name,
      value,
      children,
      ...props
    } = this.props;

    const nextValue = Object.assign([], value, this.state.value);
    const clesses = classNames({
      'checkbox-list': true
    }, className);

    const items = React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        name,
        inline,
        ref: (ref) => {
          this.checkboxs[index] = ref;
        },
        checked: nextValue.some(i => i === child.props.value),
        onChange: this.handleChange
      }));

    return (
      <div
        {...props}
        className={clesses}
        role="group"
      >
        {items}
      </div>
    );
  }
}

CheckboxGroup.propTypes = propTypes;

export default CheckboxGroup;
