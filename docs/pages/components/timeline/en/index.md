# Timeline

Vertical display timeline.

## Usage

```js
import { Timeline } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Timeline>`

| Property       | Type `(Default)`                                | Description                                          |
| -------------- | ----------------------------------------------- | ---------------------------------------------------- |
| children \*    | React.ChildrenArray&lt;Timeline.Item&gt;        | The content of the component                         |
| classPrefix    | string `('timeline')`                           | The prefix of the component CSS class                |
| componentClass | React.ElementType `('ul')`                      | You can use a custom element type for this component |
| align          | enum: 'left' , 'right' , 'alternate' `('left')` | Timeline content alignment                           |

### `<Timeline.Item>`

| Property       | Type `(Default)`           | Description                                          |
| -------------- | -------------------------- | ---------------------------------------------------- |
| children \*    | React.Node                 | The content of the component                         |
| classPrefix    | string `('timeline-item')` | The prefix of the component CSS class                |
| componentClass | React.ElementType `('li')` | You can use a custom element type for this component |
| dot            | React.Node                 | Customizing the Timeline item                        |
| time           | React.Node                 | Customizing the Timeline time                        |
