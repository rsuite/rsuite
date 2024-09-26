# Avatar

Used to display an avatar or brand.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Character avatar

<!--{include:`text.md`}-->

### Icon avatars

<!--{include:`icon.md`}-->

### Image avatars

<!--{include:`image.md`}-->

### Size

<!--{include:`size.md`}-->

### Bordered

<!--{include:`bordered.md`}-->

### Color

<!--{include:`color.md`}-->

### Avatar Fallbacks

If there is an error loading the src of the avatar, there are 2 fallbacks:

1. If there is an `alt` prop, the value of the alt attribute will be rendered.
2. If there is no `alt` prop, a default avatar will be rendered.

<!--{include:`fallback.md`}-->

### Stacked avatars

<!--{include:`stack.md`}-->

### With badge

<!--{include:`badge.md`}-->

## Props

### `<Avatar>`

| Property    | Type`(Default)`                                        | Description                                                                                    |
| ----------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| alt         | string                                                 | This attribute defines the alternative text for the image avatar.                              |
| bordered    | boolean                                                | Whether to show the border. <br/>![][5.59.0]                                                   |
| children    | string, Element<typeof Icon>                           | Content(It maybe text or icon).                                                                |
| circle      | boolean                                                | Render a circle avatar.                                                                        |
| classPrefix | string `('avatar')`                                    | The prefix of the component CSS class.                                                         |
| color       | string                                                 | Set the background color of the avatar. <br/>![][5.59.0]                                       |
| imgProps    | object                                                 | Attributes applied to the `img` element if the component is used to display an image.          |
| onError     | (event) => void                                        | Callback when the image fails to load.<br/>![][5.59.0]                                         |
| size        | 'xxl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | Size of avatar.                                                                                |
| sizes       | string                                                 | The `sizes` attribute for the `img` element.                                                   |
| src         | string                                                 | The `src` attribute for the `img` element.                                                     |
| srcSet      | string                                                 | The `srcSet` attribute for the `img` element. Use this attribute for responsive image display. |

### `<AvatarGroup>`

| Property | Type`(Default)`                               | Description                     |
| -------- | --------------------------------------------- | ------------------------------- |
| size     | 'xxl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs' | Set the size of all avatars.    |
| spacing  | number                                        | Set the spacing of the avatars. |
| stack    | boolean                                       | Render all avatars as stacks.   |

[5.59.0]: https://img.shields.io/badge/>=-v5.59.0-blue
