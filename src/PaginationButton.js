import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import elementType from 'rsuite-utils/lib/propTypes/elementType';
import createChainedFunction from './utils/createChainedFunction';
import SafeAnchor from './SafeAnchor';

const propTypes = {
  eventKey: PropTypes.any,
  onSelect: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  componentClass: elementType
};

const defaultProps = {
  eventKey: undefined,
  onSelect: undefined,
  onClick: undefined,
  active: false,
  disabled: false,
  componentClass: SafeAnchor
};

class PaginationButton extends React.Component {
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
      componentClass: Component,
      className,
      style,
      onSelect,
      eventKey,
      ...props,
    } = this.props;


    return (
      <li
        className={classNames(className, { active, disabled })}
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

PaginationButton.propTypes = propTypes;
PaginationButton.defaultProps = defaultProps;

export default PaginationButton;
