// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Collapse from 'rsuite-utils/lib/Animation/Collapse';
import isNullOrUndefined from './utils/isNullOrUndefined';
import prefix, { globalKey } from './utils/prefix';


type Props = {
  collapsible?: boolean,
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
}


type State = {
  expanded?: boolean
}


function shouldRenderFill(child: any) {
  return React.isValidElement(child) && child.props.fill !== null;
}

class Panel extends React.Component<Props, State> {

  static defaultProps = {
    classPrefix: `${globalKey}panel`
  };

  /**
   * Note that `handledProps` are generated automatically during
   * build with `babel-plugin-transform-react-flow-handled-props`
   */
  static handledProps = [];

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
    } else {
      event.preventDefault();
    }

    if (event.selected) {
      this.handleToggle();
    }
  }

  handleToggle = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  isExpanded() {
    return isNullOrUndefined(this.props.expanded) ? this.state.expanded : this.props.expanded;
  }
  addPrefix = (name: string) => prefix(this.props.classPrefix)(name)

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
        <div {...props}>
          {this.renderBody()}
        </div>
      </Collapse>
    );
  }

  renderBody() {
    const { children } = this.props;
    let allChildren = children;
    let bodyElements = [];
    let panelBodyChildren = [];

    const getProps = () => ({
      key: bodyElements.length
    });

    const addPanelChild = (child: any) => {
      bodyElements.push(React.cloneElement(child, getProps()));
    };

    const addPanelBody = (body) => {
      const props = getProps();
      bodyElements.push(
        <div
          {...props}
          className={this.addPrefix('body')}
        >
          {body}
        </div>
      );
    };

    const maybeRenderPanelBody = () => {
      if (panelBodyChildren.length === 0) {
        return;
      }

      addPanelBody(panelBodyChildren);
      panelBodyChildren = [];
    };

    if (!Array.isArray(allChildren) || allChildren.length === 0) {
      if (shouldRenderFill(allChildren)) {
        addPanelChild(allChildren);
      } else {
        addPanelBody(allChildren);
      }
    } else {
      allChildren.forEach((child) => {
        if (shouldRenderFill(child)) {
          maybeRenderPanelBody();
          addPanelChild(child);
        } else {
          panelBodyChildren.push(child);
        }
      });

      maybeRenderPanelBody();
    }

    return bodyElements;
  }

  renderHeading(headerRole?: string) {
    let { header, collapsible } = this.props;

    if (!header) {
      return null;
    }

    if (!React.isValidElement(header) || Array.isArray(header)) {
      header = collapsible ? this.renderCollapsibleTitle(header, headerRole) : header;
    } else {
      const className = classNames(
        this.addPrefix('title'),
        header.props.className
      );
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
      <a
        href={`#${id || ''}`}
        aria-controls={collapsible ? id : null}
        className={this.isExpanded() ? null : 'collapsed'}
        aria-expanded={this.isExpanded()}
        aria-selected={this.isExpanded()}
        role={headerRole}
      >
        {header}
      </a>
    );
  }

  render() {
    const {
      headerRole,
      panelRole,
      className,
      collapsible,
      classPrefix,
      id,
      ...props
    } = this.props;

    const clesses = classNames(classPrefix, this.addPrefix('default'), className);
    const elementProps = _.omit(props, Panel.handledProps);

    return (
      <div
        {...elementProps}
        className={clesses}
        onSelect={null}
        id={collapsible ? null : id}
      >
        {this.renderHeading(headerRole)}
        {collapsible ? this.renderCollapsibleBody(panelRole) : this.renderBody()}
      </div>
    );
  }
}


export default Panel;
