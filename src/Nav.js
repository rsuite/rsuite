import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import NavItem from './NavItem';
import NavDropdown from './NavDropdown';
import ReactChildren from './utils/ReactChildren';
import isNullOrUndefined from './utils/isNullOrUndefined';

const propTypes = {
  classPrefix: PropTypes.string,
  tabs: PropTypes.bool,
  pills: PropTypes.bool,
  justified: PropTypes.bool,
  stacked: PropTypes.bool,
  pullRight: PropTypes.bool,
  activeKey: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  onSelect: PropTypes.func
};

const defaultProps = {
  classPrefix: 'nav',
  tabs: false,
  pills: false,
  justified: false,
  stacked: false,
  pullRight: false,
  activeKey: undefined,
  onSelect: undefined
};

const contextTypes = {
  navbar: PropTypes.bool
};

class Nav extends React.Component {
  render() {
    const {
      classPrefix,
      tabs,
      pills,
      stacked,
      justified,
      pullRight,
      className,
      children,
      onSelect,
      activeKey,
      ...props
    } = this.props;

    const classes = classNames(classPrefix, {
      [`${classPrefix}bar-right`]: pullRight,
      [`${classPrefix}bar-nav`]: this.context.navbar,
      [`${classPrefix}-pills`]: pills,
      [`${classPrefix}-tabs`]: tabs,
      [`${classPrefix}-stacked`]: stacked,
      [`${classPrefix}-justified`]: justified
    }, className);


    const items = ReactChildren.mapCloneElement(children, (item) => {
      let { eventKey, active } = item.props;
      if (item.type.displayName !== 'NavItem') {
        return null;
      }
      return {
        onSelect,
        active: isNullOrUndefined(activeKey) ? active : isEqual(activeKey, eventKey)
      };
    });

    return (
      <ul {...props} className={classes} >
        {items}
      </ul>
    );
  }
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;
Nav.contextTypes = contextTypes;

Nav.Item = NavItem;
Nav.Dropdown = NavDropdown;

export default Nav;
