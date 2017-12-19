import React from 'react';
import classNames from 'classnames';
import createComponent from './utils/createComponent';
import createChainedFunction from './utils/createChainedFunction';
import SafeAnchor from './SafeAnchor';
import prefix, { globalKey } from './utils/prefix';

const Component = createComponent(SafeAnchor);

type Props = {
  classPrefix?: string,
  eventKey?: any,
  onSelect?: (event: SyntheticEvent<*>) => void,
  onClick: (event: SyntheticEvent<*>) => void,
  disabled: boolean,
  active: boolean,

}

class PaginationButton extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}pagination-btn`,
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
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
    });

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
