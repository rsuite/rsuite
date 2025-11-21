# Notification

Used for system notifications. Generally used to push messages.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

Default notification style.

<!--{include:`basic.md`}-->

### Types

Set different notification types using the `type` prop: `info`, `success`, `warning`, and `error`.

<!--{include:`type.md`}-->

### Closeable

Add a close button with the `closable` prop and handle the close event with `onClose` callback.

<!--{include:`close.md`}-->

### With toaster

Demonstrates how to use the Notification component with `toaster` to display notification messages.

> **Note**: `useToaster` must be used inside a `CustomProvider`. If your application is not wrapped with `CustomProvider`, make sure to wrap your app with `<CustomProvider>` before using `useToaster`.

<!--{include:`with-toaster.md`}-->

## Props

### `<Notification>`

| Property    | Type `(Default)`                                    | Description                           |
| ----------- | --------------------------------------------------- | ------------------------------------- |
| children \* | ReactNode                                           | The description of the message box    |
| closable    | boolean                                             | The remove button is displayed.       |
| header \*   | string                                              | The title of the message box          |
| onClose     | () => void                                          | Callback after the message is removed |
| placement   | [Placement](#code-ts-placement-code)`('topCenter')` | The placement of the message box.     |
| type        | 'info' \| 'success' \| 'warning' \| 'error'         | The type of the message box.          |

<!--{include:(_common/types/placement-toaster.md)}-->
