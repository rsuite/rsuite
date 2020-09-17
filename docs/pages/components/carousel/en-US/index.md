# Carousel

Display a set of elements in a carousel

## Usege

```js
import { Carousel } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Carousel>`

| Property       | Type `(Default)`                                | Description                 |
| -------------- | ----------------------------------------------- | --------------------------- |
| autoplay       | boolean                                         | Automatic carousel element. |
| autoplayInterval| number (`4000`)                                         | Delay in ms until navigating to the next item. |
| children       | string, React.ReactNode                         | Carousel elements           |
| classPrefix    | string `('carousel')`                           | Component CSS class prefix  |
| componentClass | React.ElementType `('div')`                     | Custom element type         |
| placement      | enum:'top','bottom','left','right' `('bottom')` | Button placement            |
| shape          | enum:'dot','bar' `('dot')`                      | Button shape                |
