import PlaceholderGraph from './PlaceholderGraph';
import PlaceholderGrid from './PlaceholderGrid';
import PlaceholderParagraph, { PlaceholderParagraphProps } from './PlaceholderParagraph';
import { InternalRefForwardingComponent } from '@/internals/types';

export interface Placeholder
  extends InternalRefForwardingComponent<'div', PlaceholderParagraphProps> {
  Paragraph: typeof PlaceholderParagraph;
  Grid: typeof PlaceholderGrid;
  Graph: typeof PlaceholderGraph;
}

/**
 * The `Placeholder` component is used to display the loading state of the block.
 * @see https://rsuitejs.com/components/placeholder
 */
const Placeholder: Placeholder = PlaceholderParagraph as unknown as Placeholder;

Placeholder.Paragraph = PlaceholderParagraph;
Placeholder.Grid = PlaceholderGrid;
Placeholder.Graph = PlaceholderGraph;

export default Placeholder;
