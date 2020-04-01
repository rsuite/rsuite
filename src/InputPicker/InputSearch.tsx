import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { getUnhandledProps, prefix, defaultProps, refType } from '../utils';

export interface InputSearchProps {
  classPrefix?: string;
  value?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  inputRef?: React.RefObject<any>;
  componentClass: React.ElementType;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

class InputSearch extends React.Component<InputSearchProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
    inputRef: refType,
    componentClass: PropTypes.elementType,
    onChange: PropTypes.func
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange?.(_.get(event, 'target.value'), event);
  };

  render() {
    const {
      value,
      componentClass: Component,
      children,
      className,
      classPrefix,
      inputRef,
      style,
      ...rest
    } = this.props;
    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(InputSearch, rest);

    return (
      <div className={classNames(classPrefix, className)} style={style}>
        <Component
          {...unhandled}
          ref={inputRef}
          className={addPrefix('input')}
          value={value}
          onChange={this.handleChange}
        />
        {children}
      </div>
    );
  }
}

const enhance = defaultProps<InputSearchProps>({
  classPrefix: 'picker-search',
  componentClass: 'input'
});

export default enhance(InputSearch);
