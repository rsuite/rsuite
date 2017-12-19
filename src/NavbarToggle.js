// @flow

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import createChainedFunction from './utils/createChainedFunction';
import { globalKey } from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string,
  onClick?: (event: SyntheticEvent<HTMLButtonElement>) => void,
  children?: React.Node
};


class NavbarToggle extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${globalKey}navbar-toggle`
  };

  static contextTypes = {
    onToggle: PropTypes.func,
    expanded: PropTypes.bool,
  };

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

    const classes = classNames(classPrefix, {
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

export default NavbarToggle;
