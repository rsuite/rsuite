/**
 * Interface representing the offset position and dimensions of an element
 * Used to get or set geometric properties of DOM elements
 */
export interface Offset {
  /** The distance in pixels from the top edge of the element to the top of the document */
  top: number;
  /** The distance in pixels from the left edge of the element to the left of the document */
  left: number;
  /** The width of the element in pixels */
  width: number;
  /** The height of the element in pixels */
  height: number;
}
