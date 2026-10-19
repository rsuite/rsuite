# Tooltip

A text tip for secondary, which replaces the default title property of an HTML element.

## Import

<!--{include:<import-guide>}-->

- `Tooltip` Text tip.
- `Whisper` Monitor triggers, wrap the outside of the listener object, and notify the `Tooltip` when the event is triggered.

## Examples

### Basic

<!--{include:`basic.md`}-->

### Placement

- `left` , `top` , `right` , `bottom` is in 4 directions, indicating the location of the display.
- `leftStart` , A start is added to the left, and here start is a logical way, indicating that the alignment is the beginning of the Y axis.

> For a description of start and end, refer to W3C first public working draft about [CSS Logical Properties and Values Level 1](https://www.w3.org/TR/2017/WD-css-logical-1-20170518/).

<!--{include:`placement.md`}-->

### Triggering events

`Whisper` provides a `trigger` props, which is used to control the display of `Tooltip` in different business scenarios. Props values ​​include:

- `click`: It will be triggered when the element is clicked, and closed when clicked again.
- `contextMenu`: It will be triggered when you trigger contextMenu on the element.
- `focus`: It is generally triggered when the user clicks or taps on an element or selects it with the keyboard's `tab` key.
- `hover`: Will be triggered when the cursor (mouse pointer) is hovering over the element.
- `active`: It is triggered when the element is activated.
- `none`: No trigger event, generally used when it needs to be triggered by a method.

<!--{include:`trigger.md`}-->

> Note: [Safari ignoring tabindex](https://stackoverflow.com/questions/1848390/safari-ignoring-tabindex)

### Container and prevent overflow

<!--{include:`container.md`}-->

### Disabled elements

Elements with the disabled attribute aren’t interactive, meaning users cannot hover or click them to trigger a popover (or tooltip). As a workaround, you’ll want to trigger the overlay from a wrapper `<div>` or `<span>` and override the pointer-events on the disabled element.

<!--{include:`disabled-elements.md`}-->

### Accessible descriptions

When a `Whisper` has a direct `Tooltip` speaker and an element trigger, it adds the mounted tooltip's ID to the trigger's `aria-describedby`. Existing description IDs keep their order and are deduplicated. A Tooltip ID supplied by you or by `CustomProvider` is preserved; otherwise a stable ID is generated.

The automatic description exists while the actual tooltip node is mounted, including its exit transition, and is removed when that node is detached. The trigger must forward its ref to a DOM element. The target must have `role="tooltip"` and a valid, unique ID in the trigger's document; a role override or a target in another document does not create an automatic association. Render-function speakers, render-function triggers, custom speaker wrappers, and `Popover` keep their existing behavior. Use `controlId` to manage an explicit association; its existing behavior is unchanged. This DOM association does not guarantee when a screen reader announces the description.

### Hide arrow indicator

You can hide arrow indicator by setting `arrow` props to `false`;

<!--{include:`arrow.md`}-->

### Follow cursor

You can enable the `Tooltip` to follow the cursor by setting `followCursor={true}`.

<!--{include:`follow-cursor.md`}-->

## Props

### `<Tooltip>`

| Property    | Type `(Default)`     | Description                           |
| ----------- | -------------------- | ------------------------------------- |
| arrow       | boolean `(true)`     | Whether show the arrow indicator      |
| children \* | ReactNode            | The content of the component.         |
| classPrefix | string `('tooltip')` | The prefix of the component CSS class |
| visible     | boolean              | The component is visible by default   |

<!--{include:(components/whisper/en-US/props.md)}-->
<!--{include:(_common/types/placement-all.md)}-->
