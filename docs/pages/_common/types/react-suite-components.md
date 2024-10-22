### `ts:Components`

```ts
import type { ButtonProps } from '../Button';
import type { InputProps } from '../Input';

interface ComponentProps<T> {
  defaultProps: Partial<T>;
}

export interface Components {
  Button: ComponentProps<ButtonProps>;
  Input: ComponentProps<InputProps>;
  // more components...
}
```
