# Avatar

Used to display an avatar or brand.

## Import

```js
import { Avatar } from 'rsuite';

// or
import Avatar from 'rsuite/lib/Avatar';
```

## Examples

<!--{demo}-->

## Props

### `<Avatar>`

| Property    | Type`(Default)`                       | Description                                                                                    |
| ----------- | ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| alt         | string                                | This attribute defines the alternative text for the image avatar                               |
| children    | string, React.Element<typeof Icon>    | Content(It maybe text or <Icon/>)                                                              |
| circle      | boolean                               | Render a circle avatar                                                                         |
| classPrefix | string `('avatar')`                   | The prefix of the component CSS class                                                          |
| imgProps    | object                                | Attributes applied to the `img` element if the component is used to display an image.          |
| size        | enum: 'lg', 'md', 'sm', 'xs' `('md')` | Size of avatar                                                                                 |
| sizes       | string                                | The `sizes` attribute for the `img` element.                                                   |
| src         | string                                | The `src` attribute for the `img` element.                                                     |
| srcSet      | string                                | The `srcSet` attribute for the `img` element. Use this attribute for responsive image display. |
