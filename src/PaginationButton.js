// @flow

import * as React from 'react';
import classNames from 'classnames';
import createComponent from './utils/createComponent';
import createChainedFunction from './utils/createChainedFunction';
import SafeAnchor from './SafeAnchor';
import prefix, { globalKey } from './utils/prefix';

const Component = createComponent(SafeAnchor);

type Props = {
  classPrefix?: string,
  eventKey?: any,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  onClick?: (event: SyntheticEvent<*>) => void,
  disabled?: boolean,
  active?: boolean,
  className?: string,
  style?: Object

}

class PaginationButton extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}pagination-btn`,
  }

  handleClick = (event: SyntheticEvent<*>) => {
    const { disabled, onSelect, eventKey } = this.props;
    if (disabled) {
      return;
    }

    onSelect && onSelect(eventKey, event);
  }

  render() {

    const {
      active,
      disabled,
      onClick,
      className,
      classPrefix,
      style,
      onSelect,
      eventKey,
      ...props,
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled,
    }, className);

    return (
      <li
        className={classes}
        style={style}
      >
        <Component
          {...props}
          disabled={disabled}
          onClick={createChainedFunction(onClick, this.handleClick)}
        />
      </li>
    );
  }
}


export default PaginationButton;
