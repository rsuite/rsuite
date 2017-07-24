import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { elementType } from 'rsuite-utils/lib/propTypes';
import { RootCloseWrapper } from 'rsuite-utils/lib/Overlay';

import ReactChildren from './utils/ReactChildren';
import ButtonGroup from './ButtonGroup';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';
import decorate, { STATE, STYLES, getClassNames } from './utils/decorate';


const propTypes = {
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  dropup: PropTypes.bool,
  /*
   * If 'select' is true , title will be updated after the 'onSelect' trigger .
   */
  select: PropTypes.bool,
  bothEnds: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  componentClass: elementType,
  activeKey: PropTypes.any,
  menuStyle: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  autoClose: PropTypes.bool,
  useAnchor: PropTypes.bool
};

const defaultProps = {
  componentClass: ButtonGroup,
  autoClose: true
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
    this.handleSelect = this.handleSelect.bind(this);

  }

  componentWillMount() {
    this.update();
  }
  componentWillReceiveProps(nextProps) {
    if (_.isEqual(nextProps, this.props)) {
      this.update(nextProps);
    }
  }

  toggle(isOpen) {
    const { onOpen, onClose, onToggle } = this.props;
    let open = _.isUndefined(isOpen) ? !this.state.open : isOpen;
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
      const activeItem = ReactChildren.find(children, item => (
        _.isEqual(activeKey, item.props.eventKey) || item.props.active
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
      componentClass: Component,
      ...props
    } = this.props;

    const buttonProps = { block, useAnchor, disabled };
    const elementProps = _.omit(props, ['select', 'onClose', 'onOpen', 'onToggle', 'autoClose']);

    if (Component.displayName === 'ButtonGroup') {
      elementProps.block = block;
    }


    let Toggle = (
      <DropdownToggle
        {...buttonProps}
        className={classNames(getClassNames(props, 'btn'))}
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

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;
Dropdown.Item = DropdownMenuItem;

export default decorate({
  size: true,
  shape: {
    oneOf: [..._.values(STATE), ..._.values(STYLES)],
    default: STATE.default
  }
})(Dropdown);
