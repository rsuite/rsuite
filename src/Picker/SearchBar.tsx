import * as React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps, getUnhandledProps } from '../utils';

export interface SearchBarProps {
  classPrefix?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
  onChange?: (value: string, event: React.SyntheticEvent<HTMLElement>) => void;
}

class SearchBar extends React.Component<SearchBarProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    onChange: PropTypes.func
  };

  handleChange = (event: React.SyntheticEvent<HTMLElement>) => {
    this.props.onChange?.(_.get(event, 'target.value'), event);
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

const enhance = defaultProps<SearchBarProps>({
  classPrefix: 'picker-search-bar'
});

export default enhance(SearchBar);
