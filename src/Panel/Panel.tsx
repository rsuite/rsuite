import React, { useContext } from 'react';
import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';
import useExpanded from './hooks/useExpanded';
import { forwardRef } from '@/internals/utils';
import { useClassNames, useUniqueId, useEventCallback } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { PanelGroupContext } from '../PanelGroup';
import type { AnimationEventProps, WithAsProps } from '@/internals/types';

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
const Panel = forwardRef<'div', PanelProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Panel', props);
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
  } = propsWithDefaults;

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
});

Panel.displayName = 'Panel';

export default Panel;
