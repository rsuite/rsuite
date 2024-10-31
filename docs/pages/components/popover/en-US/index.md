# Popover

When the mouse clicks/moves in, the pop-up pop-up box is used to display more content.

## Import

<!--{include:<import-guide>}-->

- `<Popover>` Pop-up box.
- `<Whisper>` Monitor triggers, wrap the outside of the listener object, and notify the `Tooltip` when the event is triggered.

## Basic

### Default

<!--{include:`basic.md`}-->

### Placement

<!--{include:`placement.md`}-->

### Triggering events

`Whisper` provides a `trigger` props, which is used to control the display of `Popover` in different business scenarios. Props values ​​include:

- `click`: It will be triggered when the element is clicked, and closed when clicked again.
- `contextMenu`: It will be triggered when you trigger contextMenu on the element.
- `focus`: It is generally triggered when the user clicks or taps on an element or selects it with the keyboard's `tab` key.
- `hover`: Will be triggered when the cursor (mouse pointer) is hovering over the element.
- `active`: It is triggered when the element is activated.
- `none`: No trigger event, generally used when it needs to be triggered by a method.

<!--{include:`trigger.md`}-->

> Note: [Safari ignoring tabindex](https://stackoverflow.com/questions/1848390/safari-ignoring-tabindex)

### Container and prevent overflow

Positioned popover components in scrolling container

<!--{include:`container.md`}-->

### Used with Dropdown

<!--{include:`with-dropdown.md`}-->

### Hide arrow indicator

You can hide arrow indicator by setting `arrow` props to `false`;

<!--{include:`arrow.md`}-->

### Follow cursor

You can enable the `Popover` to follow the cursor by setting `followCursor={true}`.

<!--{include:`follow-cursor.md`}-->

## Props

### `<Popover>`

| Property    | Type `(Default)`     | Description                            |
| ----------- | -------------------- | -------------------------------------- |
| arrow       | boolean `(true)`     | Whether show the arrow indicator       |
| children \* | ReactNode            | The content of the component.          |
| classPrefix | string `('popover')` | The prefix of the component CSS class. |
| title       | ReactNode            | The title of the component.            |
| visible     | boolean              | The component is visible by default.   |
| full        | boolean              | The content full the container         |

<!--{include:(components/whisper/en-US/props.md)}-->
<!--{include:(_common/types/placement-all.md)}-->
