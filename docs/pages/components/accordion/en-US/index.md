# Accordion

The Accordion component is used to expand and collapse the content area by clicking the title. It is often used to display a large amount of content in a limited space.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

By default, multiple panels can be expanded. Click the title to expand or collapse the accordion panel area.

<!--{include:`basic.md`}-->

### Bordered

<!--{include:`bordered.md`}-->

### Expand only one panel

When `defaultActiveKey` or `activeKey` is set, only one panel can be expanded.

<!--{include:`accordion.md`}-->

### Controlled

`activeKey` can be controlled by `onSelect` callback.

<!--{include:`controlled.md`}-->

### Custom Indicator

<!--{include:`custom-indicator.md`}-->

### Custom Header

<!--{include:`custom-header.md`}-->

### Disabled Panel

<!--{include:`disabled-panel.md`}-->

## Accessibility

### ARIA properties

- `aria-expanded`: Indicates whether the panel is expanded or collapsed.
- `aria-controls`: Identifies the content that is controlled by the panel.
- `aria-labelledby`: Identifies the element that serves as the title for the panel.
- `aria-disabled`: Indicates that the panel is disabled.

### Keyboard interactions

- <kbd>Tab</kbd>: Move focus to the next focusable panel.
- <kbd>Enter</kbd> or <kbd>Space</kbd>: Expand or collapse the panel.

### Resources

- [ARIA Practices: Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

## Props

### `<Accordion>`

| Property         | Type `(Default)`                  | Description                                  |
| ---------------- | --------------------------------- | -------------------------------------------- |
| activeKey        | string                            | The active item's event key.                 |
| bordered         | boolean                           | Show border.                                 |
| classPrefix      | string                            | The prefix of the component CSS class.       |
| defaultActiveKey | string                            | The default active item's event key.         |
| onSelect         | (eventKey: string, event) => void | Callback fired when the active item changes. |

### `<Accordion.Panel>`

| Property        | Type `(Default)`   | Description                               |
| --------------- | ------------------ | ----------------------------------------- |
| bodyFill        | boolean            | Content area filled with containers.      |
| caretAs         | ReactNode          | Custom indicator.                         |
| classPrefix     | string `('panel')` | The prefix of the component CSS class.    |
| defaultExpanded | boolean            | Expand the panel by default.              |
| disabled        | boolean            | Disable the panel.                        |
| eventKey        | string             | The event key corresponding to the panel. |
| expanded        | boolean            | Expand the panel.                         |
| header          | ReactNode          | The title of the panel.                   |
