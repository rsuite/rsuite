import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import decorate, { getClassNames } from './utils/decorate';

const propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  checkedChildren: PropTypes.node,
  unCheckedChildren: PropTypes.node,
  prefixClass: PropTypes.string
};

const defaultProps = {
  prefixClass: 'toggle'
};


class Toggle extends React.Component {
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

  getCheckedStatus() {
    const { checked } = this.props;
    return _.isUndefined(checked) ? this.state.checked : checked;
  }

  handleChange(event) {
    const { onChange, disabled } = this.props;
    const checked = !this.state.checked;

    if (disabled) {
      return;
    }

    this.setState({ checked }, () => {
      onChange && onChange(checked, event);
    });
  }

  render() {

    const {
      disabled,
      className,
      onChange,
      checkedChildren,
      unCheckedChildren,
      prefixClass,
      ...props
    } = this.props;

    const checked = this.getCheckedStatus();
    const classes = classNames({
      ...getClassNames(this.props),
      [`${prefixClass}-checked`]: checked,
      disabled
    }, className);


    const inner = checked ? checkedChildren : unCheckedChildren;
    const elementProps = _.omit(props, Object.keys(propTypes));

    return (
      <span
        {...elementProps}
        className={classes}
        role="button"
        tabIndex={-1}
        onClick={this.handleChange}
      >
        <span className="toggle-inner">{inner}</span>
      </span>
    );

  }
}

Toggle.propTypes = propTypes;
Toggle.defaultProps = defaultProps;

export default decorate({
  size: true
})(Toggle);
