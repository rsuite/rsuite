import { Option, DataProps, WithAsProps, ToArray } from '@/internals/types';

export interface SelectNode<T> {
  itemData: Option<T>;
  cascadePaths: Option<T>[];
  isLeafNode: boolean;
}

export interface CascadeColumn<T> {
  items: readonly Option<T>[];
  parentItem?: Option<T>;
  layer?: number;
}

export interface CascadeTreeProps<T = any, V = T, L = any>
  extends WithAsProps,
    DataProps<Option<T>> {
  /**
   * Initial value
   */
  defaultValue?: V;

  /**
   * Selected value
   */
  value?: V;

  /**
   * Sets the width of the menu
   */
  columnWidth?: number;

  /**
   * Sets the height of the menu
   */
  columnHeight?: number;

  /**
   * Disabled items
   */
  disabledItemValues?: ToArray<NonNullable<T>>;

  /**
   * Whether dispaly search input box
   */
  searchable?: boolean;

  /**
   * A collection of localized strings.
   */
  locale?: Partial<L>;

  /**
   * Custom render columns
   */
  renderColumn?: (childNodes: React.ReactNode, column: CascadeColumn<T>) => React.ReactNode;

  /**
   * Custom render tree node
   */
  renderTreeNode?: (node: React.ReactNode, itemData: Option<T>) => React.ReactNode;

  /**
   * Custom render search items
   */
  renderSearchItem?: (node: React.ReactNode, items: Option<T>[]) => React.ReactNode;

  /**
   * Called when the option is selected
   */
  onSelect?: (value: Option<T>, selectedPaths: Option<T>[], event: React.SyntheticEvent) => void;

  /**
   * Called after the value has been changed
   */
  onChange?: (value: V, event: React.SyntheticEvent) => void;

  /**
   * Called when searching
   */
  onSearch?: (value: string, event: React.SyntheticEvent) => void;

  /**
   * Asynchronously load the children of the tree node.
   */
  getChildren?: (childNodes: Option<T>) => Option<T>[] | Promise<Option<T>[]>;
}
