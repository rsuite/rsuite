/**
 * Base interface for standard React component props in RSuite Table
 * @extends React.HTMLAttributes<HTMLElement>
 */
export interface StandardProps extends React.HTMLAttributes<HTMLElement> {
  /** CSS class prefix for component styling customization */
  classPrefix?: string;
}

/**
 * Sort direction type for table columns
 * @type {'desc' | 'asc'} - 'desc' for descending, 'asc' for ascending
 */
export type SortType = 'desc' | 'asc';

/**
 * Event names for table size changes
 */
export type TableSizeChangeEventName =
  | 'bodyHeightChanged'
  | 'bodyWidthChanged'
  | 'widthChanged'
  | 'heightChanged';

/**
 * Interface for row data structure in the table
 * @template T - Type of the children array elements
 */
export interface RowDataType<T = any> {
  /** Unique key to identify the data */
  dataKey?: string;
  /** Nested data for hierarchical structures */
  children?: T[];
  /** Additional dynamic properties */
  [key: string]: any;
}

/** Type for row key identifiers */
export type RowKeyType = string | number;

/**
 * Interface for table localization strings
 */
export interface TableLocaleType {
  /** Message to display when table has no data */
  emptyMessage?: string;
  /** Text to show during loading states */
  loading?: string;
}

/**
 * Type for event listener cleanup function
 */
export type ListenerCallback = {
  /** Function to remove the event listener */
  off: () => void;
};

/**
 * Interface for element positioning and dimensions
 */
export type ElementOffset = {
  /** Distance from the top of the viewport in pixels */
  top: number;
  /** Distance from the left of the viewport in pixels */
  left: number;
  /** Element width in pixels */
  width: number;
  /** Element height in pixels */
  height: number;
};
