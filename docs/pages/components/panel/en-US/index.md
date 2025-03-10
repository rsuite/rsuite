# Panel

A content panel that supports collapsible, shadow, and border containers.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### With border

<!--{include:`bordered.md`}-->

### With shadow

<!--{include:`shaded.md`}-->

### Scroll shadows

<!--{include:`scroll-shadow.md`}-->

### With action button

<!--{include:`with-action.md`}-->

### No header

<!--{include:`no-header.md`}-->

### Card

<!--{include:`card.md`}-->

### Card group

<!--{include:`card-grid.md`}-->

### Collapsible

<!--{include:`collapsible.md`}-->

### Fill the container

<!--{include:`body-fill.md`}-->

### Panel group

<!--{include:`panel-group.md`}-->

### Collapsible panel group

<!--{include:`accordion-group.md`}-->

### Accordion effect

Only one panel can be expanded.

<!--{include:`accordion-group-active.md`}-->

## Accessibility

### ARIA properties

- When the Panel is collapsible, set the `aria-expanded` property on the button to identify whether the current panel is expanded.
- When the Panel is collapsible, set the `aria-controls` property on the button to identify the content area of the current panel.
- When the Panel is collapsible, set the `aria-labelledby` property on the content area to identify the title of the current panel.

### Keyboard interactions

- When the Panel is collapsible, press the <kbd>Enter</kbd> or <kbd>Space</kbd> key to expand or collapse the panel.
- When the Panel is collapsible, press the <kbd>Tab</kbd> key to move the focus to the next focusable panel.

## Props

### `<Panel>`

| Property        | Type `(Default)`   | Description                                              |
| --------------- | ------------------ | -------------------------------------------------------- |
| bodyFill        | boolean            | Content area filled with containers                      |
| bodyProps       | HTMLAttributes     | The properties of the content area<br/>![][5.62.0]       |
| bordered        | boolean            | Show border                                              |
| classPrefix     | string `('panel')` | The prefix of the component CSS class                    |
| collapsible     | boolean            | Whether it is a collapsible panel                        |
| defaultExpanded | boolean            | Expand by default                                        |
| eventKey        | string             | The event key corresponding to the panel.                |
| expanded        | boolean            | Expand the Panel                                         |
| header          | ReactNode          | The head displays information.                           |
| id              | string             | HTML ID attribute                                        |
| scrollShadow    | boolean            | The shadow of the content when scrolling<br/>![][5.62.0] |
| shaded          | boolean            | Add shadow effect to the border                          |

### `<PanelGroup>`

| Property         | Type `(Default)`                  | Description                                                  |
| ---------------- | --------------------------------- | ------------------------------------------------------------ |
| accordion        | boolean                           | Whether it is a collapsible panel                            |
| activeKey        | string                            | Expand the Panel, corresponding to the 'Panel' of 'eventkey' |
| classPrefix      | string                            | The prefix of the component CSS class                        |
| defaultActiveKey | string                            | The default expansion panel                                  |
| onSelect         | (eventKey: string, event) => void | Toggles the callback function for the expand panel           |

[5.62.0]: https://img.shields.io/badge/>=-v5.62.0-blue
