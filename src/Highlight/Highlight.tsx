import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { highlightText } from './utils/highlightText';
import { stringifyReactNode } from '../internals/utils';

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
const Highlight: RsRefForwardingComponent<'div', HighlightProps> = React.forwardRef(
  (props: HighlightProps, ref) => {
    const {
      as: Component = 'div',
      classPrefix = 'highlight',
      className,
      children,
      query,
      renderMark = defaultRenderMark,
      ...rest
    } = props;

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());
    const text = stringifyReactNode(children);

    return (
      <Component ref={ref} className={classes} {...rest}>
        {highlightText(text, { query, renderMark })}
      </Component>
    );
  }
);

Highlight.displayName = 'Highlight';
Highlight.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  as: PropTypes.elementType
};

export default Highlight;
