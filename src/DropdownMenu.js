import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactChildren from './utils/ReactChildren';
import isNullOrUndefined from './utils/isNullOrUndefined';


const propTypes = {
  classPrefix: PropTypes.string,
  pullRight: PropTypes.bool,
  onSelect: PropTypes.func,
  activeKey: PropTypes.any,
};

const defaultProps = {
  classPrefix: 'dropdown',
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
      classPrefix,
      ...props
    } = this.props;

    const items = ReactChildren.map(children, (item) => {
      if (React.isValidElement(item)) {
        return React.cloneElement(item, {
          onSelect,
          active: !isNullOrUndefined(activeKey) && activeKey === item.props.eventKey
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
