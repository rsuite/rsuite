# ProgressCircle

Display circular progress for an operation.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

A basic circular progress bar.

<!--{include:`basic.md`}-->

### Status

Use the `status` prop to indicate different states: 'active', 'success', or 'fail'.

<!--{include:`status.md`}-->

### Color

Customize the progress bar color with the `strokeColor` prop.

<!--{include:`stroke-color.md`}-->

### Size

Adjust the thickness of the progress bar using the `strokeWidth` prop.

<!--{include:`stroke-width.md`}-->

### Gap

Customize the gap degree and position of the circular progress bar using the `gapDegree` and `gapPosition` props.

<!--{include:`gap.md`}-->

### Stroke Linecap

Control the end shape of the progress bar with the `strokeLinecap` prop. Options include 'round', 'square', and 'butt'.

<!--{include:`stroke-linecap.md`}-->

### Hide Info

Hide the percentage display in the center using the `showInfo` prop.

<!--{include:`show-info.md`}-->

### Custom Info Content

Use the `renderInfo` prop to customize the content displayed in the progress info area. This allows for more complex and informative displays beyond the default percentage.

<!--{include:`render-info.md`}-->

### Multiple Sections

Use the `sections` prop to create a progress circle with multiple colored segments. Each section can have its own percentage and color.

<!--{include:`sections.md`}-->

## Props

### `<ProgressCircle>`

| Property      | Type                                                                     | Description                              | Version    |
| ------------- | ------------------------------------------------------------------------ | ---------------------------------------- | ---------- |
| classPrefix   | string `('progress')`                                                    | The prefix of the component CSS class    |            |
| gapDegree     | number `(0)`                                                             | The gap degree of half circle, 0 ~ 360   |            |
| gapPosition   | 'right' \| 'top' \| 'bottom' \| 'left' `('top')`                         | Circular progress bar gap position       |            |
| percent       | number `(0)`                                                             | Percent of progress                      |            |
| renderInfo    | (percent: number, status?: 'success' \| 'fail' \| 'active') => ReactNode | Custom render function for info content  | ![][6.0.0] |
| showInfo      | boolean `(true)`                                                         | Show text                                |            |
| status        | 'success' \| 'fail' \| 'active'                                          | Progress status                          |            |
| sections      | { percent: number, color: string }[]                                     | Multiple sections with different colors  | ![][6.0.0] |
| strokeColor   | string                                                                   | Line color                               |            |
| strokeLinecap | 'round' \| 'square' \| 'butt' `('round')`                                | The end of different types of open paths |            |
| strokeWidth   | number `(6)`                                                             | Line width                               |            |
| trailColor    | string                                                                   | Trail color                              |            |
| trailWidth    | number `(6)`                                                             | Trail width                              |            |
