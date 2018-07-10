// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { getUnhandledProps, prefix, defaultProps } from '../utils';

type Props = {
  classPrefix?: string,
  value?: string,
  placeholder?: string,
  className?: string,
  children?: React.Node,
  onChange?: (value: string, event: SyntheticEvent<*>) => void,
  inputRef?: React.ElementRef<*>,
  componentClass: React.ElementType
};

class InputSearch extends React.Component<Props> {
  handleChange = (event: SyntheticEvent<*>) => {
    const { onChange } = this.props;
    onChange && onChange(_.get(event, 'target.value'), event);
  };

  render() {
    const {
      value,
      componentClass: Component,
      children,
      className,
      classPrefix,
      placeholder,
      inputRef,
      ...rest
    } = this.props;
    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(InputSearch, rest);

    return (
      <div {...unhandled} className={classNames(classPrefix, className)}>
        <Component
          ref={inputRef}
          className={addPrefix('input')}
          value={value}
          onChange={this.handleChange}
          placeholder={placeholder}
        />
        {children}
      </div>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'picker-search',
  componentClass: 'input'
});

export default enhance(InputSearch);
