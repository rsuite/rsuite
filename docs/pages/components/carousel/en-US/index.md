# Carousel

Display a set of elements in a carousel

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

A basic carousel containing 5 images that can be navigated using the bottom indicators.

<!--{include:`basic.md`}-->

### Controlled slides

Control the current slide programmatically using the `activeIndex` and `onSelect` props for a fully controlled carousel.

<!--{include:`position.md`}-->

### Appearance

Customize the carousel's indicator position (top, bottom, left, right) and shape (dots or bars).

<!--{include:`appearance.md`}-->

### Autoplay

Enable automatic slide transitions without user interaction by setting the `autoplay` prop.

<!--{include:`autoplay.md`}-->

## Props

### `<Carousel>`

| Property           | Type `(Default)`                                 | Description                                    |
| ------------------ | ------------------------------------------------ | ---------------------------------------------- |
| activeIndex        | number                                           | Controls the current visible slide             |
| as                 | ElementType `('div')`                            | Custom element type                            |
| autoplay           | boolean                                          | Automatic carousel element.                    |
| autoplayInterval   | number (`4000`)                                  | Delay in ms until navigating to the next item. |
| children           | ReactNode                                        | Carousel elements                              |
| classPrefix        | string `('carousel')`                            | Component CSS class prefix                     |
| defaultActiveIndex | number (`0`)                                     | The default initial slide                      |
| onSelect           | (index: number, event?: ChangeEvent) => void     | Callback fired when the active item changes    |
| onSlideEnd         | (index: number, event?: TransitionEvent) => void | Callback fired when a slide transition ends    |
| onSlideStart       | (index: number, event?: ChangeEvent) => void     | Callback fired when a slide transition starts  |
| placement          | enum:'top','bottom','left','right' `('bottom')`  | Button placement                               |
| shape              | enum:'dot','bar' `('dot')`                       | Button shape                                   |
