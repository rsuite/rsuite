import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import Collapse from 'rsuite-utils/lib/Animation/Collapse';
import decorate, { getClassNames } from './utils/decorate';
import isNullOrUndefined from './utils/isNullOrUndefined';


const propTypes = {
  collapsible: PropTypes.bool,
  header: PropTypes.node,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  defaultExpanded: PropTypes.bool,
  expanded: PropTypes.bool,
  eventKey: PropTypes.any,    // eslint-disable-line react/forbid-prop-types
  headerRole: PropTypes.string,
  panelRole: PropTypes.string,
  prefixClass: PropTypes.string,

  onSelect: PropTypes.func,
  onEnter: Collapse.propTypes.onEnter,
  onEntering: Collapse.propTypes.onEntering,
  onEntered: Collapse.propTypes.onEntered,
  onExit: Collapse.propTypes.onExit,
  onExiting: Collapse.propTypes.onExiting,
  onExited: Collapse.propTypes.onExited
};

const defaultProps = {
  defaultExpanded: false,
  prefixClass: 'panel'
};

function shouldRenderFill(child) {
  return React.isValidElement(child) && child.props.fill !== null;
}

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: props.defaultExpanded
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleSelect(event) {
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

  handleToggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  isExpanded() {
    return isNullOrUndefined(this.props.expanded) ? this.state.expanded : this.props.expanded;
  }

  renderCollapsibleTitle(header, headerRole) {
    const { prefixClass } = this.props;
    return (
      <h4 className={`${prefixClass}-title`} role="presentation">
        {this.renderAnchor(header, headerRole)}
      </h4>
    );
  }

  renderCollapsibleBody(panelRole) {
    const { id, prefixClass } = this.props;

    const collapseProps = {
      ...pick(this.props, Object.keys(Collapse.propTypes)),
      in: this.isExpanded()
    };
    let props = {
      id,
      className: `${prefixClass}-collapse`,
      ref: 'panel',
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
    const { prefixClass, children } = this.props;
    let allChildren = children;
    let bodyElements = [];
    let panelBodyChildren = [];
    let bodyClass = `${prefixClass}-body`;

    function getProps() {
      return {
        key: bodyElements.length
      };
    }

    function addPanelChild(child) {
      bodyElements.push(cloneElement(child, getProps()));
    }

    function addPanelBody(body) {
      const props = getProps();
      bodyElements.push(
        <div
          {...props}
          className={bodyClass}
        >
          {body}
        </div>
      );
    }

    function maybeRenderPanelBody() {
      if (panelBodyChildren.length === 0) {
        return;
      }

      addPanelBody(panelBodyChildren);
      panelBodyChildren = [];
    }

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

  renderHeading(headerRole) {
    let { header, collapsible, prefixClass } = this.props;

    if (!header) {
      return null;
    }

    if (!React.isValidElement(header) || Array.isArray(header)) {
      header = collapsible ? this.renderCollapsibleTitle(header, headerRole) : header;
    } else {
      const className = classNames(
        `${prefixClass}-title`,
        header.props.className
      );
      header = cloneElement(header, { className });
    }
    return (
      <div
        role="rowheader"
        className={`${prefixClass}-heading`}
        onClick={this.handleSelect}
        tabIndex={-1}
      >
        {header}
      </div>
    );
  }

  renderAnchor(header, headerRole) {

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
      id,
      ...props
    } = this.props;

    const clesses = classNames({
      ...getClassNames(this.props)
    }, className);

    const elementProps = omit(props, Object.keys(propTypes));
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

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default decorate({
  shape: true
})(Panel);
