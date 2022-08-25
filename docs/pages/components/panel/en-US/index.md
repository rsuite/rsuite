# Panel

A content panel that supports folding panels. The Panel can have all the ' Data Display ' components and can be used as a container for the form.

## Usage

<!--{include:(components/panel/fragments/import.md)}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### With border

<!--{include:`bordered.md`}-->

### With shadow

<!--{include:`shaded.md`}-->

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

## Props

### `<Panel>`

| Property        | Type `(Default)`     | Description                               |
| --------------- | -------------------- | ----------------------------------------- |
| bodyFill        | boolean              | Content area filled with containers       |
| bordered        | boolean              | Show border                               |
| shaded          | boolean              | With shadow                               |
| classPrefix     | string `('panel')`   | The prefix of the component CSS class     |
| collapsible     | boolean              | Whether it is a collapsible panel         |
| defaultExpanded | boolean              | Expand by default                         |
| eventKey        | string               | The event key corresponding to the panel. |
| expanded        | boolean              | Expand the Panel.                         |
| header          | ReactNode            | The head displays information.            |
| id              | string &#124; number | ID                                        |

### `<PanelGroup>`

| Property         | Type `(Default)`                  | Description                                                  |
| ---------------- | --------------------------------- | ------------------------------------------------------------ |
| accordion        | boolean                           | Whether it is a collapsible panel.                           |
| activeKey        | string                            | Expand the Panel, corresponding to the 'Panel' of 'eventkey' |
| classPrefix      | string                            | The prefix of the component CSS class                        |
| defaultActiveKey | string                            | The default expansion panel.                                 |
| onSelect         | (eventKey: string, event) => void | Toggles the callback function for the expand panel           |
