import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { elementType } from 'rsuite-utils/lib/propTypes';
import { RootCloseWrapper } from 'rsuite-utils/lib/Overlay';

import ReactChildren from './utils/ReactChildren';
import ButtonGroup from './ButtonGroup';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';

const propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  dropup: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  componentClass: elementType,
  /*
   * If 'select' is true , title will be updated after the 'onSelect' trigger .
   */
  select: PropTypes.bool,
  activeKey: PropTypes.any,
  bothEnds: PropTypes.bool,
  menuStyle: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  autoClose: PropTypes.bool
};

const defaultProps = {
  componentClass: ButtonGroup,
  activeKey: null,
  title: null,
  menuStyle: null,
  bothEnds: false,
  active: false,
  dropup: false,
  disabled: false,
  select: false,
  block: false,
  autoClose: true,
  onClose: null,
  onOpen: null,
  onToggle: null,
  onSelect: null,
};

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      activeKey: this.props.activeKey,
      open: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.update();
  }
  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }

  toggle(isOpen) {
    const { onOpen, onClose, onToggle } = this.props;
    let open = isOpen || !this.state.open;
    let handleToggle = open ? onOpen : onClose;

    this.setState({ open }, () => {
      if (handleToggle) {
        handleToggle();
      }
    });

    if (onToggle) {
      onToggle();
    }

  }

  update(props) {

    const { children, select, activeKey } = props || this.props;
    let title;

    if (select) {
      const activeItem = ReactChildren.find(children, item => (
        activeKey === item.props.eventKey || item.props.active
      ));
      if (activeItem) {
        title = activeItem.props.children;
      }
    }

    this.setState({
      activeKey,
      title
    });
  }

  handleClick() {
    if (!this.props.disabled) {
      this.toggle();
    }
  }

  handleSelect(eventKey, props, event) {

    const { select, onSelect } = this.props;

    if (select) {
      this.setState({
        title: props.children,
        activeKey: props.eventKey
      });
    }

    if (onSelect) {
      onSelect(eventKey, props, event);
    }

  }

  render() {

    let {
      autoClose,
      title,
      children,
      className,
      activeKey,
      dropup,
      bothEnds,
      menuStyle,
      componentClass: Component,
      ...props
    } = this.props;


    let Toggle = (
      <DropdownToggle
        {...props}
        onClick={this.handleClick}
      >
        {this.state.title || title}
      </DropdownToggle>
    );

    let Menu = (
      <DropdownMenu
        onClose={() => {
          if (autoClose) {
            this.toggle();
          }
        }}
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

    return (
      <Component
        {...props}
        className={classes}
        role="menu"
      >
        {Toggle}
        {Menu}
      </Component>
    );
  }


}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;
Dropdown.Item = DropdownMenuItem;

export default Dropdown;
