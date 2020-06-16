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

| Property    | Type`(Default)`          | Description                                                |
| ----------- | ------------------------ | ---------------------------------------------------------- |
| children    | React.Node               | Be wrapped component                                       |
| classPrefix | string `('badge')`       | The prefix of the component CSS class                      |
| content     | string,number,React.Node | Content info                                               |
| maxCount    | number`99`               | Max count number（Only valid if `content` is type number） |
