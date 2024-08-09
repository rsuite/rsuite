### `ts:MonthDropdownProps`

```ts
import type { FixedSizeListProps } from 'react-window';

interface MonthDropdownProps extends Partial<FixedSizeListProps> {
  /**
   * The HTML element or React component to render as the root element of the MonthDropdown.
   */
  as?: React.ElementType;

  /**
   * The HTML element or React component to render as each item in the MonthDropdown.
   */
  itemAs?: React.ElementType;

  /**
   * The CSS class name to apply to each item in the MonthDropdown.
   */
  itemClassName?: string;
}
```
