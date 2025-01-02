# Slider

A Slider component for displaying current value

## Import

<!--{include:<import-guide>}-->

- `<Slider>` Slide input controls.
- `<RangeSlider>` Slide range input controls.

## Examples

### Basic

<!--{include:`basic.md`}-->

### Progress

<!--{include:`progress.md`}-->

### Graduated

<!--{include:`graduated.md`}-->

### Vertical

<!--{include:`vertical.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Show value (Controlled)

<!--{include:`value.md`}-->

### Constraint

Limit starting value to be no greater than 25 and ending value to be no smaller than 35.

<!--{include:`constraint.md`}-->

### Custom

<!--{include:`custom.md`}-->

### Size

<!--{include:`size.md`}-->

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

| Property          | Type `(Default)`                | Description                                                      |
| ----------------- | ------------------------------- | ---------------------------------------------------------------- |
| barClassName      | string                          | A css class to apply to the Bar DOM node                         |
| defaultValue      | number                          | The default value (uncontrolled)                                 |
| disabled          | boolean                         | The disabled of component                                        |
| getAriaValueText  | (value: number) => string;      | Provide a user-friendly name for the current value of the slider |
| graduated         | boolean                         | Show Ticks                                                       |
| handleClassName   | string                          | A css class to apply to the Handle node                          |
| handleStyle       | CSSProperties                   | A css style to apply to the Handle node                          |
| handleTitle       | ReactNode                       | Customizing what is displayed inside a handle                    |
| max               | number`(100)`                   | Maximum sliding range                                            |
| min               | number`(0)`                     | Minimum value of sliding range                                   |
| onChange          | (value: number) => void         | Callback function that changes data                              |
| onChangeCommitted | (value: number, event) => void; | Callback function that is fired when the mouseup is triggered    |
| progress          | boolean                         | Show sliding progress bar                                        |
| renderMark        | (mark: number) => ReactNode     | Customize labels on the render ruler                             |
| renderTooltip     | (value: number ) => ReactNode   | Customize the content of the rendered Tooltip                    |
| step              | number`(1)`                     | Slide the value of one step                                      |
| tooltip           | boolean`(true)`                 | Whether to show `Tooltip` when sliding                           |
| value             | number                          | The current value (controlled)                                   |
| vertical          | boolean                         | Vertical Slide                                                   |

### `<RangeSlider>`

| Property          | Type `(Default)`                                       | Description                                                                                                          |
| ----------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| barClassName      | string                                                 | A css class to apply to the Bar DOM node                                                                             |
| constraint        | `(value: [number, number]) => boolean`                 | Validate next value before `onChange` is triggered. Prevent `onChange` being triggered if constraint returns `false` |
| defaultValue      | [number,number]                                        | The default value (uncontrolled)                                                                                     |
| disabled          | boolean                                                | The disabled of component                                                                                            |
| getAriaValueText  | (value: number,eventKey:'start'&#124;'end') => string; | Provide a user-friendly name for the current value of the slider                                                     |
| graduated         | boolean                                                | Show Ticks                                                                                                           |
| handleClassName   | string                                                 | A css class to apply to the Handle node                                                                              |
| handleStyle       | CSSProperties                                          | A css style to apply to the Handle node                                                                              |
| handleTitle       | ReactNode                                              | Customizing what is displayed inside a handle                                                                        |
| max               | number`(100)`                                          | Maximum sliding range                                                                                                |
| min               | number`(0)`                                            | Minimum value of sliding range                                                                                       |
| onChange          | (value: [number,number]) => void                       | Callback function that changes data                                                                                  |
| onChangeCommitted | (value: [number,number], event) => void;               | Callback function that is fired when the mouseup is triggered                                                        |
| progress          | boolean                                                | Show sliding progress bar                                                                                            |
| renderMark        | (mark: number) => ReactNode                            | Customize labels on the render ruler                                                                                 |
| renderTooltip     | (value: number ) => ReactNode                          | Customize the content of the rendered Tooltip                                                                        |
| step              | number`(1)`                                            | Slide the value of one step                                                                                          |
| tooltip           | boolean`(true)`                                        | Whether to show `Tooltip` when sliding                                                                               |
| value             | [number,number]                                        | The current value (controlled)                                                                                       |
| vertical          | boolean                                                | Vertical Slide                                                                                                       |
