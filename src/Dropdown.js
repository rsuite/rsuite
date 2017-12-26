// @flow

import * as React from 'react';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import kebabCase from 'lodash/kebabCase';
import omit from 'lodash/omit';
import { RootCloseWrapper } from 'rsuite-utils/lib/Overlay';
import createComponent from './utils/createComponent';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';
import prefix, { globalKey } from './utils/prefix';

const Component = createComponent('div');

type Props = {
  classPrefix: string,
  placement: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight',
  title?: React.Node,
  disabled?: boolean,
  onClose?: () => void,
  onOpen?: () => void,
  onToggle?: (open?: boolean) => void,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  menuStyle?: Object,
  className?: string,
  children?: React.ChildrenArray<React.Element<any>>,
  renderTitle?: (children?: React.Node) => React.Node
}

type States = {
  title?: React.Node,
  open?: boolean
}

class Dropdown extends React.Component<Props, States> {

  static defaultProps = {
    classPrefix: `${globalKey}dropdown`,
    placement: 'bottomLeft'
  }

  static Item = DropdownMenuItem;
  static Menu = DropdownMenu;

  state = {
    title: null,
    open: false
  }

  toggle = (isOpen?: boolean) => {
    const { onOpen, onClose, onToggle } = this.props;
    let open = isUndefined(isOpen) ? !this.state.open : isOpen;
    let handleToggle = open ? onOpen : onClose;

    this.setState({ open }, () => {
      handleToggle && handleToggle();
    });

    onToggle && onToggle(open);
  }


  handleClick = () => {
    if (!this.props.disabled) {
      this.toggle();
    }
  }

  handleSelect = (eventKey: any, event: SyntheticEvent<*>) => {
    const { onSelect } = this.props;
    onSelect && onSelect(eventKey, event);
    this.toggle(false);
  }

  render() {

    let {
      title,
      children,
      className,
      menuStyle,
      disabled,
      renderTitle,
      classPrefix,
      placement,
      ...props
    } = this.props;

    const Toggle = (
      <DropdownToggle
        renderTitle={renderTitle}
        onClick={this.handleClick}
      >
        {this.state.title || title}
      </DropdownToggle>
    );

    let Menu = (
      <DropdownMenu
        onSelect={this.handleSelect}
        style={menuStyle}
      >
        {children}
      </DropdownMenu>
    );

    if (this.state.open) {
      Menu = (
        <RootCloseWrapper onRootClose={this.toggle}>
          {Menu}
        </RootCloseWrapper>
      );
    }

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('disabled')]: disabled,
      [addPrefix('open')]: this.state.open
    }, addPrefix(`placement-${kebabCase(placement)}`), className);

    const elementProps = omit(props, ['onClose', 'onOpen', 'onToggle']);

    return (
      <Component
        {...elementProps}
        className={classes}
        role="menu"
      >
        {Toggle}
        {Menu}
      </Component>
    );
  }

}

export default Dropdown;
