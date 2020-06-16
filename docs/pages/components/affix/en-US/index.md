# Affix

Components such as navigation, buttons, etc. can be fixed in the visible range. Commonly used for pages with long content, fixed the specified elements in the visible range of the page to assist in quick operation.

## Usage

```js
import { Affix } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Affix>`

| Property    | Type`(Default)`                   | Description                                                                                     |
| ----------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| children    | string, React.ReactNode           | Fixed element.                                                                                  |
| classPrefix | string `('affix')`                | The prefix of the component CSS class.                                                          |
| container   | HTMLElement , (() => HTMLElement) | Specify the container. An element can only be fixed when the container is in the visible range. |
| onChange    | (fixed:boolean) => voide          | Callback function when non-fixed and fixed state changes.                                       |
| top         | numbser (0)                       | Set the fixed top height.                                                                       |
