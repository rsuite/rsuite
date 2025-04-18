import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, stringifyReactNode } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';
import { highlightText } from './utils/highlightText';

export interface HighlightProps extends BoxProps {
  query?: string | string[];
  renderMark?: (match: string, index: number) => React.ReactNode;
}

function defaultRenderMark(match: string, index: number) {
  return (
    <mark key={index} className="rs-highlight-mark">
      {match}
    </mark>
  );
}

/**
 *
 * Highlight the matching text in the content.
 *
 * @see https://rsuitejs.com/components/highlight
 */
const Highlight = forwardRef<'div', HighlightProps>((props: HighlightProps, ref) => {
  const { propsWithDefaults } = useCustom('Highlight', props);
  const {
    as,
    classPrefix = 'highlight',
    className,
    children,
    query,
    renderMark = defaultRenderMark,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());
  const text = stringifyReactNode(children);

  return (
    <Box as={as} ref={ref} className={classes} {...rest}>
      {highlightText(text, { query, renderMark })}
    </Box>
  );
});

Highlight.displayName = 'Highlight';

export default Highlight;
