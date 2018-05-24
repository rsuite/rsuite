// @flow
import * as React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { ReactChildren, getUnhandledProps, defaultProps, prefix } from './utils';

type Props = {
  accordion?: boolean,
  activeKey?: any,
  bordered?: boolean,
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
  constructor(props: Props) {
    super(props);
    this.state = {
      activeKey: props.defaultActiveKey
    };
  }

  getActiveKey() {
    const { activeKey } = this.props;
    return _.isUndefined(activeKey) ? this.state.activeKey : activeKey;
  }

  handleSelect = (activeKey: any, event: SyntheticEvent<*>) => {
    const { onSelect } = this.props;
    this.setState({ activeKey });
    onSelect && onSelect(activeKey, event);
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderPanel = (child: any, index: number) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    const { accordion } = this.props;
    const activeKey = this.getActiveKey();
    const props: Object = {
      key: child.key ? child.key : index,
      ref: child.ref
    };

    if (accordion) {
      return {
        ...props,
        headerRole: 'tab',
        panelRole: 'tabpanel',
        collapsible: true,
        expanded: _.isUndefined(activeKey)
          ? child.props.expanded
          : child.props.eventKey === activeKey,
        onSelect: this.handleSelect
      };
    }

    return props;
  };

  render() {
    const { className, accordion, bordered, classPrefix, children, onSelect, ...rest } = this.props;
    const classes = classNames(classPrefix, className, {
      [this.addPrefix('accordion')]: accordion,
      [this.addPrefix('bordered')]: bordered
    });

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
