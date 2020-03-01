# Slider

A Slider component for displaying current value

- `<Slider>` Slide input controls.
- `<RangeSlider>` Slide range input controls.

## Usage

```js
import { Slider, RangeSlider } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Slider>`

| Property        | Type `(Default)`             | Description                                   |
| --------------- | ---------------------------- | --------------------------------------------- |
| barClassName    | string                       | A css class to apply to the Bar DOM node      |
| defaultValue    | number                       | Default value                                 |
| disabled        | boolean                      | The disabled of component                     |
| graduated       | boolean                      | Show Ticks                                    |
| handleClassName | string                       | A css class to apply to the Handle node       |
| handleStyle     | React.CSSProperties          | A css style to apply to the Handle node       |
| handleTitle     | React.Node                   | Customizing what is displayed inside a handle |
| max             | number`(100)`                | Maximum sliding range                         |
| min             | number`(0)`                  | Minimum value of sliding range                |
| onChange        | (value: number) => void      | Callback function that changes data           |
| progress        | boolean                      | Show sliding progress bar                     |
| renderMark      | (mark: number) => React.Node | Customize labels on the render ruler          |
| step            | number`(1)`                  | Slide the value of one step                   |
| tooltip         | boolean`(true)`              | Whether to show `Tooltip` when sliding        |
| value           | number                       | Value (Controlled)                            |
| vertical        | boolean                      | Vertical Slide                                |

### `<RangeSlider>`

| Property        | Type `(Default)`                 | Description                                   |
| --------------- | -------------------------------- | --------------------------------------------- |
| barClassName    | string                           | A css class to apply to the Bar DOM node      |
| defaultValue    | [number,number]                  | Default value                                 |
| disabled        | boolean                          | The disabled of component                     |
| graduated       | boolean                          | Show Ticks                                    |
| handleClassName | string                           | A css class to apply to the Handle node       |
| handleStyle     | React.CSSProperties              | A css style to apply to the Handle node       |
| handleTitle     | React.Node                       | Customizing what is displayed inside a handle |
| max             | number`(100)`                    | Maximum sliding range                         |
| min             | number`(0)`                      | Minimum value of sliding range                |
| onChange        | (value: [number,number]) => void | Callback function that changes data           |
| progress        | boolean                          | Show sliding progress bar                     |
| renderMark      | (mark: number) => React.Node     | Customize labels on the render ruler          |
| step            | number`(1)`                      | Slide the value of one step                   |
| tooltip         | boolean`(true)`                  | Whether to show `Tooltip` when sliding        |
| value           | [number,number]                  | Value (Controlled)                            |
| vertical        | boolean                          | Vertical Slide                                |
