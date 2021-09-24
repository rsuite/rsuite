# Panel

A content panel that supports folding panels. The Panel can have all the ' Data Display ' components and can be used as a container for the form.

- `<Panel>`
- `<PanelGroup>`

## Usage

<!--{include:(components/panel/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### With border

<!--{include:`bordered.md`}-->

### With shadow

<!--{include:`shaded.md`}-->

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

## Props

### `<Panel>`

| Property        | Type `(Default)`   | Description                               |
| --------------- | ------------------ | ----------------------------------------- |
| bodyFill        | boolean            | Content area filled with containers       |
| bordered        | boolean            | Show border                               |
| shaded          | boolean            | With shadow                               |
| classPrefix     | string `('panel')` | The prefix of the component CSS class     |
| collapsible     | boolean            | Whether it is a collapsible panel         |
| defaultExpanded | boolean            | Expand by default                         |
| eventKey        | any                | The event key corresponding to the panel. |
| expanded        | boolean            | Expand the Panel.                         |
| header          | ReactNode          | The head displays information.            |
| id              | string or number   | ID                                        |

### `<PanelGroup>`

| Property         | Type `(Default)`                               | Description                                                  |
| ---------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| accordion        | boolean                                        | Whether it is a collapsible panel.                           |
| activeKey        | any                                            | Expand the Panel, corresponding to the 'Panel' of 'eventkey' |
| classPrefix      | string                                         | The prefix of the component CSS class                        |
| defaultActiveKey | any                                            | The default expansion panel.                                 |
| onSelect         | (eventKey: any, event: SyntheticEvent) => void | Toggles the callback function for the expand panel           |
