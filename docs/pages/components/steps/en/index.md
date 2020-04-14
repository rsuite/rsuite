# Steps

Steps is a navigation bar that guides users through the steps of a task.

* `<Steps>`
* `<Steps.Item>`

## Usage

```js
import { Steps } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Steps>`

| Property      | Type `(Default)`                                   | Description                           |
| ------------- | -------------------------------------------------- | ------------------------------------- |
| classPrefix   | string `('steps')`                                 | The prefix of the component CSS class |
| current       | number`(0)`                                        | Current execution steps               |
| currentStatus | 'finish', 'wait', 'process', 'error' `('process')` | Current Execution Step Status         |
| small         | boolean                                            | Small size Step Bar                   |
| vertical      | boolean                                            | Vertical display                      |

### `<Steps.Item>`

| Property    | Type `(Default)`                     | Description                           |
| ----------- | ------------------------------------ | ------------------------------------- |
| classPrefix | string `('steps-item')`              | The prefix of the component CSS class |
| description | React.Node                           | The description of Steps item         |
| icon        | React.Element&lt;typeof Icon&gt; ,   | Set icon                              |
| status      | 'finish', 'wait', 'process', 'error' | Step status                           |
| title       | React.Node                           | The title of Steps item               |
