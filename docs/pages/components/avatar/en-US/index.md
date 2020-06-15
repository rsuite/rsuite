# Avatar

Used to display an avatar or brand.

## Usage

```js
import { Avatar } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Badge>`

| Property    | Type`(Default)`                       | Description                                                      |
| ----------- | ------------------------------------- | ---------------------------------------------------------------- |
| alt         | string                                | This attribute defines the alternative text for the image avatar |
| children    | string, React.Element<typeof Icon>    | Content(It maybe text or <Icon/>)                                |
| circle      | boolean                               | Render a circle avatar                                           |
| classPrefix | string `('avatar')`                   | The prefix of the component CSS class                            |
| size        | enum: 'lg', 'md', 'sm', 'xs' `('md')` | Size of avatar                                                   |
| src         | string                                | The address of the image for an image avatar                     |
