# Portal

The Portal appends the child components to the specified container, such as Modal, Picker, and so on, to render the component outside the triggering source DOM.

The React 16 provides a `reactdom.createportal ()` method to implement this feature, and if you are currently using a react version of 15 (or less than 15), you can implement this requirement directly through the Portal component.

## Usage

```js
import { Portal } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Portal>`

| Property   | Type `(Default)`              | Description                    |
| ---------- | ----------------------------- | ------------------------------ |
| children   | React.Node                    | Subcomponents                  |
| container  | HTMLElement,() => HTMLElement | Render subcomponents Container |
| onRendered | () => void                    | Rendered callback function     |
