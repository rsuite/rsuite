// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getWidth, addStyle } from 'dom-lib';
import _ from 'lodash';
import createComponent from './utils/createComponent';
import createChainedFunction from './utils/createChainedFunction';
import prefix, { globalKey } from './utils/prefix';
import SafeAnchor from './SafeAnchor';
import Icon from './Icon';
import isOneOf from './utils/isOneOf';

type Trigger = 'click' | 'hover';
type Props = {
  divider?: boolean,
  panel?: boolean,
  trigger?: Trigger | Array<Trigger>,
  open?: boolean,
  expanded?: boolean,
  active?: boolean,
  disabled?: boolean,
  pullLeft?: boolean,
  submenu?: boolean,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  onClick?: (event: SyntheticEvent<*>) => void,
  icon?: React.Element<typeof Icon>,
  eventKey?: any,
  className?: string,
  style?: Object,
  children?: React.Node,
  classPrefix?: string,
  tabIndex?: number,
}

type State = {
  open?: boolean
}

const Component = createComponent(SafeAnchor);

class DropdownMenuItem extends React.Component<Props, State> {

  static displayName = 'DropdownMenuItem';
  static defaultProps = {
    classPrefix: `${globalKey}dropdown-item`,
    tabIndex: -1,
    trigger: 'hover'
  }

  static contextTypes = {
    sidenav: PropTypes.bool,
    expanded: PropTypes.bool
  };

  constructor(props: Props) {
    super(props);
    this.state = {
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

  toggle = (event: SyntheticEvent<*>, isOpen?: boolean) => {
    const { pullLeft } = this.props;
    const menu = event.currentTarget.querySelector(`.${globalKey}dropdown-menu`);
    let open = _.isUndefined(isOpen) ? !this.state.open : isOpen;
    this.setState({ open }, () => {
      if (pullLeft && menu && open) {
        let width = getWidth(menu);
        addStyle(menu, 'left', `${-width}px`);
      }
    });
  }

  handleClick = (event: SyntheticEvent<*>) => {
    let {
      onSelect,
      eventKey,
      disabled,
      onClick
    } = this.props;

    if (disabled) {
      event.preventDefault();
      return;
    }

    onSelect && onSelect(eventKey, event);
    onClick && onClick(event);
  }

  handleMouseOver = (event: SyntheticEvent<*>) => {
    this.toggle(event, true);
  }

  handleMouseOut = (event: SyntheticEvent<*>) => {
    this.toggle(event, false);
  }

  render() {

    const {
      children,
      divider,
      panel,
      onSelect,
      active,
      disabled,
      className,
      eventKey,
      submenu,
      style,
      classPrefix,
      tabIndex,
      pullLeft,
      icon,
      open,
      trigger,
      expanded,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix(expanded ? 'expand' : 'collapse')]: submenu && this.context.sidenav,
      [addPrefix('submenu')]: submenu,
      [addPrefix('open')]: _.isUndefined(open) ? this.state.open : open,
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled,
    }, addPrefix(`pull-${pullLeft ? 'left' : 'right'}`), className);

    const itemProps: Object = {};
    const itemToggleProps: Object = {
      onClick: this.handleClick,
    };

    if (isOneOf('hover', trigger) && submenu && !this.context.expanded) {
      itemProps.onMouseOver = this.handleMouseOver;
      itemProps.onMouseOut = this.handleMouseOut;
    }


    if (isOneOf('click', trigger) && submenu) {
      itemToggleProps.onClick = createChainedFunction(this.handleClick, this.toggle);
    }

    if (divider) {
      return (
        <li
          role="separator"
          style={style}
          className={classNames(addPrefix('divider'), className)}
        />
      );
    }

    if (panel) {
      return (
        <li
          style={style}
          className={classNames(addPrefix('panel'), className)}
        >
          {children}
        </li>
      );
    }

    return (
      <li
        {...itemProps}
        style={style}
        role="presentation"
        className={classes}
      >
        <Component
          {...props}
          {...itemToggleProps}
          className={addPrefix('content')}
          tabIndex={tabIndex}
        >
          {icon}
          {children}
        </Component>
      </li>
    );
  }
}

export default DropdownMenuItem;
