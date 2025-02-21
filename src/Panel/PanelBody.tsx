import React from 'react';
import Collapse from '../Animation/Collapse';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, AnimationEventProps } from '@/internals/types';
import ScrollView from '@/internals/ScrollView';

export interface PanelBodyProps
  extends WithAsProps,
    AnimationEventProps,
    React.HTMLAttributes<HTMLDivElement> {
  collapsible?: boolean;
  expanded?: boolean;
  bodyFill?: boolean;
  scrollShadow?: boolean;
  role?: string;
  id?: string;
  labelId?: string;
}

const PanelBody = (props: PanelBodyProps) => {
  const {
    classPrefix = 'panel-body',
    children,
    collapsible,
    expanded,
    bodyFill,
    role,
    id,
    labelId,
    scrollShadow,
    className,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    onScroll,
    ...rest
  } = props;

  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
  const bodyClasses = merge(className, withClassPrefix({ fill: bodyFill }));

  const renderBody = (bodyProps?: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <ScrollView
        {...rest}
        {...bodyProps}
        customScrollbar
        className={bodyClasses}
        onScroll={onScroll}
        scrollShadow={scrollShadow}
      >
        {children}
      </ScrollView>
    );
  };

  return collapsible ? (
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
            {renderBody({ role, id, 'aria-labelledby': labelId })}
          </div>
        );
      }}
    </Collapse>
  ) : (
    renderBody()
  );
};

export default PanelBody;
