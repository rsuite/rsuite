import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import createChainedFunction from './utils/createChainedFunction';

const propTypes = {
  classPrefix: PropTypes.string,
  onClick: PropTypes.func
};

const defaultProps = {
  classPrefix: 'navbar',
  onClick: undefined
};

const contextTypes = {
  onToggle: PropTypes.func,
  expanded: PropTypes.bool,
};

class NavbarToggle extends React.Component {
  render() {

    const {
      onClick,
      className,
      children,
      classPrefix,
      ...props
    } = this.props;

    const {
      onToggle,
      expanded,
    } = this.context;

    const classes = classNames(`${classPrefix}-toggle`, {
      collapsed: !expanded
    }, className);

    return (
      <button
        {...props}
        type="button"
        onClick={createChainedFunction(onClick, onToggle)}
        className={classes}
      >
        {children || (
          <span>
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </span>
        )}
      </button>
    );
  }
}

NavbarToggle.propTypes = propTypes;
NavbarToggle.defaultProps = defaultProps;
NavbarToggle.contextTypes = contextTypes;

export default NavbarToggle;
