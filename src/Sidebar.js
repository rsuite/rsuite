import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  pullRight: PropTypes.bool
};

const contextTypes = {
  page: PropTypes.bool
};

class Sidebar extends React.Component {
  render() {
    const { className, pullRight, ...props } = this.props;
    const activeClass = this.context.page ? 'page-sidebar' : 'sidebar';
    const wrapperClass = classNames(`${activeClass}-wrapper`, className);
    const classes = classNames('collapse', 'navbar-collapse', {
      right: pullRight,
    }, [activeClass]);

    return (
      <div
        {...props}
        className={wrapperClass}
      >
        <div className={classes}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;
Sidebar.contextTypes = contextTypes;

export default Sidebar;
