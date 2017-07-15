import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isNullOrUndefined from './utils/isNullOrUndefined';
import ReactChildren from './utils/ReactChildren';

const propTypes = {
  name: PropTypes.string,
  inline: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any,
  defaultValue: PropTypes.any
};

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.radios = {};
    this.state = {
      value: props.defaultValue
    };
  }

  handleChange(value, event) {


    const { onChange } = this.props;
    const radios = Object.values(this.radios);
    const shouldChange = (should) => {
      if (should && onChange) {
        onChange(value);
      }
    };

    if (event.target.type !== 'radio') {
      return;
    }

    radios.forEach((radio, index) => {
      radio.updateCheckedState(radio.props.value === value, () => (
        shouldChange((index + 1) === radios.length)
      ));
    });

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

    const clesses = classNames({
      'radio-list': true
    }, className);

    const nextValue = value || this.state.value;
    const items = ReactChildren.mapCloneElement(children, (child, index) => ({
      inline,
      name,
      checked: isNullOrUndefined(nextValue) ?
        child.props.checked : nextValue === child.props.value,
      onChange: this.handleChange,
      ref: (ref) => {
        this.radios[index] = ref;
      },
    }));
    return (
      <div
        {...props}
        className={clesses}
        role="button"
      >
        {items}
      </div>
    );
  }
}

RadioGroup.propTypes = propTypes;

export default RadioGroup;
