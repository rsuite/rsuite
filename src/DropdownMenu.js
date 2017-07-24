import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import ReactChildren from './utils/ReactChildren';
import isNullOrUndefined from './utils/isNullOrUndefined';
import createChainedFunction from './utils/createChainedFunction';


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

    const classes = classNames({
      [`${prefixClass}-menu-right`]: pullRight
    }, `${prefixClass}-menu`, className);

    const items = ReactChildren.mapCloneElement(children, (item) => {
      let { eventKey, active, onSelect:onItemSelect } = item.props;
      return {
        onSelect:createChainedFunction(onSelect, onItemSelect),
        active: isNullOrUndefined(activeKey) ? active : _.isEqual(activeKey, eventKey)
      };
    });

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
