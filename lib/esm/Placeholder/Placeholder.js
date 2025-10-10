'use client';
import PlaceholderGraph from "./PlaceholderGraph.js";
import PlaceholderGrid from "./PlaceholderGrid.js";
import PlaceholderParagraph from "./PlaceholderParagraph.js";
/**
 * The `Placeholder` component is used to display the loading state of the block.
 * @see https://rsuitejs.com/components/placeholder
 */
var Placeholder = PlaceholderParagraph;
Placeholder.Paragraph = PlaceholderParagraph;
Placeholder.Grid = PlaceholderGrid;
Placeholder.Graph = PlaceholderGraph;
export default Placeholder;