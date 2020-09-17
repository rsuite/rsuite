# Progress

Display the current progress of an operation flow.

- `<Progress.Line>` Linear progress
- `<Progress.Circle>` Circular Progress

## Usage

```js
import { Progress } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Progress.Line>`

| Property    | Type `(Default)`                  | Description                              |
| ----------- | --------------------------------- | ---------------------------------------- |
| classPrefix | string `('progress')`             | The prefix of the component CSS class    |
| percent     | number `(0)`                      | Percent of progress                      |
| showInfo    | boolean `(true)`                  | Show text                                |
| status      | enum: 'success', 'fail', 'active' | Progress status                          |
| strokeColor | string                            | Line Color                               |
| strokeWidth | number                            | Line width                               |
| vertical    | boolean                           | The progress bar is displayed vertically |

### `<Progress.Circle>`

| Property      | Type `(Default)`                                 | Description                              |
| ------------- | ------------------------------------------------ | ---------------------------------------- |
| classPrefix   | string `('progress')`                            | The prefix of the component CSS class    |
| gapDegree     | gapDegree                                        | the gap degree of half circle, 0 ~ 360   |
| gapPosition   | enum: 'right', 'top', 'bottom', 'left' `('top')` | Circular progress bar Notch position     |
| percent       | number `(0)`                                     | Percent of progress                      |
| showInfo      | boolean `(true)`                                 | Show text                                |
| status        | enum: 'success', 'fail', 'active'                | Progress status                          |
| strokeColor   | string                                           | Line Color                               |
| strokeLinecap | enum: 'round', 'square', 'butt' `('round')`      | The end of different types of open paths |
| strokeWidth   | number `(6)`                                     | Line width                               |
| trailColor    | string                                           | Trail color                              |
| trailWidth    | number `(6)`                                     | Trail width                              |
