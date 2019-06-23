// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Collapse from 'rsuite-utils/lib/Animation/Collapse';

import { getUnhandledProps, defaultProps, prefix } from './utils';

type Props = {
  collapsible?: boolean,
  bordered?: boolean,
  bodyFill?: boolean,
  header?: any,
  id?: string | number,
  defaultExpanded?: boolean,
  expanded?: boolean,
  eventKey?: any,
  headerRole?: string,
  panelRole?: string,
  classPrefix?: string,
  children?: React.Node,

  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  onEnter?: Function,
  onEntering?: Function,
  onEntered?: Function,
  onExit?: Function,
  onExiting?: Function,
  onExited?: Function,
  className?: string
};

type State = {
  expanded?: boolean
};

class Panel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expanded: props.defaultExpanded
    };
  }

  handleSelect = (event: Object) => {
    event.persist();
    event.selected = true;
    const { onSelect, eventKey } = this.props;
    if (onSelect) {
      onSelect(eventKey, event);
    }

    if (event.selected) {
      this.handleToggle();
    }
  };

  handleToggle = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  isExpanded() {
    return _.isUndefined(this.props.expanded) ? this.state.expanded : this.props.expanded;
  }
  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderCollapsibleTitle(header: React.Node, headerRole?: string) {
    return (
      <h4 className={this.addPrefix('title')} role="presentation">
        {this.renderAnchor(header, headerRole)}
      </h4>
    );
  }

  renderCollapsibleBody(panelRole?: string) {
    const { id } = this.props;
    const collapseProps = {
      ..._.pick(this.props, Collapse.handledProps),
      in: this.isExpanded()
    };

    const props: Object = {
      id,
      className: this.addPrefix('collapse'),
      'aria-hidden': !this.isExpanded()
    };
    if (panelRole) {
      props.role = panelRole;
    }

    return (
      <Collapse {...collapseProps}>
        <div {...props}>{this.renderBody()}</div>
      </Collapse>
    );
  }

  renderBody() {
    const { children, bodyFill } = this.props;
    const classes = classNames(this.addPrefix('body'), {
      [this.addPrefix('body-fill')]: bodyFill
    });

    return <div className={classes}>{children}</div>;
  }

  renderHeading(headerRole?: string) {
    let { header, collapsible } = this.props;

    if (!header) {
      return null;
    }

    if (!React.isValidElement(header) || Array.isArray(header)) {
      header = collapsible ? this.renderCollapsibleTitle(header, headerRole) : header;
    } else {
      const className = classNames(this.addPrefix('title'), header.props.className);
      header = React.cloneElement(header, { className });
    }
    return (
      <div
        role="rowheader"
        className={this.addPrefix('heading')}
        onClick={this.handleSelect}
        tabIndex={-1}
      >
        {header}
      </div>
    );
  }

  renderAnchor(header: React.Node, headerRole?: string) {
    const { id, collapsible } = this.props;

    return (
      <span
        aria-controls={collapsible ? id : null}
        className={this.isExpanded() ? null : 'collapsed'}
        aria-expanded={this.isExpanded()}
        aria-selected={this.isExpanded()}
        role={headerRole}
      >
        {header}
      </span>
    );
  }

  render() {
    const {
      headerRole,
      panelRole,
      className,
      collapsible,
      bordered,
      classPrefix,
      id,
      ...props
    } = this.props;

    const classes = classNames(classPrefix, this.addPrefix('default'), className, {
      [this.addPrefix('in')]: this.isExpanded(),
      [this.addPrefix('collapsible')]: collapsible,
      [this.addPrefix('bordered')]: bordered
    });

    const unhandled = getUnhandledProps(Panel, props);

    return (
      <div {...unhandled} className={classes} onSelect={null} id={collapsible ? null : id}>
        {this.renderHeading(headerRole)}
        {collapsible ? this.renderCollapsibleBody(panelRole) : this.renderBody()}
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'panel'
})(Panel);
