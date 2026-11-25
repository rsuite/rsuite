# SegmentedControl

SegmentedControl is used to offer multiple exclusive options.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Sizes

<!--{include:`sizes.md`}-->

### Disabled

Disabled state of the SegmentedControl.

<!--{include:`disabled.md`}-->

### Indicator Appearance

SegmentedControl supports two indicator styles: Pill (default) and Underline.

<!--{include:`indicator-styles.md`}-->

### With Icons

Enhance options with icons for better visual recognition.

<!--{include:`custom-data.md`}-->

### Controlled

Controlled mode of SegmentedControl using `value` and `onChange` props.

<!--{include:`controlled.md`}-->

### Block

Display SegmentedControl as a block element that fills the width of its container.

<!--{include:`block.md`}-->

## Accessibility

### ARIA properties

- SegmentedControl `role` is `radiogroup`.
- Each segment `role` is `radio`.
- If a segment is selected, `aria-checked` is set to `true`.

### Keyboard interaction

- <kbd>→</kbd> or <kbd>↓</kbd> - Move focus to the next segment, when the focus is on the last segment in the group, move to the first segment.
- <kbd>←</kbd> or <kbd>↑</kbd> - Move focus to the previous segment. When the focus is on the first segment in the group, move to the last segment.

## Props

### `<SegmentedControl>`

| Property     | Type `(Default)`                                                  | Description                                  |
| ------------ | ----------------------------------------------------------------- | -------------------------------------------- |
| block        | boolean                                                           | Display as block and fit container width     |
| data         | [SegmentedItemDataType](#code-ts-segmented-item-data-type-code)[] | Data of segmented items                      |
| defaultValue | string \| number                                                  | Default value                                |
| disabled     | boolean                                                           | Whether the component is disabled            |
| indicator    | 'pill' \| 'underline' (`'pill'`)                                  | The indicator style of the segmented control |
| name         | string                                                            | Name to use for form                         |
| onChange     | (value: string \| number, event) => void                          | Callback fired when the value changes        |
| size         | [Size](#code-ts-size-code) `('md')`                               | A segmented control can have different sizes |
| value        | string \| number                                                  | Value (controlled)                           |

### Type Definitions

#### `ts:SegmentedItemDataType`

```ts
interface SegmentedItemDataType {
  /** The label of the item */
  label: React.ReactNode;
  /** The value of the item */
  value: string | number;
}
```

#### `ts:Size`

```ts
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```
