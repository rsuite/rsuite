import React, { HTMLAttributes, useCallback } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Collapse from '../Animation/Collapse';
import { useClassNames, useControlled } from '../utils';
import { AnimationEventProps, RsRefForwardingComponent, WithAsProps } from '../@types/common';

export interface PanelProps<T = any>
  extends WithAsProps,
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

const Panel: RsRefForwardingComponent<'div', PanelProps> = React.forwardRef(
  (props: PanelProps, ref) => {
    const {
      as: Component,
      children,
      className,
      classPrefix,
      bodyFill,
      bordered,
      collapsible,
      defaultExpanded,
      eventKey,
      expanded: expandedProp,
      header,
      headerRole,
      id,
      onSelect,
      panelRole,
      shaded,
      ...rest
    } = props;
    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
    const [expanded, setExpanded] = useControlled<boolean>(expandedProp, defaultExpanded);

    const handleToggle = useCallback(() => {
      setExpanded(!expanded);
    }, [expanded, setExpanded]);

    const handleSelect = useCallback(
      (event: React.MouseEvent) => {
        event.persist();
        onSelect?.(eventKey, event);
        handleToggle();
      },
      [eventKey, handleToggle, onSelect]
    );

    const renderAnchor = useCallback(
      (header: React.ReactNode, headerRole?: string) => (
        <span
          aria-controls={collapsible ? `${id}` : null}
          className={expanded ? null : 'collapsed'}
          aria-expanded={expanded}
          aria-selected={expanded}
          role={headerRole}
        >
          {header}
        </span>
      ),
      [collapsible, expanded, id]
    );

    const renderCollapsibleTitle = useCallback(
      (header: React.ReactNode, headerRole?: string) => {
        return (
          <span className={prefix('title')} role="presentation">
            {renderAnchor(header, headerRole)}
          </span>
        );
      },
      [prefix, renderAnchor]
    );

    const renderBody = useCallback(() => {
      const classes = merge(prefix('body'), {
        [prefix('body-fill')]: bodyFill
      });

      return <div className={classes}>{children}</div>;
    }, [bodyFill, children, merge, prefix]);

    const renderCollapsibleBody = useCallback(
      (panelRole?: string) => (
        <Collapse in={expanded}>
          {(transitionProps, ref) => {
            const { className, ...rest } = transitionProps;
            return (
              <div
                {...rest}
                id={id ? `${id}` : null}
                aria-hidden={!expanded}
                role={panelRole}
                className={merge(className, prefix('collapse'))}
                ref={ref}
              >
                {renderBody()}
              </div>
            );
          }}
        </Collapse>
      ),
      [expanded, id, merge, prefix, renderBody]
    );

    const renderHeading = useCallback(
      (headerRole?: string) => {
        if (!header) {
          return null;
        }
        let content: React.ReactNode;

        if (!React.isValidElement(header) || Array.isArray(header)) {
          content = collapsible ? renderCollapsibleTitle(header, headerRole) : header;
        } else {
          const className = merge(prefix('title'), get(header, 'props.className'));
          content = React.cloneElement<any>(header, { className });
        }
        return (
          <div role="rowheader" className={prefix('heading')} onClick={handleSelect} tabIndex={-1}>
            {content}
          </div>
        );
      },
      [collapsible, handleSelect, header, merge, prefix, renderCollapsibleTitle]
    );

    const classes = merge(
      className,
      withClassPrefix('default', {
        in: expanded,
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
  }
);

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
