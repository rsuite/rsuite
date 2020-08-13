# Badge

Used for buttons, numbers or status markers next to icons.

## Usage

```js
import { Badge } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Badge>`

| Property    | Type`(Default)`                                                        | Description                                                |
| ----------- | ---------------------------------------------------------------------- | ---------------------------------------------------------- |
| children    | React.Node                                                             | Be wrapped component                                       |
| classPrefix | string `('badge')`                                                     | The prefix of the component CSS class                      |
| content     | React.Node                                                             | Content info                                               |
| color       | enum: 'red', 'orange','yellow', 'green', <br/>'cyan', 'blue', 'violet' | A indicator can have different colors                      |
| maxCount    | number`99`                                                             | Max count number（Only valid if `content` is type number） |
