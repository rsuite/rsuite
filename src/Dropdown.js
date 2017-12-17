// @flow

import * as React from 'react';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';
import get from 'lodash/get';
import { RootCloseWrapper } from 'rsuite-utils/lib/Overlay';

import { find } from './utils/ReactChildren';
import createComponent from './utils/createComponent';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';

const Component = createComponent('div');

type Props = {
  title?: React.Node,
  disabled?: boolean,
  dropup?: boolean,
  onClose?: () => void,
  onOpen?: () => void,
  onToggle?: (open?: boolean) => void,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  activeKey?: any,
  menuStyle?: Object,
  autoClose?: boolean,
  className?: string,
  children?: React.ChildrenArray<React.Element<typeof DropdownMenuItem>>,
  renderTitle?: (children?: React.Node) => React.Node,
}

type States = {
  title?: React.Node,
  open?: boolean
}

class Dropdown extends React.Component<Props, States> {

  static defaultProps = {
    autoClose: true
  }
  static Item = DropdownMenuItem;

  state = {
    title: null,
    open: false
  }

  componentWillMount() {
    this.update();
  }
  componentWillReceiveProps(nextProps: Props) {
    if (!isEqual(nextProps, this.props)) {
      this.update(nextProps);
    }
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

  update(props?: Props) {

    const { children, activeKey } = props || this.props;
    let title;

    if (!isUndefined(activeKey)) {
      const activeItem = find(children, (item) => {
        let displayName = get(item, ['type', 'displayName']);
        if (displayName === 'DropdownMenuItem' || displayName === 'NavItem') {
          return isEqual(activeKey, item.props.eventKey) || item.props.active;
        }
        return false;
      });

      if (activeItem) {
        title = activeItem.props.children;
      }
    }

    this.setState({
      title
    });
  }

  handleClick = () => {
    if (!this.props.disabled) {
      this.toggle();
    }
  }

  handleSelect = (eventKey: any, event: SyntheticEvent<*>) => {

    const { onSelect, onClose, autoClose } = this.props;

    onSelect && onSelect(eventKey, event);

    if (autoClose) {
      this.toggle(false);
      onClose && onClose();
    }

  }

  render() {

    let {
      title,
      children,
      className,
      activeKey,
      dropup,
      menuStyle,
      disabled,
      renderTitle,
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
        activeKey={activeKey}
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
    const classes = classNames({
      disabled,
      dropup,
      dropdown: !dropup,
      open: this.state.open,
    }, className);

    const elementProps = omit(props, ['onClose', 'onOpen', 'onToggle', 'autoClose']);


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
