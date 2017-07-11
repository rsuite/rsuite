import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Collapse from 'rsuite-utils/lib/Animation/Collapse';

const propTypes = {
  prefixClass: PropTypes.string,
};

const defaultProps = {
  prefixClass: 'navbar'
};

const contextTypes = {
  expanded: PropTypes.bool
};

class NavbarCollapse extends React.Component {
  render() {
    const {
      children,
      prefixClass,
      ...props
    } = this.props;

    const classes = classNames('collapse', `${prefixClass}-collapse`);
    const expanded = this.context.expanded;

    return (
      <Collapse
        {...props}
        in={expanded}
      >
        <div className={classes} >
          {children}
        </div>
      </Collapse>
    );
  }
}

NavbarCollapse.contextTypes = contextTypes;
NavbarCollapse.propTypes = propTypes;
NavbarCollapse.defaultProps = defaultProps;

export default NavbarCollapse;
