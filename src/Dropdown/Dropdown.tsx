import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { setStatic } from 'recompose';
import { contains } from 'dom-lib';

import RootCloseWrapper from '../Overlay/RootCloseWrapper';
import shallowEqual from '../utils/shallowEqual';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';
import {
  createChainedFunction,
  prefix,
  isOneOf,
  getUnhandledProps,
  defaultProps,
  placementPolyfill,
  getDOMNode
} from '../utils';
import { SidenavContext } from '../Sidenav/Sidenav';
import { PLACEMENT_8 } from '../constants';
import { DropdownProps } from './Dropdown.d';

interface DropdownState {
  open?: boolean;
}

interface SidenavContextType {
  openKeys: any[];
  sidenav: boolean;
  expanded: boolean;
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  static displayName = 'Dropdown';
  static contextType = SidenavContext;
  static propTypes = {
    activeKey: PropTypes.any,
    classPrefix: PropTypes.string,
    trigger: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.oneOf(['click', 'hover', 'contextMenu'])
    ]),
    placement: PropTypes.oneOf(PLACEMENT_8),
    title: PropTypes.node,
    disabled: PropTypes.bool,
    icon: PropTypes.node,
    menuStyle: PropTypes.object,
    className: PropTypes.string,
    toggleClassName: PropTypes.string,
    children: PropTypes.node,
    tabIndex: PropTypes.number,
    open: PropTypes.bool,
    eventKey: PropTypes.any,
    componentClass: PropTypes.elementType,
    toggleComponentClass: PropTypes.elementType,
    noCaret: PropTypes.bool,
    showHeader: PropTypes.bool,
    style: PropTypes.object,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    onToggle: PropTypes.func,
    onSelect: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onContextMenu: PropTypes.func,
    onClick: PropTypes.func,
    renderTitle: PropTypes.func
  };
  static defaultProps = {
    placement: 'bottomStart',
    trigger: 'click',
    tabIndex: 0
  };
  rootRef: React.RefObject<any>;
  constructor(props: DropdownProps) {
    super(props);
    this.state = {
      open: props.open
    };
    this.rootRef = React.createRef();
  }

  getOpen() {
    const { open } = this.props;
    if (_.isUndefined(open)) {
      return this.state.open;
    }
    return open;
  }

  toggle = (isOpen?: boolean) => {
    const { onOpen, onClose, onToggle } = this.props;
    const open = _.isUndefined(isOpen) ? !this.getOpen() : isOpen;
    const handleToggle = open ? onOpen : onClose;

    this.setState({ open });
    handleToggle?.();
    onToggle?.(open);
  };

  handleRootClose = (event: React.SyntheticEvent) => {
    // Prevent the event from bubbling when closing the overlay is triggered by its own element.
    // fix#1435
    if (contains(getDOMNode(this.rootRef.current), event.target)) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({ open: false });
    this.props.onToggle?.(false);
    this.props.onClose?.();
  };

  handleClick = (event: React.SyntheticEvent<any>) => {
    event.preventDefault();
    if (this.props.disabled) {
      return;
    }
    this.toggle();
  };

  handleOpenChange = (event: React.SyntheticEvent<any>) => {
    const { eventKey } = this.props;
    this.context?.onOpenChange?.(eventKey, event);
  };

  handleToggleChange = (eventKey: any, event: React.SyntheticEvent<any>) => {
    this.context?.onOpenChange?.(eventKey, event);
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

  handleSelect = (eventKey: any, event: React.MouseEvent<HTMLElement>) => {
    this.props.onSelect?.(eventKey, event);
    this.toggle(false);
  };

  render() {
    const {
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
      eventKey,
      componentClass: Component,
      toggleComponentClass,
      noCaret,
      style,
      showHeader,
      ...props
    } = this.props;

    const { openKeys = [], sidenav, expanded }: SidenavContextType = this.context || {};
    const menuExpanded = openKeys.some(key => shallowEqual(key, eventKey));
    const addPrefix = prefix(classPrefix);
    const open = this.getOpen();
    const collapsible = sidenav && expanded;
    const unhandled = getUnhandledProps(Dropdown, props);
    const toggleProps = {
      ...unhandled,
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
    const menuProps = {
      collapsible,
      activeKey,
      openKeys,
      expanded: menuExpanded,
      style: menuStyle,
      onSelect: this.handleSelect,
      onToggle: this.handleToggleChange
    };
    let menu = <DropdownMenu {...menuProps}>{children}</DropdownMenu>;

    if (open) {
      menu = (
        <RootCloseWrapper onRootClose={this.handleRootClose}>
          {(props, ref) => (
            <DropdownMenu {...props} {...menuProps} htmlElementRef={ref}>
              {showHeader && <li className={addPrefix('header')}>{title}</li>}
              {children}
            </DropdownMenu>
          )}
        </RootCloseWrapper>
      );
    }

    const toggle = (
      <DropdownToggle
        {...toggleProps}
        noCaret={noCaret}
        tabIndex={tabIndex}
        className={toggleClassName}
        renderTitle={renderTitle}
        icon={icon}
        componentClass={toggleComponentClass}
      >
        {title}
      </DropdownToggle>
    );

    const classes = classNames(classPrefix, className, {
      [addPrefix(`placement-${_.kebabCase(placementPolyfill(placement))}`)]: placement,
      [addPrefix('disabled')]: disabled,
      [addPrefix('no-caret')]: noCaret,
      [addPrefix('open')]: open,
      [addPrefix(menuExpanded ? 'expand' : 'collapse')]: sidenav
    });

    return (
      <Component
        ref={this.rootRef}
        {...dropdownProps}
        style={style}
        className={classes}
        role="menu"
      >
        {menu}
        {toggle}
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

export default EnhancedDropdown;
