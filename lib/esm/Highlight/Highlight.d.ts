import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface HighlightProps extends WithAsProps {
    query?: string | string[];
    renderMark?: (match: string, index: number) => React.ReactNode;
}
/**
 *
 * Highlight the matching text in the content.
 *
 * @see https://rsuitejs.com/components/highlight
 */
declare const Highlight: RsRefForwardingComponent<'div', HighlightProps>;
export default Highlight;
