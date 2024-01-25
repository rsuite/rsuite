# Carousel

Display a set of elements in a carousel

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Controlled index

<!--{include:`position.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Autoplay

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
