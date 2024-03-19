import type { CascadeTreeProps } from '../CascadeTree/types';
import type { ItemDataType, ToArray, WithAsProps } from '../@types/common';

export interface ItemKeys {
  valueKey: string;
  labelKey: string;
  childrenKey: string;
}

export interface MultiCascadeTreeProps<T, V = T[]> extends WithAsProps, CascadeTreeProps<T, V> {
  /**
   * When set to true, selecting a child node will update the state of the parent node.
   */
  cascade?: boolean;

  /**
   * Disabled items
   */
  disabledItemValues?: ToArray<NonNullable<T>>;

  /**
   * Set the option value for the check box not to be rendered
   */
  uncheckableItemValues?: T[];

  /**
   * Called after the checkbox state changes.
   */
  onCheck?: (
    value: T[],
    node: ItemDataType<T>,
    checked: boolean,
    event: React.SyntheticEvent
  ) => void;
}
