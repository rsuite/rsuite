import React from 'react';
import { useClassNames } from '@/internals/hooks';
import { highlightText } from './utils/highlightText';
import { forwardRef, stringifyReactNode } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

export interface HighlightProps extends WithAsProps {
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
    as: Component = 'div',
    classPrefix = 'highlight',
    className,
    children,
    query,
    renderMark = defaultRenderMark,
    ...rest
  } = propsWithDefaults;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());
  const text = stringifyReactNode(children);

  return (
    <Component ref={ref} className={classes} {...rest}>
      {highlightText(text, { query, renderMark })}
    </Component>
  );
});

Highlight.displayName = 'Highlight';

export default Highlight;
