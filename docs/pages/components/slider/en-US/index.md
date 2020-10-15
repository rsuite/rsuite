# Slider

A Slider component for displaying current value

- `<Slider>` Slide input controls.
- `<RangeSlider>` Slide range input controls.

## Import

<!--{include:(components/slider/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Progress

<!--{include:`progress.md`}-->

### Graduated

<!--{include:`graduated.md`}-->

### Vertical

<!--{include:`vertical.md`}-->

### Disabled

<!--{include:`disabled.md`}-->

### Show value (Controlled)

<!--{include:`value.md`}-->

### Custom

<!--{include:`custom.md`}-->

### Size

<!--{include:`size.md`}-->

## Props

### `<Slider>`

| Property        | Type `(Default)`            | Description                                   |
| --------------- | --------------------------- | --------------------------------------------- |
| barClassName    | string                      | A css class to apply to the Bar DOM node      |
| defaultValue    | number                      | Default value                                 |
| disabled        | boolean                     | The disabled of component                     |
| graduated       | boolean                     | Show Ticks                                    |
| handleClassName | string                      | A css class to apply to the Handle node       |
| handleStyle     | CSSProperties               | A css style to apply to the Handle node       |
| handleTitle     | ReactNode                   | Customizing what is displayed inside a handle |
| max             | number`(100)`               | Maximum sliding range                         |
| min             | number`(0)`                 | Minimum value of sliding range                |
| onChange        | (value: number) => void     | Callback function that changes data           |
| progress        | boolean                     | Show sliding progress bar                     |
| renderMark      | (mark: number) => ReactNode | Customize labels on the render ruler          |
| step            | number`(1)`                 | Slide the value of one step                   |
| tooltip         | boolean`(true)`             | Whether to show `Tooltip` when sliding        |
| value           | number                      | Value (Controlled)                            |
| vertical        | boolean                     | Vertical Slide                                |

### `<RangeSlider>`

| Property        | Type `(Default)`                 | Description                                   |
| --------------- | -------------------------------- | --------------------------------------------- |
| barClassName    | string                           | A css class to apply to the Bar DOM node      |
| defaultValue    | [number,number]                  | Default value                                 |
| disabled        | boolean                          | The disabled of component                     |
| graduated       | boolean                          | Show Ticks                                    |
| handleClassName | string                           | A css class to apply to the Handle node       |
| handleStyle     | CSSProperties                    | A css style to apply to the Handle node       |
| handleTitle     | ReactNode                        | Customizing what is displayed inside a handle |
| max             | number`(100)`                    | Maximum sliding range                         |
| min             | number`(0)`                      | Minimum value of sliding range                |
| onChange        | (value: [number,number]) => void | Callback function that changes data           |
| progress        | boolean                          | Show sliding progress bar                     |
| renderMark      | (mark: number) => ReactNode      | Customize labels on the render ruler          |
| step            | number`(1)`                      | Slide the value of one step                   |
| tooltip         | boolean`(true)`                  | Whether to show `Tooltip` when sliding        |
| value           | [number,number]                  | Value (Controlled)                            |
| vertical        | boolean                          | Vertical Slide                                |
