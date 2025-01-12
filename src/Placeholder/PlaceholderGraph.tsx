import React from 'react';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { forwardRef } from '@/internals/utils';
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
    width,
    height = 200,
    style,
    active,
    classPrefix = 'placeholder',
    ...rest
  } = propsWithDefaults;

  const { merge, withClassPrefix } = useClassNames(classPrefix);

  const classes = merge(className, withClassPrefix('graph', { active }));
  const styles = { width: width || '100%', height, ...style };
  return <Component {...rest} ref={ref} className={classes} style={styles} />;
});

PlaceholderGraph.displayName = 'PlaceholderGraph';

export default PlaceholderGraph;
