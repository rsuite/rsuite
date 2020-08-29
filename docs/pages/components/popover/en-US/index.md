# Popover

When the mouse clicks/moves in, the pop-up pop-up box is used to display more content.

- `<Popover>` Pop-up box.
- `<Whisper>` Monitor triggers, wrap the outside of the listener object, and notify the `Tooltip` when the event is triggered.

## Import

<!--{include:(components/popover/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Placement

<!--{include:`placement.md`}-->

### Triggering events

`Whisper` provides a `trigger` props, which is used to control the display of `Popover` in different business scenarios. Props values ​​include:

- `click`: It will be triggered when the element is clicked, and closed when clicked again.
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

## Props

<!--{include:(_common/types/placement-all.md)}-->

### `<Popover>`

| Property    | Type `(Default)`     | Description                            |
| ----------- | -------------------- | -------------------------------------- |
| children \* | ReactNode            | The content of the component.          |
| classPrefix | string `('popover')` | The prefix of the component CSS class. |
| title       | ReactNode            | The title of the component.            |
| visible     | boolean              | The component is visible by default.   |

<!--{include:(components/whisper/en-US/props.md)}-->
