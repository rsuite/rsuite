// @flow

import * as React from 'react';

import classNames from 'classnames';
import { prefix, defaultProps, getUnhandledProps } from '../utils';

type Props = {
  classPrefix?: string,
  value?: string,
  placeholder?: string,
  className?: string,
  children?: React.Node,
  onChange?: (value: string, event: SyntheticInputEvent<HTMLInputElement>) => void
};

class SearchBar extends React.Component<Props> {
  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    onChange && onChange(event.target.value, event);
  };

  render() {
    const { value, children, className, classPrefix, placeholder, ...rest } = this.props;
    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(SearchBar, rest);

    return (
      <div {...unhandled} className={classNames(classPrefix, className)}>
        <input
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
  classPrefix: 'picker-search-bar'
});

export default enhance(SearchBar);
