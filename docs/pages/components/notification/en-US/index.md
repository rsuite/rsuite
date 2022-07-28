# Notification

Used for system notifications. Generally used to push messages.

## Import

<!--{include:(components/notification/fragments/import.md)}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Message type

<!--{include:`type.md`}-->

### Closeable

<!--{include:`close.md`}-->

### With toaster

<!--{include:`with-toaster.md`}-->

## Props & Hooks

### `<Notification>`

| Property    | Type `(Default)`                                        | Description                                                                                                                                                                        |
| ----------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children \* | ReactNode                                               | The description of the message box                                                                                                                                                 |
| closable    | boolean                                                 | The remove button is displayed.                                                                                                                                                    |
| duration    | number `(4500)`                                         | Delay automatic closing notification, only effective when used in combination with `toaster`. Do not automatically turn off notifications when the value is 0 (unit: milliseconds) |
| header \*   | string                                                  | The title of the message box                                                                                                                                                       |
| onClose     | () => void                                              | Callback after the message is removed                                                                                                                                              |
| placement   | [Placement](#code-ts-placement-code)`('topCenter')`     | The placement of the message box.                                                                                                                                                  |
| type        | 'info' &#124; 'success' &#124; 'warning' &#124; 'error' | The type of the message box.                                                                                                                                                       |

<!--{include:(components/notification/en-US/toaster.md)}-->
<!--{include:(_common/types/placement-toaster.md)}-->
