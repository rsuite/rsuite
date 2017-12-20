// @flow

import * as React from 'react';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';

import withStyleProps from './utils/withStyleProps';
import prefix, { globalKey } from './utils/prefix';


type Props = {
  disabled?: boolean,
  checked?: boolean,
  defaultChecked?: boolean,
  onChange?: Function,
  checkedChildren?: React.Node,
  unCheckedChildren?: React.Node,
  classPrefix: string,
  className?: string
};

type States = {
  checked?: boolean
}

class Toggle extends React.Component<Props, States> {

  static defaultProps = {
    classPrefix: `${globalKey}btn-toggle`
  };

  state = {
    checked: false
  };

  componentWillMount() {
    const { checked, defaultChecked } = this.props;
    this.setState({
      checked: isUndefined(checked) ? defaultChecked : checked
    });
  }

  getCheckedStatus() {
    const { checked } = this.props;
    return isUndefined(checked) ? this.state.checked : checked;
  }

  handleChange = (event: SyntheticEvent<*>) => {
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
      classPrefix,
      ...props
    } = this.props;

    const checked = this.getCheckedStatus();
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('checked')]: checked,
      disabled
    }, className);


    const inner = checked ? checkedChildren : unCheckedChildren;
    const elementProps = omit(props, Object.keys(Toggle.propTypes));

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

export default withStyleProps({
  hasSize: true
})(Toggle);
