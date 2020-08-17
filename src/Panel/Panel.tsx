import * as React from 'react';
import { HTMLAttributes, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Collapse from '../Animation/Collapse';
import { useClassNames } from '../utils';
import { AnimationEventProps, StandardProps } from '../@types/common';

export interface PanelProps<T = any>
  extends StandardProps,
    AnimationEventProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'onSelect'> {
  /** Whether it is a collapsible panel */
  collapsible?: boolean;

  /** Show border */
  bordered?: boolean;

  /** With shadow */
  shaded?: boolean;

  /** Content area filled with containers */
  bodyFill?: boolean;

  /** The head displays information. */
  header?: React.ReactNode;

  /** ID */
  id?: string | number;

  /** Expand then panel by default */
  defaultExpanded?: boolean;

  /** Expand then panel */
  expanded?: boolean;

  /** The event key corresponding to the panel. */
  eventKey?: T;

  /** Role of header */
  headerRole?: string;

  /** Role of Panel */
  panelRole?: string;

  /** callback function for the panel clicked */
  onSelect?: (eventKey: T, event: React.SyntheticEvent<any>) => void;
}

const defaultProps: Partial<PanelProps> = {
  classPrefix: 'panel',
  as: 'div'
};

const Panel = React.forwardRef((props: PanelProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    as: Component,
    className,
    children,
    headerRole,
    panelRole,
    collapsible,
    bordered,
    shaded,
    classPrefix,
    id,
    onSelect,
    eventKey,
    bodyFill,
    defaultExpanded,
    expanded: propsExpanded,
    header,
    ...rest
  } = props;
  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleSelect = (event: React.MouseEvent) => {
    event.persist();
    onSelect?.(eventKey, event);
    handleToggle();
  };

  const handleToggle = () => {
    setExpanded(prevState => !prevState);
  };

  const isExpanded = () => (_.isUndefined(propsExpanded) ? expanded : propsExpanded);
  const renderCollapsibleTitle = (header: React.ReactNode, headerRole?: string) => {
    return (
      <span className={prefix('title')} role="presentation">
        {renderAnchor(header, headerRole)}
      </span>
    );
  };

  const renderCollapsibleBody = (panelRole?: string) => {
    const collapseProps = {
      ..._.pick(props, Object.keys(Collapse.propTypes)),
      in: isExpanded()
    };

    return (
      <Collapse {...collapseProps}>
        {(transitionProps, ref) => {
          const { className, ...rest } = transitionProps;
          return (
            <div
              {...rest}
              id={id ? `${id}` : null}
              aria-hidden={!isExpanded()}
              role={panelRole}
              className={merge(prefix('collapse'), className)}
              ref={ref}
            >
              {renderBody()}
            </div>
          );
        }}
      </Collapse>
    );
  };

  const renderBody = () => {
    const classes = merge(prefix('body'), {
      [prefix('body-fill')]: bodyFill
    });

    return <div className={classes}>{children}</div>;
  };

  const renderHeading = (headerRole?: string) => {
    if (!header) {
      return null;
    }
    let content: React.ReactNode;

    if (!React.isValidElement(header) || Array.isArray(header)) {
      content = collapsible ? renderCollapsibleTitle(header, headerRole) : header;
    } else {
      const className = merge(prefix('title'), _.get(header, 'props.className'));
      content = React.cloneElement<any>(header, { className });
    }
    return (
      <div role="rowheader" className={prefix('heading')} onClick={handleSelect} tabIndex={-1}>
        {content}
      </div>
    );
  };

  const renderAnchor = (header: React.ReactNode, headerRole?: string) => {
    return (
      <span
        aria-controls={collapsible ? `${id}` : null}
        className={isExpanded() ? null : 'collapsed'}
        aria-expanded={isExpanded()}
        aria-selected={isExpanded()}
        role={headerRole}
      >
        {header}
      </span>
    );
  };

  const classes = merge(
    className,
    withClassPrefix('default', {
      in: isExpanded(),
      collapsible,
      bordered,
      shaded
    })
  );

  return (
    <Component {...rest} className={classes} ref={ref} id={collapsible ? null : id}>
      {renderHeading(headerRole)}
      {collapsible ? renderCollapsibleBody(panelRole) : renderBody()}
    </Component>
  );
});

Panel.displayName = 'Panel';
Panel.propTypes = {
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
Panel.defaultProps = defaultProps;

export default Panel;
