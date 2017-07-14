import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import ReactChildren from './utils/ReactChildren';
import isNullOrUndefined from './utils/isNullOrUndefined';


const propTypes = {
  prefixClass: PropTypes.string,
  pullRight: PropTypes.bool,
  onSelect: PropTypes.func,
  activeKey: PropTypes.any,
};

const defaultProps = {
  prefixClass: 'dropdown',
  pullRight: false,
  onSelect: null,
  activeKey: null
};

class DorpdownMenu extends React.Component {
  render() {

    const {
      pullRight,
      children,
      className,
      activeKey,
      onSelect,
      prefixClass,
      ...props
    } = this.props;

    const items = ReactChildren.map(children, (item) => {
      if (React.isValidElement(item)) {
        let { eventKey, active } = item.props;
        return React.cloneElement(item, {
          onSelect,
          active: isNullOrUndefined(activeKey) ? active : _.isEqual(activeKey, eventKey)
        });

      }
      return item;
    });

    const classes = classNames({
      [`${prefixClass}-menu-right`]: pullRight
    }, `${prefixClass}-menu`, className);

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
