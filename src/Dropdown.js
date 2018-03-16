// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import setStatic from 'recompose/setStatic';
import setDisplayName from 'recompose/setDisplayName';
import { RootCloseWrapper } from 'rsuite-utils/lib/Overlay';

import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';
import Icon from './Icon';

import { createChainedFunction, prefix, isOneOf, getUnhandledProps, defaultProps } from './utils';

type Trigger = 'click' | 'hover' | 'contextMenu';
type PlacementEightPoints =
  | 'bottomLeft'
  | 'bottomRight'
  | 'topLeft'
  | 'topRight'
  | 'leftTop'
  | 'rightTop'
  | 'leftBottom'
  | 'rightBottom';

type Props = {
  activeKey?: any,
  classPrefix: string,
  trigger?: Trigger | Array<Trigger>,
  placement: PlacementEightPoints,
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
  eventKey?: any,
  componentClass: React.ElementType
};

type State = {
  title?: React.Node,
  open?: boolean
};

class Dropdown extends React.Component<Props, State> {
  static defaultProps = {
    placement: 'bottomLeft',
    trigger: 'click',
    tabIndex: 0
  };

  static contextTypes = {
    sidenav: PropTypes.bool,
    expanded: PropTypes.bool,
    openKeys: PropTypes.array,
    onOpenChange: PropTypes.func
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      title: null,
      open: props.open
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!_.isEqual(nextProps.open, this.props.open)) {
      this.setState({
        open: nextProps.open
      });
    }
  }

  toggle = (isOpen?: boolean) => {
    const { onOpen, onClose, onToggle } = this.props;
    let open = _.isUndefined(isOpen) ? !this.state.open : isOpen;
    let handleToggle = open ? onOpen : onClose;

    this.setState({ open }, () => {
      handleToggle && handleToggle();
    });

    onToggle && onToggle(open);
  };

  handleClick = (event: SyntheticEvent<*>) => {
    event.preventDefault();
    if (this.props.disabled) {
      return;
    }
    this.toggle();
  };

  handleOpenChange = (event: SyntheticEvent<*>) => {
    const { eventKey } = this.props;
    const { onOpenChange } = this.context;
    onOpenChange && onOpenChange(eventKey, event);
  };

  handleToggleChange = (eventKey: any, event: SyntheticEvent<*>) => {
    const { onOpenChange } = this.context;
    onOpenChange && onOpenChange(eventKey, event);
  };

  handleMouseEnter = () => {
    if (!this.props.disabled) {
      this.toggle(true);
    }
  };

  handleMouseLeave = () => {
    if (!this.props.disabled) {
      this.toggle(false);
    }
  };

  handleSelect = (eventKey: any, event: SyntheticEvent<*>) => {
    const { onSelect } = this.props;
    onSelect && onSelect(eventKey, event);
    this.toggle(false);
  };

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
      eventKey,
      componentClass: Component,
      ...props
    } = this.props;

    const { openKeys = [], sidenav, expanded } = this.context;
    const menuExpanded = openKeys.some(key => _.isEqual(key, eventKey));
    const addPrefix = prefix(classPrefix);
    const isOpen = _.isUndefined(open) ? this.state.open : open;
    const collapsible = sidenav && expanded;

    const toggleProps = {
      onClick: createChainedFunction(this.handleOpenChange, onClick),
      onContextMenu
    };

    const dropdownProps = {
      onMouseEnter,
      onMouseLeave
    };

    /**
     * Bind event of trigger,
     * not used in  in the expanded state of '<Sidenav>'
     */
    if (!collapsible) {
      if (isOneOf('click', trigger)) {
        toggleProps.onClick = createChainedFunction(this.handleClick, toggleProps.onClick);
      }

      if (isOneOf('contextMenu', trigger)) {
        toggleProps.onContextMenu = createChainedFunction(this.handleClick, onContextMenu);
      }

      if (isOneOf('hover', trigger)) {
        dropdownProps.onMouseEnter = createChainedFunction(this.handleMouseEnter, onMouseEnter);
        dropdownProps.onMouseLeave = createChainedFunction(this.handleMouseLeave, onMouseLeave);
      }
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
        expanded={menuExpanded}
        collapsible={collapsible}
        activeKey={activeKey}
        onSelect={this.handleSelect}
        style={menuStyle}
        onToggle={this.handleToggleChange}
        openKeys={openKeys}
      >
        {children}
      </DropdownMenu>
    );

    if (isOpen) {
      Menu = <RootCloseWrapper onRootClose={this.toggle}>{Menu}</RootCloseWrapper>;
    }

    const classes = classNames(
      classPrefix,
      addPrefix(`placement-${_.kebabCase(placement)}`),
      className,
      {
        [addPrefix('disabled')]: disabled,
        [addPrefix('open')]: isOpen,
        [addPrefix(menuExpanded ? 'expand' : 'collapse')]: sidenav
      }
    );

    const unhandled = getUnhandledProps(Dropdown, props);

    return (
      <Component {...unhandled} {...dropdownProps} className={classes} role="menu">
        {Menu}
        {Toggle}
      </Component>
    );
  }
}

const EnhancedDropdown = defaultProps({
  componentClass: 'div',
  classPrefix: 'dropdown'
})(Dropdown);

setStatic('Item', DropdownMenuItem)(EnhancedDropdown);
setStatic('Menu', DropdownMenu)(EnhancedDropdown);

export default setDisplayName('Dropdown')(EnhancedDropdown);
