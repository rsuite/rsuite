import React from 'react';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { forwardRef, getCssValue, mergeStyles } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';

export interface PlaceholderGraphProps extends WithAsProps {
  /**
   * The height of the graph.
   *
   * @default 200
   */
  height?: number;

  /**
   * The width of the graph.
   *
   * @default 100%
   */
  width?: number;

  /**
   * Placeholder status, display the loading state.
   */
  active?: boolean;
}

/**
 * The `Placeholder.Graph` component is used to display the loading state of the block.
 * @see https://rsuitejs.com/components/placeholder
 */
const PlaceholderGraph = forwardRef<'div', PlaceholderGraphProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('PlaceholderGraph', props);
  const {
    as: Component = 'div',
    className,
    classPrefix = 'placeholder',
    width,
    height,
    style,
    active,
    ...rest
  } = propsWithDefaults;

  const { merge, withPrefix } = useStyles(classPrefix);

  const classes = merge(className, withPrefix('graph', { active }));
  const styles = {
    '--rs-placeholder-graph-width': getCssValue(width),
    '--rs-placeholder-graph-height': getCssValue(height)
  } as React.CSSProperties;

  return <Component {...rest} ref={ref} className={classes} style={mergeStyles(styles, style)} />;
});

PlaceholderGraph.displayName = 'PlaceholderGraph';

export default PlaceholderGraph;
