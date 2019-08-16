import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import setDisplayName from 'recompose/setDisplayName';

import { prefix, getUnhandledProps, partitionHTMLProps, defaultProps } from '../utils';
import { RadioProps } from './Radio.d';

interface RadioState {
  checked?: boolean;
}

class Radio extends React.Component<RadioProps, RadioState> {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    inline: PropTypes.bool,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    inputRef: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    tabIndex: PropTypes.number
  };
  static defaultProps = {
    tabIndex: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.defaultChecked
    };
  }

  isChecked() {
    const { checked } = this.props;
    return _.isUndefined(checked) ? this.state.checked : checked;
  }

  updateCheckedState(checked: boolean, callback?: () => void) {
    this.setState({ checked }, callback);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, disabled, onChange } = this.props;
    const checked = true;
    if (disabled) {
      return;
    }

    this.setState({ checked }, () => {
      onChange && onChange(value, checked, event);
    });
  };
  render() {
    const {
      inline,
      title,
      name,
      className,
      children,
      disabled,
      checked,
      defaultChecked,
      classPrefix,
      tabIndex,
      inputRef,
      onClick,
      ...props
    } = this.props;

    const nextChecked = this.isChecked();
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('inline')]: inline,
      [addPrefix('disabled')]: disabled,
      [addPrefix('checked')]: nextChecked
    });

    const unhandled = getUnhandledProps(Radio, props);
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled);

    const input = (
      <span className={addPrefix('wrapper')}>
        <input
          {...htmlInputProps}
          type="radio"
          checked={checked}
          defaultChecked={defaultChecked}
          ref={inputRef}
          name={name}
          tabIndex={tabIndex}
          disabled={disabled}
          onChange={this.handleChange}
          onClick={event => event.stopPropagation()}
        />
        <span className={addPrefix('inner')} />
      </span>
    );

    return (
      <div {...rest} onClick={onClick} className={classes}>
        <div className={addPrefix('checker')} role="button">
          <label title={title}>
            {input}
            {children}
          </label>
        </div>
      </div>
    );
  }
}

const EnhancedRadio = defaultProps<RadioProps>({
  classPrefix: 'radio'
})(Radio);

export default setDisplayName('Radio')(EnhancedRadio);
