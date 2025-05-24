import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles, useCustom } from '@/internals/hooks';
import { forwardRef, getCssValue, mergeStyles } from '@/internals/utils';

export interface PlaceholderGraphProps extends BoxProps {
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
    as,
    className,
    classPrefix = 'placeholder',
    width,
    height,
    style,
    active,
    ...rest
  } = propsWithDefaults;

  const { merge, cssVar, withPrefix } = useStyles(classPrefix);

  const classes = merge(className, withPrefix('graph', { active }));
  const styles = mergeStyles(
    style,
    cssVar('graph-width', width, getCssValue),
    cssVar('graph-height', height, getCssValue)
  );

  return <Box as={as} ref={ref} className={classes} style={styles} {...rest} />;
});

PlaceholderGraph.displayName = 'PlaceholderGraph';

export default PlaceholderGraph;
