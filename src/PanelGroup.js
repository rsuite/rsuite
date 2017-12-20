// @flow

import * as React from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';
import { mapCloneElement } from './utils/ReactChildren';

type Props = {
  accordion?: boolean,
  activeKey?: any,
  defaultActiveKey?: any,
  className?: string,
  children?: node,
  classPrefix?: string,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
}


class PanelGroup extends React.Component<Props> {

  static defaultProps = {
    classPrefix: 'panel-group',
    accordion: false
  };

  componentWillMount() {
    this.setState({ activeKey: this.props.defaultActiveKey });
  }

  shouldComponentUpdate() {
    return !this.isChanging;
  }
  handleSelect = (activeKey: any, event: SyntheticEvent<*>) => {
    const { onSelect } = this.props;
    event.preventDefault();
    if (onSelect) {
      this.isChanging = true;
      onSelect(activeKey, event);
      this.isChanging = false;
    }

    if (isEqual(this.state.activeKey, activeKey)) {
      activeKey = undefined;
    }
    this.setState({ activeKey });
  }

  renderPanel = (child, index) => {

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

    return props;
  }

  render() {

    let {
      className,
      accordion,
      classPrefix,
      children,
      onSelect,
      ...props
    } = this.props;

    let classes = classNames(classPrefix, className);
    const elementProps = omit(props, Object.keys(PanelGroup.propTypes));
    return (
      <div
        {...elementProps}
        role={accordion ? 'tablist' : undefined}
        className={classes}
      >
        {mapCloneElement(children, this.renderPanel)}
      </div>
    );
  }
}

export default PanelGroup;
