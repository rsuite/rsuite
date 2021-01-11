import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import Collapse from '../Animation/Collapse';

import { getUnhandledProps, defaultProps, prefix } from '../utils';
import { PanelProps } from './Panel.d';

interface PanelState {
  expanded?: boolean;
}

class Panel extends React.Component<PanelProps, PanelState> {
  static propTypes = {
    collapsible: PropTypes.bool,
    bordered: PropTypes.bool,
    shaded: PropTypes.bool,
    bodyFill: PropTypes.bool,
    header: PropTypes.any,
    defaultExpanded: PropTypes.bool,
    expanded: PropTypes.bool,
    eventKey: PropTypes.any,
    headerRole: PropTypes.string,
    panelRole: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.node,
    onSelect: PropTypes.func,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
    className: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      expanded: props.defaultExpanded
    };
  }

  handleSelect = (event: React.MouseEvent) => {
    event.persist();
    const { onSelect, eventKey } = this.props;
    if (onSelect) {
      onSelect(eventKey, event);
    }

    this.handleToggle();
  };

  handleToggle = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  isExpanded() {
    return _.isUndefined(this.props.expanded) ? this.state.expanded : this.props.expanded;
  }
  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderCollapsibleTitle(header: React.ReactNode, headerRole?: string) {
    return (
      <span className={this.addPrefix('title')} role="presentation">
        {this.renderAnchor(header, headerRole)}
      </span>
    );
  }

  renderCollapsibleBody(panelRole?: string) {
    const { id } = this.props;
    const collapseProps = {
      ..._.pick(this.props, Object.keys(Collapse.propTypes)),
      in: this.isExpanded()
    };

    const props: React.HTMLAttributes<HTMLDivElement> = {
      id: id ? `${id}` : null,
      'aria-hidden': !this.isExpanded()
    };
    if (panelRole) {
      props.role = panelRole;
    }

    return (
      <Collapse {...collapseProps}>
        {(transitionProps, ref) => {
          const { className, ...rest } = transitionProps;
          return (
            <div
              {...props}
              {...rest}
              className={classNames(this.addPrefix('collapse'), className)}
              ref={ref}
            >
              {this.renderBody()}
            </div>
          );
        }}
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
    let { header } = this.props;

    if (!header) {
      return null;
    }

    if (!React.isValidElement(header) || Array.isArray(header)) {
      header = this.props.collapsible ? this.renderCollapsibleTitle(header, headerRole) : header;
    } else {
      const className = classNames(this.addPrefix('title'), _.get(header, 'props.className'));
      header = React.cloneElement<any>(header, { className });
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

  renderAnchor(header: React.ReactNode, headerRole?: string) {
    const { id, collapsible } = this.props;

    return (
      <span
        aria-controls={collapsible ? `${id}` : null}
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
      shaded,
      classPrefix,
      id,
      ...props
    } = this.props;

    const classes = classNames(className, classPrefix, this.addPrefix('default'), {
      [this.addPrefix('in')]: this.isExpanded(),
      [this.addPrefix('collapsible')]: collapsible,
      [this.addPrefix('bordered')]: bordered,
      [this.addPrefix('shaded')]: shaded
    });

    const unhandled = getUnhandledProps(Panel, props);

    return (
      <div {...unhandled} className={classes} id={collapsible ? null : id}>
        {this.renderHeading(headerRole)}
        {collapsible ? this.renderCollapsibleBody(panelRole) : this.renderBody()}
      </div>
    );
  }
}

export default defaultProps<PanelProps>({
  classPrefix: 'panel'
})(Panel);
