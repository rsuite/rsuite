# Avatar

Used to display an avatar or brand.

## Import

<!--{include:(components/avatar/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Text

You can change the `<Avatar>` background color and font color by `style`;

<!--{include:`text.md`}-->

### With Icon

<!--{include:`icon.md`}-->

### Image avatar

You can set `alt` for `<Avatar>` , it make sure avatar show pure text avatar when image load failed.

<!--{include:`image.md`}-->

### Size

<!--{include:`size.md`}-->

### Badge

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
| size        | enum: 'lg'&#124;'md'&#124;'sm'&#124;'xs' `('md')` | Size of avatar                                                                                 |
| sizes       | string                                            | The `sizes` attribute for the `img` element.                                                   |
| src         | string                                            | The `src` attribute for the `img` element.                                                     |
| srcSet      | string                                            | The `srcSet` attribute for the `img` element. Use this attribute for responsive image display. |
