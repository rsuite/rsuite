import React from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import classNames from 'classnames';
import ReactChildren from './utils/ReactChildren';

const propTypes = {
  name: PropTypes.string,
  inline: PropTypes.bool,
  value: PropTypes.array,        // eslint-disable-line react/forbid-prop-types
  defaultValue: PropTypes.array, // eslint-disable-line react/forbid-prop-types
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

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.value, this.props.value)) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleChange() {

    const value = [];
    const { onChange } = this.props;
    values(this.checkboxs).forEach((checkbox) => {
      if (checkbox.isChecked()) {
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

    const nextValue = value || this.state.value || [];
    const clesses = classNames({
      'checkbox-list': true
    }, className);

    const items = ReactChildren.mapCloneElement(children, (child, index) => {
      let childProps = {
        name,
        inline,
        ref: (ref) => {
          this.checkboxs[index] = ref;
        },
        [value ? 'checked' : 'defaultChecked']: nextValue.some(i => i === child.props.value),
        onChange: this.handleChange,
        ...child.props
      };
      return childProps;
    });

    const elementProps = omit(props, Object.keys(propTypes));

    return (
      <div
        {...elementProps}
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
