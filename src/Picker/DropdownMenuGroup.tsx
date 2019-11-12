import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { toggleClass } from 'dom-lib';
import { prefix, getUnhandledProps } from '../utils';

export interface DropdownMenuGroupProps {
  title: React.ReactNode;
  classPrefix: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
}

class DropdownMenuGroup extends React.Component<DropdownMenuGroupProps> {
  static propTypes = {
    title: PropTypes.node,
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func
  };
  static defaultProps = {
    classPrefix: 'dropdown-menu-group'
  };

  groupRef: React.RefObject<HTMLLIElement>;

  constructor(props: DropdownMenuGroupProps) {
    super(props);
    this.groupRef = React.createRef();
  }

  handleClickGroup = (event: React.MouseEvent) => {
    const { onClick, classPrefix } = this.props;
    toggleClass(this.groupRef.current, `${classPrefix}-closed`);
    onClick?.(event);
  };

  render() {
    const { title, children, classPrefix, className, ...rest } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(DropdownMenuGroup, rest);

    return (
      <li {...unhandled} className={classes} ref={this.groupRef}>
        <div
          className={addPrefix('title')}
          role="menuitem"
          tabIndex={-1}
          onClick={this.handleClickGroup}
        >
          <span>{title}</span>
          <span className={addPrefix('caret')} />
        </div>
        <ul className={addPrefix('children')}>{children}</ul>
      </li>
    );
  }
}

export default DropdownMenuGroup;
