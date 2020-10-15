import PlaceholderGraph from './PlaceholderGraph';
import PlaceholderGrid from './PlaceholderGrid';
import PlaceholderParagraph, { PlaceholderParagraphProps } from './PlaceholderParagraph';
import { RsRefForwardingComponent } from '../@types/common';

export interface Placeholder extends RsRefForwardingComponent<'div', PlaceholderParagraphProps> {
  Paragraph?: typeof PlaceholderParagraph;
  Grid?: typeof PlaceholderGrid;
  Graph?: typeof PlaceholderGraph;
}

const Placeholder: Placeholder = PlaceholderParagraph;

Placeholder.Paragraph = PlaceholderParagraph;
Placeholder.Grid = PlaceholderGrid;
Placeholder.Graph = PlaceholderGraph;

export default Placeholder;
