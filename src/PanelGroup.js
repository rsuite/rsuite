// @flow
import * as React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { ReactChildren, getUnhandledProps, defaultProps } from './utils';

type Props = {
  accordion?: boolean,
  activeKey?: any,
  defaultActiveKey?: any,
  className?: string,
  children?: React.Node,
  classPrefix?: string,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void
};

type State = {
  activeKey?: boolean
};

class PanelGroup extends React.Component<Props, State> {
  static defaultProps = {
    accordion: false
  };

  componentWillMount() {
    this.setState({ activeKey: this.props.defaultActiveKey });
  }

  shouldComponentUpdate() {
    return !this.isChanging;
  }
  isChanging = null;
  handleSelect = (activeKey: any, event: SyntheticEvent<*>) => {
    const { onSelect } = this.props;
    event.preventDefault();
    if (onSelect) {
      this.isChanging = true;
      onSelect(activeKey, event);
      this.isChanging = false;
    }

    if (_.isEqual(this.state.activeKey, activeKey)) {
      activeKey = undefined;
    }
    this.setState({ activeKey });
  };

  renderPanel = (child: any, index: number) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    const { activeKey, accordion } = this.props;
    const props: Object = {
      key: child.key ? child.key : index,
      ref: child.ref
    };

    if (accordion) {
      props.headerRole = 'tab';
      props.panelRole = 'tabpanel';
      props.collapsible = true;
      props.expanded = child.props.eventKey === (activeKey || this.state.activeKey);
      props.onSelect = this.handleSelect;
    }

    return props;
  };

  render() {
    let { className, accordion, classPrefix, children, onSelect, ...rest } = this.props;
    let classes = classNames(classPrefix, className);

    const unhandled = getUnhandledProps(PanelGroup, rest);

    return (
      <div {...unhandled} role={accordion ? 'tablist' : undefined} className={classes}>
        {ReactChildren.mapCloneElement(children, this.renderPanel)}
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'panel-group'
})(PanelGroup);
