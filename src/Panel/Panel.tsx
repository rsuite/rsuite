import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useUniqueId, useEventCallback } from '@/internals/hooks';
import { AnimationEventProps, RsRefForwardingComponent, WithAsProps } from '@/internals/types';
import { PanelGroupContext } from '../PanelGroup';
import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';
import useExpanded from './hooks/useExpanded';
export interface PanelProps<T = string | number> extends WithAsProps, AnimationEventProps {
  /**
   * Show border
   */
  bordered?: boolean;

  /**
   * Content area filled with containers
   */
  bodyFill?: boolean;

  /**
   * Custom body style
   */
  bodyProps?: React.HTMLAttributes<HTMLDivElement>;

  /**
   * Whether it is a collapsible panel
   */
  collapsible?: boolean;

  /**
   * The icon on the right side of the title
   */
  caretAs?: React.ElementType;

  /**
   * Expand then panel by default
   */
  defaultExpanded?: boolean;

  /**
   * Whether the panel is disabled
   */
  disabled?: boolean;

  /**
   * Expand then panel
   */
  expanded?: boolean;

  /**
   * The event key corresponding to the panel
   */
  eventKey?: T;

  /**
   * The head displays information
   */
  header?: React.ReactNode;

  /**
   * The id attribute of the panel
   */
  id?: string;

  /**
   * The role attribute of the header
   */
  headerRole?: string;

  /**
   * The role attribute of the panel
   */
  panelRole?: string;

  /**
   * Whether there is a shadow
   */
  shaded?: boolean;

  /**
   * The shadow of the content when scrolling
   */
  scrollShadow?: boolean;

  /**
   * Called when the panel is selected
   */
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
      bodyProps,
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
      scrollShadow,
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
    const bodyId = `${id}-panel`;
    const buttonId = `${id}-btn`;

    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const { onGroupSelect } = useContext(PanelGroupContext) || {};
    const [expanded, setExpanded, collapsible] = useExpanded({
      expanded: expandedProp,
      defaultExpanded,
      eventKey,
      collapsible: collapsibleProp
    });

    const handleSelect = useEventCallback((event: React.MouseEvent) => {
      onSelect?.(eventKey, event);
      onGroupSelect?.(eventKey, event);
      setExpanded(!expanded);
    });

    const classes = merge(
      className,
      withClassPrefix({ in: expanded, collapsible, bordered, shaded })
    );

    return (
      <Component {...rest} ref={ref} className={classes} id={idProp}>
        {header && (
          <PanelHeader
            collapsible={collapsible}
            expanded={expanded}
            caretAs={caretAs}
            role={headerRole}
            buttonId={buttonId}
            bodyId={bodyId}
            disabled={disabled}
            onClickButton={handleSelect}
          >
            {header}
          </PanelHeader>
        )}

        <PanelBody
          collapsible={collapsible}
          expanded={expanded}
          bodyFill={bodyFill}
          role={panelRole}
          id={bodyId}
          scrollShadow={scrollShadow}
          labelId={buttonId}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
          {...bodyProps}
        >
          {children}
        </PanelBody>
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
