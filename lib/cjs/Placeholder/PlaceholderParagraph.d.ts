import type { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface PlaceholderParagraphProps extends WithAsProps {
    /**
     * The number of rows.
     * @default 2
     */
    rows?: number;
    /**
     * The height of the row.
     * @default 10
     */
    rowHeight?: number;
    /**
     * @deprecated Use `rowSpacing` instead.
     */
    rowMargin?: number;
    /**
     * The spacing between rows.
     * @default 20
     * @version 5.59.1
     */
    rowSpacing?: number;
    /**
     * The shape of the graph.
     * @default false
     */
    graph?: boolean | 'circle' | 'square' | 'image';
    /**
     * Placeholder status, display the loading state.
     */
    active?: boolean;
}
/**
 * The `Placeholder.Paragraph` component is used to display the loading state of the block.
 * @see https://rsuitejs.com/components/placeholder
 */
declare const PlaceholderParagraph: RsRefForwardingComponent<'div', PlaceholderParagraphProps>;
export default PlaceholderParagraph;
