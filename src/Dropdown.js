// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import kebabCase from 'lodash/kebabCase';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import { RootCloseWrapper } from 'rsuite-utils/lib/Overlay';

import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';
import createComponent from './utils/createComponent';
import createChainedFunction from './utils/createChainedFunction';
import prefix, { globalKey } from './utils/prefix';
import isOneOf from './utils/isOneOf';

import Icon from './Icon';

const Component = createComponent('div');

type Trigger = 'click' | 'hover' | 'contextMenu';
type Props = {
  activeKey?: any,
  classPrefix: string,
  trigger?: Trigger | Array<Trigger>,
  placement: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' | 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom',
  title?: React.Node,
  disabled?: boolean,
  icon?: React.Element<typeof Icon>,
  onClose?: () => void,
  onOpen?: () => void,
  onToggle?: (open?: boolean) => void,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  onMouseEnter?: (event: SyntheticEvent<*>) => void,
  onMouseLeave?: (event: SyntheticEvent<*>) => void,
  onContextMenu?: (event: SyntheticEvent<*>) => void,
  onClick?: (event: SyntheticEvent<*>) => void,
  menuStyle?: Object,
  className?: string,
  toggleClassName?: string,
  children?: React.ChildrenArray<React.Element<any>>,
  renderTitle?: (children?: React.Node) => React.Node,
  tabIndex?: number,
  open?: boolean,
  collapse?: boolean
}

type States = {
  title?: React.Node,
  open?: boolean,
  collapse?: boolean
}

class Dropdown extends React.Component<Props, States> {

  static defaultProps = {
    classPrefix: `${globalKey}dropdown`,
    placement: 'bottomLeft',
    trigger: 'click',
    tabIndex: 0
  }

  static Item = DropdownMenuItem;
  static Menu = DropdownMenu;
  static displayName = 'Dropdown';

  static contextTypes = {
    sidenav: PropTypes.bool,
    expanded: PropTypes.bool
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      title: null,
      collapse: props.collapse,
      open: props.open
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!isEqual(nextProps.open, this.props.open)) {
      this.setState({
        open: nextProps.open
      });
    }

    if (!isEqual(nextProps.collapse, this.props.collapse)) {
      this.setState({
        collapse: nextProps.collapse
      });
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


  handleClick = (event: SyntheticEvent<*>) => {

    event.preventDefault();
    if (this.props.disabled) {
      return;
    }

    const { expanded, sidenav } = this.context;
    if (expanded && sidenav) {
      this.setState({ collapse: !this.state.collapse });
    }

    this.toggle();
  }
  handleMouseEnter = () => {
    if (!this.props.disabled) {
      this.toggle(true);
    }
  }

  handleMouseLeave = () => {
    if (!this.props.disabled) {
      this.toggle(false);
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
      activeKey,
      tabIndex,
      toggleClassName,
      trigger,
      icon,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onContextMenu,
      open,
      collapse,
      ...props
    } = this.props;


    const toggleProps = {
      onClick,
      onContextMenu
    };

    const dropdownProps = {
      onMouseEnter,
      onMouseLeave,
    };

    if (isOneOf('click', trigger)) {
      toggleProps.onClick = createChainedFunction(this.handleClick, onClick);
    }

    if (isOneOf('contextMenu', trigger)) {
      toggleProps.onContextMenu = createChainedFunction(this.handleClick, onContextMenu);
    }

    if (isOneOf('hover', trigger)) {
      dropdownProps.onMouseEnter = createChainedFunction(this.handleMouseEnter, onMouseEnter);
      dropdownProps.onMouseLeave = createChainedFunction(this.handleMouseLeave, onMouseLeave);
    }

    const Toggle = (
      <DropdownToggle
        {...toggleProps}
        tabIndex={tabIndex}
        className={toggleClassName}
        renderTitle={renderTitle}
        icon={icon}
      >
        {this.state.title || title}
      </DropdownToggle>
    );

    let Menu = (
      <DropdownMenu
        activeKey={activeKey}
        onSelect={this.handleSelect}
        style={menuStyle}
      >
        {children}
      </DropdownMenu>
    );

    const isOpen = isUndefined(open) ? this.state.open : open;

    if (isOpen) {
      Menu = (
        <RootCloseWrapper onRootClose={this.toggle}>
          {Menu}
        </RootCloseWrapper>
      );
    }

    const addPrefix = prefix(classPrefix);
    const isCollapse = isUndefined(collapse) ? this.state.collapse : collapse;
    const classes = classNames(classPrefix, {
      [addPrefix('disabled')]: disabled,
      [addPrefix('open')]: isOpen,
      [addPrefix(isCollapse ? 'collapse' : 'expand')]: this.context.sidenav,
    }, addPrefix(`placement-${kebabCase(placement)}`), className);

    const elementProps = omit(props, ['onClose', 'onOpen', 'onToggle']);

    return (
      <Component
        {...elementProps}
        {...dropdownProps}
        className={classes}
        role="menu"
      >
        {Menu}
        {Toggle}
      </Component>
    );
  }

}

export default Dropdown;
