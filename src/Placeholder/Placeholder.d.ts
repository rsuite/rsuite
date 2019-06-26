import PlaceholderParagraph from './PlaceholderParagraph';
import PlaceholderGrid from './PlaceholderGrid';
import PlaceholderGraph from './PlaceholderGraph';

export interface Placeholder {
  Paragraph: typeof PlaceholderParagraph;
  Grid: typeof PlaceholderGrid;
  Graph: typeof PlaceholderGraph;
}

declare const Placeholder: Placeholder;

export default Placeholder;
