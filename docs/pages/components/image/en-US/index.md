# Image

Use the image component to display images.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Rounded

<!--{include:`rounded.md`}-->

### Circle

<!--{include:`circle.md`}-->

### Border

<!--{include:`bordered.md`}-->

### Zoomed

<!--{include:`zoomed.md`}-->

### Fit

<!--{include:`fit.md`}-->

### Image with fallback

Display a fallback image when the image fails to load.

<!--{include:`fallback.md`}-->

### Image with placeholder

Display a placeholder while the image is loading.

<!--{include:`placeholder.md`}-->

### With Next.js Image

<!--{include:`nextjs.md`}-->

## Props

### `<Image>`

| Property    | Type `(Default)`                | Description                                             |
| ----------- | ------------------------------- | ------------------------------------------------------- |
| bordered    | boolean                         | An image may appear with border                         |
| circle      | boolean                         | An image may appear as a circle                         |
| fallbackSrc | string                          | The fallback image when the src fails to load           |
| fit         | CSSProperties['objectFit']      | It maps to CSS `object-fit` property                    |
| height      | number \| string                | The height of the image                                 |
| placeholder | ReactNode                       | The placeholder to display when the image is loading    |
| position    | CSSProperties['objectPosition'] | It maps to CSS `object-position` property               |
| rounded     | boolean                         | An image may appear rounded                             |
| shaded      | boolean                         | Whether there is a shadow                               |
| src         | string                          | The image source                                        |
| width       | number \| string                | The width of the image                                  |
| zoomed      | boolean                         | Whether to zoom in when the mouse hovers over the image |
