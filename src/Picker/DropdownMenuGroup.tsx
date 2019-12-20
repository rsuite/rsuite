import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, getUnhandledProps } from '../utils';
import { StandardProps } from '../@types/common';

export interface DropdownMenuGroupProps extends StandardProps {
  children?: React.ReactNode;
}

class DropdownMenuGroup extends React.Component<DropdownMenuGroupProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
  };
  static defaultProps = {
    classPrefix: 'dropdown-menu-group'
  };

  render() {
    const { children, classPrefix, className, ...rest } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(DropdownMenuGroup, rest);

    return (
      <div role="listitem" className={classes} {...unhandled}>
        <div className={addPrefix('title')} tabIndex={-1}>
          <span>{children}</span>
          <span aria-hidden="true" className={addPrefix('caret')} />
        </div>
      </div>
    );
  }
}

export default DropdownMenuGroup;
