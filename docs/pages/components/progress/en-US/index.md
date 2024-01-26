# Progress

Display the current progress of an operation flow.

## Import

<!--{include:<import-guide>}-->

- `<Progress.Line>` Line progress bar.
- `<Progress.Circle>` Circle progress bar.

## Examples

### Line

<!--{include:`line.md`}-->

### Vertical

<!--{include:`line-vertical.md`}-->

### Circle

<!--{include:`circle.md`}-->

### Dynamic

<!--{include:`dynamic.md`}-->

## Props

### `<Progress.Line>`

| Property    | Type `(Default)`                        | Description                              |
| ----------- | --------------------------------------- | ---------------------------------------- |
| classPrefix | string `('progress')`                   | The prefix of the component CSS class    |
| percent     | number `(0)`                            | Percent of progress                      |
| showInfo    | boolean `(true)`                        | Show text                                |
| status      | 'success' &#124; 'fail' &#124; 'active' | Progress status                          |
| strokeColor | string                                  | Line color                               |
| strokeWidth | number                                  | Line width                               |
| vertical    | boolean                                 | The progress bar is displayed vertically |

### `<Progress.Circle>`

| Property      | Type `(Default)`                                             | Description                              |
| ------------- | ------------------------------------------------------------ | ---------------------------------------- |
| classPrefix   | string `('progress')`                                        | The prefix of the component CSS class    |
| gapDegree     | number                                                       | the gap degree of half circle, 0 ~ 360   |
| gapPosition   | 'right' &#124; 'top' &#124; 'bottom' &#124; 'left' `('top')` | Circular progress bar Notch position     |
| percent       | number `(0)`                                                 | Percent of progress                      |
| showInfo      | boolean `(true)`                                             | Show text                                |
| status        | 'success' &#124; 'fail' &#124; 'active'                      | Progress status                          |
| strokeColor   | string                                                       | Line Color                               |
| strokeLinecap | 'round' &#124; 'square' &#124; 'butt' `('round')`            | The end of different types of open paths |
| strokeWidth   | number `(6)`                                                 | Line width                               |
| trailColor    | string                                                       | Trail color                              |
| trailWidth    | number `(6)`                                                 | Trail width                              |
