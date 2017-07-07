import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import createChainedFunction from './utils/createChainedFunction';
import ReactChildren from './utils/ReactChildren';


const propTypes = {
  pullRight: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  activeKey: PropTypes.any,
  classPrefix: PropTypes.string
};

const defaultProps = {
  classPrefix: 'dropdown',
  pullRight: false,
  onClose: null,
  onSelect: null,
  activeKey: null
};

class DorpdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.items = {};
  }
  getFocusableMenuItems() {
    let menuNode = findDOMNode(this);
    if (menuNode === undefined) {
      return [];
    }
    return Array.from(menuNode.querySelectorAll('[role="menu-item"]'));
  }

  getItemsAndActiveIndex() {
    let items = this.getFocusableMenuItems();
    let activeItemIndex = items.indexOf(document.activeElement);
    return {
      items,
      activeItemIndex
    };
  }

  handleSelect(event) {
    let { onClose } = this.props;
    if (onClose) {
      onClose(event);
    }
  }

  render() {

    const {
      pullRight,
      children,
      className,
      activeKey,
      onSelect,
      classPrefix,
      ...props
    } = this.props;

    const items = ReactChildren.map(children, (item) => {
      if (React.isValidElement(item)) {
        return React.cloneElement(item, {
          onSelect: createChainedFunction(this.handleSelect, onSelect),
          active: activeKey === item.props.eventKey
        });
      }
      return item;
    });

    const classes = classNames({
      [`${classPrefix}-menu-right`]: pullRight
    }, `${classPrefix}-menu`, className);

    return (
      <ul
        {...props}
        className={classes}
        role="menu"
      >
        {items}
      </ul>
    );
  }

}

DorpdownMenu.propTypes = propTypes;
DorpdownMenu.defaultProps = defaultProps;

export default DorpdownMenu;
