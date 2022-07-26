# Avatar

Used to display an avatar or brand.

## Import

<!--{include:(components/avatar/fragments/import.md)}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Character avatar

You can change the `<Avatar>` background color and font color by `style`;

<!--{include:`text.md`}-->

### Icon avatars

<!--{include:`icon.md`}-->

### Image avatars

You can set `alt` for `<Avatar>` , it make sure avatar show pure text avatar when image load failed.

<!--{include:`image.md`}-->

### Sizes

<!--{include:`size.md`}-->

### Stacked avatars

<!--{include:`stack.md`}-->

### With badge

<!--{include:`badge.md`}-->

## Props

### `<Avatar>`

| Property    | Type`(Default)`                                   | Description                                                                                    |
| ----------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| alt         | string                                            | This attribute defines the alternative text for the image avatar                               |
| children    | string, Element<typeof Icon>                      | Content(It maybe text or icon)                                                                 |
| circle      | boolean                                           | Render a circle avatar                                                                         |
| classPrefix | string `('avatar')`                               | The prefix of the component CSS class                                                          |
| imgProps    | object                                            | Attributes applied to the `img` element if the component is used to display an image.          |
| size        | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')` | Size of avatar                                                                                 |
| sizes       | string                                            | The `sizes` attribute for the `img` element.                                                   |
| src         | string                                            | The `src` attribute for the `img` element.                                                     |
| srcSet      | string                                            | The `srcSet` attribute for the `img` element. Use this attribute for responsive image display. |

### `<AvatarGroup>`

| Property | Type`(Default)`                          | Description                    |
| -------- | ---------------------------------------- | ------------------------------ |
| size     | enum: 'lg'&#124;'md'&#124;'sm'&#124;'xs' | Set the size of all avatars    |
| spacing  | number                                   | Set the spacing of the avatars |
| stack    | boolean                                  | Render all avatars as stacks   |
