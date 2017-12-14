// @flow

import * as React from 'react';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';
import get from 'lodash/get';
import setStatic from 'recompose/setStatic';
import { RootCloseWrapper } from 'rsuite-utils/lib/Overlay';

import { find } from './utils/ReactChildren';
import withStyleProps from './utils/withStyleProps';
import createComponent from './utils/createComponent';
import ButtonGroup from './ButtonGroup';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';

const Component = createComponent(ButtonGroup);

type Props = {
  noCaret?: boolean,
  title?: React.Node,
  useAnchor?: boolean,
  disabled?: boolean,
  block?: boolean,
  dropup?: boolean,
  /*
   * If 'select' is true , title will be updated after the 'onSelect' trigger .
   */
  select?: boolean,
  bothEnds?: boolean,
  onClose?: Function,
  onOpen?: Function,
  onToggle?: Function,
  onSelect?: Function,
  activeKey?: any,
  menuStyle?: Object,
  autoClose?: boolean,
  className?: string,
  children?: React.ChildrenArray<React.Element<typeof DropdownMenuItem>>,
}

type States = {
  title?: React.Node,
  activeKey?: any,
  open?: boolean
}

class Dropdown extends React.Component<Props, States> {

  static defaultProps = {
    componentClass: ButtonGroup,
    autoClose: true
  }

  state = {
    title: null,
    open: false
  }

  componentWillMount() {
    const { activeKey } = this.props;
    this.setState({ activeKey });
    this.update();
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props)) {
      this.update(nextProps);
    }
  }

  toggle = (isOpen) => {
    const { onOpen, onClose, onToggle } = this.props;
    let open = isUndefined(isOpen) ? !this.state.open : isOpen;
    let handleToggle = open ? onOpen : onClose;

    this.setState({ open }, () => {
      handleToggle && handleToggle();
    });

    onToggle && onToggle();

  }

  update(props) {

    const { children, select, activeKey } = props || this.props;
    let title;

    if (select) {
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
      activeKey,
      title
    });
  }

  handleClick = () => {
    if (!this.props.disabled) {
      this.toggle();
    }
  }

  handleSelect = (eventKey, props, event) => {

    const { select, onSelect, onClose, autoClose } = this.props;

    if (select) {
      this.setState({
        title: props.children,
        activeKey: props.eventKey
      });
    }

    onSelect && onSelect(eventKey, props, event);
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
      bothEnds,
      menuStyle,
      block,
      useAnchor,
      disabled,
      noCaret,
      ...props
    } = this.props;

    const Toggle = (
      <DropdownToggle
        block={block}
        useAnchor={useAnchor}
        disabled={disabled}
        noCaret={noCaret}
        onClick={this.handleClick}
      >
        {this.state.title || title}
      </DropdownToggle>
    );

    let Menu = (
      <DropdownMenu
        onSelect={this.handleSelect}
        activeKey={this.state.activeKey}
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
      dropup,
      dropdown: !dropup,
      open: this.state.open,
      'both-ends': bothEnds
    }, className);

    const elementProps = omit(props, ['select', 'onClose', 'onOpen', 'onToggle', 'autoClose']);
    if (Component.displayName === 'ButtonGroup') {
      elementProps.block = block;
    }

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

const WrapDropdown: any = withStyleProps({
  hasSize: true,
  hasStatus: true,
  hasColor: true
})(Dropdown);


setStatic('Item', DropdownMenuItem)(WrapDropdown);

export default WrapDropdown;
