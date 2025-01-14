# Notification

Used for system notifications. Generally used to push messages.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Types

<!--{include:`type.md`}-->

### Closeable

<!--{include:`close.md`}-->

### With toaster

<!--{include:`with-toaster.md`}-->

## Props

### `<Notification>`

| Property    | Type `(Default)`                                        | Description                           |
| ----------- | ------------------------------------------------------- | ------------------------------------- |
| children \* | ReactNode                                               | The description of the message box    |
| closable    | boolean                                                 | The remove button is displayed.       |
| header \*   | string                                                  | The title of the message box          |
| onClose     | () => void                                              | Callback after the message is removed |
| placement   | [Placement](#code-ts-placement-code)`('topCenter')`     | The placement of the message box.     |
| type        | 'info' &#124; 'success' &#124; 'warning' &#124; 'error' | The type of the message box.          |

<!--{include:(_common/types/placement-toaster.md)}-->
