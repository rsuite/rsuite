# Progress

Display the current progress of an operation flow.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

The default Progress component displays a horizontal progress bar.

<!--{include:`line.md`}-->

### Status

Use the `status` prop to indicate different states: 'active', 'success', or 'fail'.

<!--{include:`line-status.md`}-->

### Color

Customize the progress bar color with the `strokeColor` prop.

<!--{include:`line-stroke-color.md`}-->

### Size

Adjust the height of the progress bar using the `strokeWidth` prop. You can also customize the border radius with the `radius` prop.

<!--{include:`line-stroke-width.md`}-->

### Percent placement

Control the position of the percentage indicator with the `percentPlacement` prop. Options include 'start', 'end', 'insideStart', 'insideEnd', and 'insideCenter'.

<!--{include:`line-percent-position.md`}-->

### Striped

Apply a striped effect to the progress bar using the `striped` prop. When combined with 'active' status, the stripes will animate.

<!--{include:`line-striped.md`}-->

### Vertical

Display a vertical progress bar with the `vertical` prop. All other properties like status, color, and percent placement work with vertical progress bars as well.

<!--{include:`line-vertical.md`}-->

### Custom Info Content

Use the `renderInfo` prop to customize the content displayed in the progress info area. This allows for more complex and informative displays beyond the default percentage.

<!--{include:`line-render-info.md`}-->

## Props

### `<Progress>`

| Property         | Type `(Default)`                                                             | Description                                        |
| ---------------- | ---------------------------------------------------------------------------- | -------------------------------------------------- |
| classPrefix      | string `('progress-line')`                                                   | The prefix of the component CSS class              |
| percent          | number `(0)`                                                                 | Percent of progress                                |
| percentPlacement | 'start' \| 'end' \| 'insideStart' \| 'insideEnd' \| 'insideCenter' `('end')` | The placement of the percent info ![][6.0.0]       |
| radius           | number \| string                                                             | The radius of the progress bar ![][6.0.0]          |
| renderInfo       | (percent: number, status?: 'success' \| 'fail' \| 'active') => ReactNode     | Custom render function for info content ![][6.0.0] |
| showInfo         | boolean `(true)`                                                             | Show text                                          |
| status           | 'success' \| 'fail' \| 'active'                                              | Progress status                                    |
| striped          | boolean                                                                      | Whether to apply a striped effect ![][6.0.0]       |
| strokeColor      | string                                                                       | Line color                                         |
| strokeWidth      | number                                                                       | Line width                                         |
| trailColor       | string                                                                       | Trail color                                        |
| trailWidth       | number                                                                       | Trail width                                        |
| vertical         | boolean                                                                      | The progress bar is displayed vertically           |
