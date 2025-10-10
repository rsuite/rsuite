import PlaceholderGraph from './PlaceholderGraph';
import PlaceholderGrid from './PlaceholderGrid';
import PlaceholderParagraph, { PlaceholderParagraphProps } from './PlaceholderParagraph';
import { RsRefForwardingComponent } from '../internals/types';
export interface Placeholder extends RsRefForwardingComponent<'div', PlaceholderParagraphProps> {
    Paragraph: typeof PlaceholderParagraph;
    Grid: typeof PlaceholderGrid;
    Graph: typeof PlaceholderGraph;
}
/**
 * The `Placeholder` component is used to display the loading state of the block.
 * @see https://rsuitejs.com/components/placeholder
 */
declare const Placeholder: Placeholder;
export default Placeholder;
