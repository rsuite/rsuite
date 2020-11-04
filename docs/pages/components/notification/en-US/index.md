# Notification

Used for system notifications. Generally used to push messages.

## Import

<!--{include:(components/notification/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Message type

<!--{include:`type.md`}-->

### Closeable

<!--{include:`close.md`}-->

### With toaster

<!--{include:`with-toaster.md`}-->

## Props & Methods

### `<Notification>`

| Property    | Type `(Default)`                                     | Description                                                                                                        |
| ----------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| children \* | ReactNode                                            | The description of the message box                                                                                 |
| closable    | boolean                                              | The remove button is displayed.                                                                                    |
| duration    | number `(4500)`                                      | Delay automatic removal of messages. When set to 0, the message is not automatically removed. (Unit: milliseconds) |
| header \*   | string                                               | The title of the message box                                                                                       |
| onClose     | () => void                                           | Callback after the message is removed                                                                              |
| placement   | enum: [NotificationPlacement](#types)`('topCenter')` | The placement of the message box.                                                                                  |
| type        | enum: 'info', 'success', 'warning', 'error'          | The type of the message box.                                                                                       |

<!--{include:(components/notification/en-US/toaster.md)}-->
