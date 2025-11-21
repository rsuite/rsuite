# Slider

A Slider component for selecting a value or range within a given interval.

## Import

<!--{include:<import-guide>}-->

- `Slider` Single value slider control.
- `RangeSlider` Dual value range slider control.

## Examples

### Basic

<!--{include:`basic.md`}-->

### Progress

Display the progress bar of the current value with the `progress` prop.

<!--{include:`progress.md`}-->

### Graduated

Show tick marks with the `graduated` prop.

<!--{include:`graduated.md`}-->

### Graduated with marks

Customize tick marks with the `marks` prop.

<!--{include:`marks.md`}-->

### Size

Support multiple sizes via the `size` prop.

<!--{include:`size.md`}-->

### Vertical

Set the slider to vertical orientation with the `vertical` prop.

<!--{include:`vertical.md`}-->

### Disabled and read only

Set the slider to disabled or read only with the `disabled` or `readOnly` props.

<!--{include:`disabled.md`}-->

### Controlled value

Controlled usage with the `value` prop and callback functions.

<!--{include:`value.md`}-->

### Constraint

Customize value constraints with the `constraint` prop.

<!--{include:`constraint.md`}-->

### Custom handle

Customize the handle content and style with the `handleTitle` and `handleClassName` props.

<!--{include:`custom.md`}-->

### Keep tooltip open

Keep the tooltip always visible with the `keepTooltipOpen` prop.

<!--{include:`keep-tooltip-open.md`}-->

## Accessibility

WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider

### Keyboard Interaction

- <kbd>ArrowRight</kbd>, <kbd>ArrowUp</kbd>: Increase the value of the slider by one step.
- <kbd>ArrowLeft</kbd>, <kbd>ArrowDown</kbd>: Decrease the value of the slider by one step.
- <kbd>Home</kbd>: Set the slider to the first allowed value in its range.
- <kbd>End</kbd>: Set the slider to the last allowed value in its range.

### WAI-ARIA Roles, States, and Properties

- The element serving as the focusable slider control has role `slider`.
- The slider element has the `aria-valuenow` property set to a decimal value representing the current value of the slider.
- If the value of aria-valuenow is not user-friendly, the `aria-valuetext` property is set to a string that makes the slider value understandable. You can change the name with the `getAriaValueText` or `aria-valuetext` prop.

```jsx
<Slider getAriaValueText={value => `${value}MB`} />
```

- The slider element has the `aria-valuemin` property set to a decimal value representing the minimum allowed value of the slider.
- The slider element has the `aria-valuemax` property set to a decimal value representing the maximum allowed value of the slider.

- If the slider is vertically oriented, it has `aria-orientation` set to `vertical`. The default value of `aria-orientation` for a slider is `horizontal`.

- If the slider has a visible label, it is referenced by `aria-labelledby` on the slider element. Otherwise, the slider element has a label provided by `aria-label`.

```jsx
<>
  <label id="slider-label">Memory size</label>
  <Slider aria-labelledby="slider-label" />
</>
```

## Props

### `<Slider>`

| Property          | Type                            | Description                                                      | Version    |
| ----------------- | ------------------------------- | ---------------------------------------------------------------- | ---------- |
| barClassName      | string                          | A css class to apply to the Bar DOM node                         |            |
| defaultValue      | number                          | The default value (uncontrolled)                                 |            |
| disabled          | boolean                         | The disabled of component                                        |            |
| getAriaValueText  | (value: number) => string;      | Provide a user-friendly name for the current value of the slider |            |
| graduated         | boolean                         | Show Ticks                                                       |            |
| handleClassName   | string                          | A css class to apply to the Handle node                          |            |
| handleStyle       | CSSProperties                   | A css style to apply to the Handle node                          |            |
| handleTitle       | ReactNode                       | Customizing what is displayed inside a handle                    |            |
| keepTooltipOpen   | boolean                         | Whether `Tooltip` will always be visible even without hover      |            |
| marks             | [Mark][mark][]                  | Custom marks on the slider                                       | ![][6.0.0] |
| max               | number`(100)`                   | Maximum sliding range                                            |            |
| min               | number`(0)`                     | Minimum value of sliding range                                   |            |
| onChange          | (value: number) => void         | Callback function that changes data                              |            |
| onChangeCommitted | (value: number, event) => void; | Callback function that is fired when the mouseup is triggered    |            |
| progress          | boolean                         | Show sliding progress bar                                        |            |
| renderMark        | (mark: number) => ReactNode     | Customize labels on the render ruler                             |            |
| renderTooltip     | (value: number ) => ReactNode   | Customize the content of the rendered Tooltip                    |            |
| size              | [Size][size] \| `('sm')`        | Specifies the size of the slider                                 | ![][6.0.0] |
| step              | number`(1)`                     | Slide the value of one step                                      |            |
| tooltip           | boolean`(true)`                 | Whether to show `Tooltip` when sliding                           |            |
| value             | number                          | The current value (controlled)                                   |            |
| vertical          | boolean                         | Vertical Slide                                                   |            |

### `<RangeSlider>`

| Property          | Type `(Default)`                                       | Description                                                                                                          | Version    |
| ----------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ---------- |
| barClassName      | string                                                 | A css class to apply to the Bar DOM node                                                                             |            |
| constraint        | `(value: [number, number]) => boolean`                 | Validate next value before `onChange` is triggered. Prevent `onChange` being triggered if constraint returns `false` |            |
| defaultValue      | [number,number]                                        | The default value (uncontrolled)                                                                                     |            |
| disabled          | boolean                                                | The disabled of component                                                                                            |            |
| getAriaValueText  | (value: number,eventKey:'start'&#124;'end') => string; | Provide a user-friendly name for the current value of the slider                                                     |            |
| graduated         | boolean                                                | Show Ticks                                                                                                           |            |
| handleClassName   | string                                                 | A css class to apply to the Handle node                                                                              |            |
| handleStyle       | CSSProperties                                          | A css style to apply to the Handle node                                                                              |            |
| handleTitle       | ReactNode                                              | Customizing what is displayed inside a handle                                                                        |            |
| keepTooltipOpen   | boolean                                                | Whether `Tooltip` will always be visible even without hover                                                          |            |
| marks             | [Mark][mark][]                                         | Custom marks on the slider                                                                                           | ![][6.0.0] |
| max               | number`(100)`                                          | Maximum sliding range                                                                                                |            |
| min               | number`(0)`                                            | Minimum value of sliding range                                                                                       |            |
| onChange          | (value: [number,number]) => void                       | Callback function that changes data                                                                                  |            |
| onChangeCommitted | (value: [number,number], event) => void;               | Callback function that is fired when the mouseup is triggered                                                        |            |
| progress          | boolean                                                | Show sliding progress bar                                                                                            |            |
| renderMark        | (mark: number) => ReactNode                            | Customize labels on the render ruler                                                                                 |            |
| renderTooltip     | (value: number ) => ReactNode                          | Customize the content of the rendered Tooltip                                                                        |            |
| size              | [Size][size] \| `('sm')`                               | Specifies the size of the slider                                                                                     | ![][6.0.0] |
| step              | number`(1)`                                            | Slide the value of one step                                                                                          |            |
| tooltip           | boolean`(true)`                                        | Whether to show `Tooltip` when sliding                                                                               |            |
| value             | [number,number]                                        | The current value (controlled)                                                                                       |            |
| vertical          | boolean                                                | Vertical Slide                                                                                                       |            |

<!--{include:(_common/types/size.md)}-->

[size]: #code-ts-size-code
[mark]: #code-ts-mark-code

### `ts:Mark`

```ts
interface Mark {
  value: number;
  label?: React.ReactNode;
}
```
