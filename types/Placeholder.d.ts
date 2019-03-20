import PlaceholderParagraph from './PlaceholderParagraph';
import PlaceholderGrid from './PlaceholderGrid';
import PlaceholderGraph from './PlaceholderGraph';

interface Progress {
  PlaceholderParagraph: typeof PlaceholderParagraph;
  PlaceholderGrid: typeof PlaceholderGrid;
  PlaceholderGraph: typeof PlaceholderGraph;
}

export default Progress;
