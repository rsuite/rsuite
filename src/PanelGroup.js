import React, { cloneElement } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ReactChildren from './utils/ReactChildren';


const propTypes = {
  accordion: PropTypes.bool,
  activeKey: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  defaultActiveKey: PropTypes.any,
  prefixClass: PropTypes.string,
  onSelect: PropTypes.func
};

const defaultProps = {
  prefixClass: 'panel-group',
  accordion: false
};

class PanelGroup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.renderPanel = this.renderPanel.bind(this);
    this.state = {
      activeKey: props.defaultActiveKey
    };
  }
  shouldComponentUpdate() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this.isChanging;
  }
  handleSelect(activeKey, event) {
    const { onSelect } = this.props;
    event.preventDefault();
    if (onSelect) {
      this.isChanging = true;
      onSelect(activeKey, event);
      this.isChanging = false;
    }

    if (this.state.activeKey === activeKey) {
      activeKey = undefined;
    }

    this.setState({ activeKey });
  }

  renderPanel(child, index) {

    if (!React.isValidElement(child)) {
      return child;
    }
    const { activeKey, accordion } = this.props;
    const props = {
      key: child.key ? child.key : index,
      ref: child.ref
    };

    if (accordion) {
      props.headerRole = 'tab';
      props.panelRole = 'tabpanel';
      props.collapsible = true;
      props.expanded = (child.props.eventKey === (activeKey || this.state.activeKey));
      props.onSelect = this.handleSelect;
    }

    return cloneElement(
      child,
      props
    );
  }

  render() {

    let {
      className,
      accordion,
      children,
      onSelect,
      ...props
    } = this.props;

    let classes = classNames('panel-group', className);
    const elementProps = _.omit(props, Object.keys(propTypes));
    return (
      <div
        {...elementProps}
        role={accordion ? 'tablist' : undefined}
        className={classes}
      >
        {ReactChildren.map(children, this.renderPanel)}
      </div>
    );
  }
}

PanelGroup.propTypes = propTypes;
PanelGroup.defaultProps = defaultProps;

export default PanelGroup;
