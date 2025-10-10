import type { WithAsProps, RsRefForwardingComponent } from '../internals/types';
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
declare const PlaceholderGraph: RsRefForwardingComponent<'div', PlaceholderGraphProps>;
export default PlaceholderGraph;
