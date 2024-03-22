import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Collapse from '../Animation/Collapse';
import { useClassNames, useControlled, useUniqueId, useEventCallback } from '../utils';
import { AnimationEventProps, RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { PanelGroupContext } from '../PanelGroup';
import Heading from '../Heading';
import AccordionButton from './AccordionButton';

export interface PanelProps<T = string | number> extends WithAsProps, AnimationEventProps {
  /** Show border */
  bordered?: boolean;

  /** Content area filled with containers */
  bodyFill?: boolean;

  /** Whether it is a collapsible panel */
  collapsible?: boolean;

  /**
   * The icon on the right side of the title.
   */
  caretAs?: React.ElementType;

  /** Expand then panel by default */
  defaultExpanded?: boolean;

  /** Whether the panel is disabled */
  disabled?: boolean;

  /** Expand then panel */
  expanded?: boolean;

  /** The event key corresponding to the panel. */
  eventKey?: T;

  /** The head displays information. */
  header?: React.ReactNode;

  /** ID */
  id?: string;

  /**
   * Role of header
   */
  headerRole?: string;

  /** Role of Panel */
  panelRole?: string;

  /** With shadow */
  shaded?: boolean;

  /** callback function for the panel clicked */
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}

/**
 * The `Panel` component is used to display content that can be collapsed.
 * @see https://rsuitejs.com/components/panel
 */
const Panel: RsRefForwardingComponent<'div', PanelProps> = React.forwardRef(
  (props: PanelProps, ref) => {
    const {
      as: Component = 'div',
      bodyFill,
      bordered,
      children,
      className,
      classPrefix = 'panel',
      caretAs,
      collapsible: collapsibleProp,
      defaultExpanded,
      disabled,
      eventKey,
      expanded: expandedProp,
      header,
      headerRole,
      panelRole = 'region',
      shaded,
      id: idProp,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      onSelect,
      ...rest
    } = props;
    const id = useUniqueId('rs-', idProp);
    const panelId = `${id}-panel`;
    const btnId = `${id}-btn`;

    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
    const { accordion, activeKey, onGroupSelect } = useContext(PanelGroupContext) || {};
    const [expandedState, setExpanded] = useControlled(
      expandedProp,
      defaultExpanded || (typeof activeKey !== 'undefined' && activeKey === eventKey)
    );

    let collapsible = collapsibleProp;
    let expanded = expandedState;

    if (accordion) {
      collapsible = true;
    }

    if (collapsible) {
      if (typeof activeKey !== 'undefined' && activeKey !== eventKey) {
        expanded = false;
      }
    }

    useEffect(() => {
      if (accordion && typeof activeKey !== 'undefined') {
        setExpanded(activeKey === eventKey);
      }
    }, [accordion, activeKey, eventKey, setExpanded]);

    const handleSelect = useEventCallback((event: React.MouseEvent) => {
      onSelect?.(eventKey, event);
      onGroupSelect?.(eventKey, event);
      setExpanded(!expanded);
    });

    const renderBody = (bodyProps?: React.HTMLAttributes<HTMLDivElement>) => {
      const classes = prefix('body', { 'body-fill': bodyFill });

      return (
        <div {...bodyProps} className={classes}>
          {children}
        </div>
      );
    };

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
            <div {...rest} className={merge(className, prefix('collapse'))} ref={ref}>
              {renderBody({ role: panelRole, id: panelId, 'aria-labelledby': btnId })}
            </div>
          );
        }}
      </Collapse>
    );

    const renderHeading = () => {
      if (!header) {
        return null;
      }

      let headerElement: React.ReactNode;

      if (!React.isValidElement(header) || Array.isArray(header)) {
        headerElement = <span className={prefix('title')}>{header}</span>;
      } else {
        const className = merge(prefix('title'), get(header, 'props.className'));
        headerElement = React.cloneElement<any>(header, { className });
      }

      return (
        <Heading level={2} className={prefix('header')}>
          {collapsible ? (
            <AccordionButton
              id={btnId}
              role={headerRole}
              caretAs={caretAs}
              controlId={panelId}
              disabled={disabled}
              expanded={expanded}
              onClick={handleSelect}
            >
              {headerElement}
            </AccordionButton>
          ) : (
            headerElement
          )}
        </Heading>
      );
    };

    const classes = merge(
      className,
      withClassPrefix({ in: expanded, collapsible, bordered, shaded })
    );

    return (
      <Component {...rest} ref={ref} className={classes} id={idProp}>
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
