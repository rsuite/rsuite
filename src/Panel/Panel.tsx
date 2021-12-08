import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import AngleDownIcon from '@rsuite/icons/legacy/AngleDown';

import Collapse from '../Animation/Collapse';
import { useClassNames, useControlled } from '../utils';
import { AnimationEventProps, RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { PanelGroupContext } from '../PanelGroup';

export interface PanelProps<T = string | number> extends WithAsProps, AnimationEventProps {
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
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}

const Panel: RsRefForwardingComponent<'div', PanelProps> = React.forwardRef(
  (props: PanelProps, ref) => {
    const {
      as: Component = 'div',
      children,
      className,
      classPrefix = 'panel',
      bodyFill,
      bordered,
      collapsible: collapsibleProp,
      defaultExpanded,
      eventKey,
      expanded: expandedProp,
      header,
      headerRole: headerRoleProp,
      panelRole = 'region',
      shaded,
      id,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      onSelect,
      ...rest
    } = props;
    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
    const [expandedState, setExpanded] = useControlled(expandedProp, defaultExpanded);
    const { accordion, activeKey, onGroupSelect } = useContext(PanelGroupContext) || {};

    let collapsible = collapsibleProp;
    let headerRole = headerRoleProp;
    let expanded = expandedState;

    if (accordion) {
      collapsible = true;
      headerRole = 'button';
      expanded = typeof activeKey !== 'undefined' ? activeKey === eventKey : expanded;
    }

    const handleSelect = useCallback(
      (event: React.MouseEvent) => {
        onSelect?.(eventKey, event);
        onGroupSelect?.(eventKey, event);
        setExpanded(!expanded);
      },
      [eventKey, expanded, onGroupSelect, onSelect, setExpanded]
    );

    const renderBody = useCallback(() => {
      const classes = prefix('body', {
        'body-fill': bodyFill
      });

      return (
        <div role={panelRole} className={classes}>
          {children}
        </div>
      );
    }, [bodyFill, children, panelRole, prefix]);

    const renderCollapsibleBody = () => (
      <Collapse
        in={expanded}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
      >
        {(transitionProps, ref) => {
          const { className, ...rest } = transitionProps;
          return (
            <div
              {...rest}
              id={id ? `${id}` : null}
              aria-expanded={expanded}
              className={merge(className, prefix('collapse'))}
              ref={ref}
            >
              {renderBody()}
            </div>
          );
        }}
      </Collapse>
    );

    const renderHeading = () => {
      if (!header) {
        return null;
      }
      let content: React.ReactNode;

      if (!React.isValidElement(header) || Array.isArray(header)) {
        content = collapsible ? (
          <>
            <AngleDownIcon rotate={expanded ? 180 : 0} />
            <span className={prefix('title')} role="presentation">
              <span className={expanded ? undefined : 'collapsed'}>{header}</span>
            </span>
          </>
        ) : (
          header
        );
      } else {
        const className = merge(prefix('title'), get(header, 'props.className'));
        content = React.cloneElement<any>(header, { className });
      }

      return (
        <div
          role={headerRole}
          aria-controls={collapsible && id ? `${id}` : undefined}
          aria-expanded={expanded}
          className={prefix('header')}
          onClick={collapsible ? handleSelect : undefined}
          tabIndex={-1}
        >
          {content}
        </div>
      );
    };

    const classes = merge(
      className,
      withClassPrefix({ in: expanded, collapsible, bordered, shaded })
    );

    return (
      <Component {...rest} ref={ref} className={classes} id={collapsible ? null : id}>
        {renderHeading()}
        {collapsible ? renderCollapsibleBody() : renderBody()}
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

export default Panel;
